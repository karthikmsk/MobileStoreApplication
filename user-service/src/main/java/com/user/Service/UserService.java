package com.user.Service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.amqp.AmqpException;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.user.DTO.AddressDTO;
import com.user.DTO.UserDTO;
import com.user.DTO.UserEvent;
import com.user.Entity.Address;
import com.user.Entity.User;
import com.user.Mapper.AddressMapper;
import com.user.Mapper.UserMapper;
import com.user.Repository.AddressRepository;
import com.user.Repository.UserRepository;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;

@Service
public class UserService {

    private final RabbitTemplate rabbitTemplate;
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final AddressMapper addressMapper;
    private final BCryptPasswordEncoder passwordEncoder;

    // ✅ Constructor injection for final fields
    public UserService(
            UserRepository userRepository,
            AddressRepository addressRepository,
            UserMapper userMapper,
            AddressMapper addressMapper,
            RabbitTemplate rabbitTemplate,
            BCryptPasswordEncoder passwordEncoder) {

        this.userRepository = userRepository;
        this.userMapper = userMapper;
        this.addressMapper = addressMapper;
        this.rabbitTemplate = rabbitTemplate;
        this.passwordEncoder = passwordEncoder;

        // Set message converter for RabbitMQ
        this.rabbitTemplate.setMessageConverter(new Jackson2JsonMessageConverter());
    }

    // ✅ Get all users
    public List<UserDTO> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(userMapper::convertToDTO)
                .collect(Collectors.toList());
    }

    // ✅ Get user by ID
    public UserDTO getUserById(Long id) {
        User user = findUserById(id);
        return userMapper.convertToDTO(user);
    }

    // ✅ Get addresses by user ID
    public List<AddressDTO> getAddressesByUserId(Long id) {
        User user = userRepository.findUserWithAddresses(id)
            .orElseThrow(() -> new EntityNotFoundException("User not found"));
        user.getAddresses().forEach(addr -> 
        System.out.println("Address: " + addr.getStreet() + ", " + addr.getCity())
    );
        return user.getAddresses().stream()
                .map(addressMapper::convertToDTO)
                .collect(Collectors.toList());
    }

    // ✅ Get user by email
    public UserDTO getUserByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return userMapper.convertToDTO(user);
    }

    // ✅ Create user with enhanced exception handling
    @Transactional
    public UserDTO createUser(UserDTO userDTO) {
        try {
            if (userRepository.findByEmail(userDTO.getEmail()).isPresent()) {
                throw new RuntimeException("Email already exists");
            }

            User user = userMapper.convertToEntity(userDTO);
            user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
            user.setCreatedAt(new java.sql.Date(new Date().getTime()));

            // Associate user with addresses before saving
            user.getAddresses().forEach(address -> address.setUser(user));

            // Save user and addresses
            User savedUser = userRepository.save(user);

            // Publish RabbitMQ event
            publishEvent("user.created", savedUser);

            return userMapper.convertToDTO(savedUser);

        } catch (RuntimeException e) {
            throw new RuntimeException("Error creating user: " + e.getMessage());
        }
    }

    // ✅ Delete user by ID with RabbitMQ event
    @Transactional
    public void deleteUserById(Long id) {
        User user = findUserById(id);
        userRepository.deleteById(id);

        // Publish RabbitMQ event
        publishEvent("user.deleted", user);
    }

    // ✅ Update user with RabbitMQ event publishing
    @Transactional
    public UserDTO updateUser(Long id, UserDTO userDTO) {
        try {
            User existingUser = findUserById(id);

            // Update user details
            existingUser.setName(userDTO.getName());
            existingUser.setEmail(userDTO.getEmail());
            existingUser.setGender(userDTO.getGender());
            existingUser.setPhoneNumber(userDTO.getPhoneNumber());
            existingUser.setProfilePicture(userDTO.getProfilePicture());
            existingUser.setUpdatedAt(new java.sql.Date(new Date().getTime()));

            // Update addresses
            List<Address> updatedAddresses = userDTO.getAddresses().stream()
                    .map(addressMapper::convertToEntity)
                    .peek(address -> address.setUser(existingUser))
                    .collect(Collectors.toList());

            existingUser.getAddresses().clear();
            existingUser.getAddresses().addAll(updatedAddresses);

            User updatedUser = userRepository.save(existingUser);

            // Publish RabbitMQ event
            publishEvent("user.updated", updatedUser);

            return userMapper.convertToDTO(updatedUser);

        } catch (Exception e) {
            throw new RuntimeException("Error updating user: " + e.getMessage());
        }
    }

    // 🔥 Refactored repetitive logic into private methods
    private User findUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    // ✅ Enhanced RabbitMQ publishing with error handling
    private void publishEvent(String eventType, User user) {
        try {
            UserEvent event = new UserEvent(user.getId(), user.getName(), user.getEmail());
            
            // Send the event to RabbitMQ
            rabbitTemplate.convertAndSend("user-exchange", eventType, event);

            System.out.println("✅ Event published: " + eventType + " for user ID: " + user.getId());

        } catch (AmqpException e) {
            System.err.println("⚠️ Failed to publish RabbitMQ event: " + e.getMessage());
        }
    }
}
