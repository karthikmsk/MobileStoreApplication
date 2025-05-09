package com.user.Mapper;

import java.util.stream.Collectors;

import java.util.List;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import com.user.DTO.AddressDTO;
import com.user.DTO.UserDTO;
import com.user.Entity.User;

@Component
public class UserMapper {
    private final ModelMapper modelMapper;
    private final AddressMapper addressMapper;

    public UserMapper(ModelMapper modelMapper,AddressMapper addressMapper){
        this.modelMapper = modelMapper;
        this.addressMapper = addressMapper;
    }

    public UserDTO convertToDTO(User user) {
        UserDTO dto = new UserDTO();
    dto.setId(user.getId());
    dto.setName(user.getName());
    dto.setEmail(user.getEmail());
    dto.setGender(user.getGender());
    dto.setPhoneNumber(user.getPhoneNumber());
    dto.setProfilePicture(user.getProfilePicture());

    List<AddressDTO> addressDTOs = user.getAddresses().stream()
        .map(address ->{
            AddressDTO addressDTO = new AddressDTO();
            addressDTO.setAddressId(address.getAddressId());
            addressDTO.setStreet(address.getStreet());
            addressDTO.setCity(address.getCity());
            addressDTO.setState(address.getState());
            addressDTO.setZipCode(address.getZipCode());
            addressDTO.setAddressType(address.getAddressType());
            return addressDTO;

        })
        .collect(Collectors.toList());

    dto.setAddresses(addressDTOs);
    return dto;
    }

    public User convertToEntity(UserDTO userDTO) {
        User user = modelMapper.map(userDTO, User.class);
        user.setAddresses(userDTO.getAddresses().stream()
                .map(addressMapper::convertToEntity)
                .collect(Collectors.toList()));
        return user;
    }
}

