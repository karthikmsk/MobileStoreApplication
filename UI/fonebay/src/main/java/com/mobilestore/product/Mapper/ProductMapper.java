package com.mobilestore.product.Mapper;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import com.mobilestore.product.DTO.ProductDTO;
import com.mobilestore.product.Entity.Product;

@Component
public class ProductMapper {
    private final ModelMapper modelMapper;

    public ProductMapper(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
        // modelMapper.typeMap(ProductDTO.class,Product.class).addMapping(mapper ->
        // mapper.map(ProductDTO :: getColor, ProductDTO :: setColor));
    }

    public ProductDTO convertToDTO(Product product) {
        return modelMapper.map(product, ProductDTO.class);
    }

    public List<ProductDTO> convertToDTOList(List<Product> products) {
        return products.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public Product convertToEntity(ProductDTO productDTO) {
        if (productDTO.getPrice() == null) {
            throw new IllegalArgumentException("Price is required");
        }
        Product product = modelMapper.map(productDTO, Product.class);

        product.setFinalPrice(productDTO.getPrice(), productDTO.getDiscount());

        return product;

    }

}
