package com.user.Mapper;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import com.user.DTO.AddressDTO;
import com.user.Entity.Address;

@Component
public class AddressMapper {
     private final ModelMapper modelMapper = new ModelMapper();
   

     public AddressDTO convertToDTO(Address address){
        AddressDTO dto = new AddressDTO();
        dto.setAddressId(address.getAddressId());
        dto.setStreet(address.getStreet());
        dto.setCity(address.getCity());
        dto.setState(address.getState());
        dto.setZipCode(address.getZipCode());
        dto.setAddressType(address.getAddressType());
        return dto;
    }
    
    

    public Address convertToEntity(AddressDTO addressDTO){
        return modelMapper.map(addressDTO,Address.class);
    }
}
