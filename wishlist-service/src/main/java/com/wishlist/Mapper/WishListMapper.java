package com.wishlist.Mapper;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import com.wishlist.DTO.WishListDTO;
import com.wishlist.Entity.WishList;

@Component
public class WishListMapper {

    private final ModelMapper modelMapper;

    public WishListMapper(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }
    public WishListDTO toDto(WishList wishList) {
        return modelMapper.map(wishList, WishListDTO.class);
    }
    public WishList toEntity(WishListDTO wishListDTO) {
        return modelMapper.map(wishListDTO, WishList.class);
    }

   
}
