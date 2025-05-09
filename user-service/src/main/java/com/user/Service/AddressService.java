package com.user.Service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.user.DTO.AddressDTO;
import com.user.Entity.Address;
import com.user.Entity.User;
import com.user.Mapper.AddressMapper;
import com.user.Repository.AddressRepository;
import com.user.Repository.UserRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class AddressService {
    @Autowired
    private final AddressRepository addressRepository;
    @Autowired
    private final UserRepository userRepository;
    @Autowired
    private final AddressMapper addressMapper;

    public AddressService(AddressRepository addressRepository, AddressMapper addressMapper,UserRepository userRepository ){
        this.addressRepository = addressRepository;
        this.addressMapper = addressMapper;
        this.userRepository = userRepository;
    }

    public List<AddressDTO> getAllAddresses(){
        List<Address> addresses = addressRepository.findAll();
        return addresses.stream().map(addressMapper::convertToDTO).collect(Collectors.toList());
    }

    public AddressDTO getAddressById(Long id){
        Address address = addressRepository.findById(id)
            .orElseThrow(()-> new RuntimeException("Address not found"));
        return addressMapper.convertToDTO(address);    
    }

    public AddressDTO createAddress(AddressDTO addressDTO){
       Long userId = addressDTO.getUserId();

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        Address address = addressMapper.convertToEntity(addressDTO);
        address.setUser(user); // associate address with user

        Address savedAddress = addressRepository.save(address);
        return addressMapper.convertToDTO(savedAddress);
    }

    public AddressDTO updateAddress(Long id, AddressDTO addressDTO){
        Address existingAddress = addressRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Address not found"));
        
        existingAddress.setStreet(addressDTO.getStreet());
        existingAddress.setCity(addressDTO.getCity());
        existingAddress.setState(addressDTO.getState());
        existingAddress.setZipCode(addressDTO.getZipCode());
        existingAddress.setAddressType(addressDTO.getAddressType());
        Address updateAddress = addressRepository.save(existingAddress);
        return addressMapper.convertToDTO(updateAddress);
    }

    public void deleteAddressById(Long id){
        addressRepository.deleteById(id);
    }
}
