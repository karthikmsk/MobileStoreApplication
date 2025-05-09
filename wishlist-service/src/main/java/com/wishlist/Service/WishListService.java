package com.wishlist.Service;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.stereotype.Service;

import com.wishlist.Client.ProductClient;
import com.wishlist.Client.UserClient;
import com.wishlist.DTO.WishListDTO;
import com.wishlist.Entity.WishList;
import com.wishlist.Mapper.WishListMapper;
import com.wishlist.Repository.WishListRepository;

@Service
public class WishListService {
    
    private final WishListRepository wishListRepository;
    private final ProductClient productClient;
    private final UserClient userClient;
    private final WishListMapper wishListMapper;
    private final RabbitTemplate rabbitTemplate;
    private static final String EXCHANGE_NAME = "wishlist-exchange";
    private static final String ROUTING_KEY = "wishlist.update";

    public WishListService(
            WishListRepository wishListRepository, 
            ProductClient productClient, 
            UserClient userClient,
            WishListMapper wishListMapper,
            RabbitTemplate rabbitTemplate) {
        this.wishListRepository = wishListRepository;
        this.productClient = productClient;
        this.userClient = userClient;
        this.wishListMapper = wishListMapper;
        this.rabbitTemplate = rabbitTemplate;
        // Set the message converter to handle JSON serialization/deserialization
        this.rabbitTemplate.setMessageConverter(new Jackson2JsonMessageConverter());
    }

    public List<WishList> getAllWishListItems(){
        List<WishList> wishList = wishListRepository.findAll();

        return wishList.stream().map(item -> {
            item.setProductDetails(productClient.getProductById(item.getProductId()));
            item.setUserDetails(userClient.getUserById(item.getUserId()));
            return item; 
        }).collect(Collectors.toList());
    }

    public List<WishListDTO> getWishListByUserId(Long userId){
        List<WishList> wishLists = wishListRepository.findByUserId(userId);

        if(wishLists.isEmpty()){
            throw new RuntimeException("No wishlist found for user with ID: " + userId);
        }

        return wishLists.stream().map(item -> {
            item.setProductDetails(productClient.getProductById(item.getProductId()));
            item.setUserDetails(userClient.getUserById(item.getUserId()));
            return wishListMapper.toDto(item); // use mapper
        }).collect(Collectors.toList());
    }

    public WishListDTO addProductToWishList(Long userId, Long productId){
        Map<String,Object> userDetails;
        try {
            userDetails = userClient.getUserById(userId);
            if (userDetails == null || userDetails.isEmpty()) {
                throw new RuntimeException("User not found.");
            }
        } catch(RuntimeException e){
            throw new RuntimeException("Failed to connect to UserService: " + e.getMessage());
        }

        Map<String,Object> productDetails;
        try {
            productDetails = productClient.getProductById(productId);
            if (productDetails == null || productDetails.isEmpty()) {
                throw new RuntimeException("Product not found.");
            }
        } catch(RuntimeException e){
            throw new RuntimeException("Product with ID "+ productId + " not found");
        }

        Optional<WishList> existingWishList = wishListRepository.findByUserIdAndProductId(userId, productId);
        if(existingWishList.isPresent()){
            throw new RuntimeException("Product is already in the wishlist");
        }

        WishList wishList = new WishList();
        wishList.setUserId(userId);
        wishList.setProductId(productId);
        wishList.setAddedAt(new Date());

        WishList savedWishList = wishListRepository.save(wishList);

        savedWishList.setUserDetails(userDetails);
        savedWishList.setProductDetails(productDetails);
        rabbitTemplate.convertAndSend(EXCHANGE_NAME, ROUTING_KEY, savedWishList);
        return wishListMapper.toDto(savedWishList); 
    }

    public void removeProductFromWishList(Long userId, Long productId){
        Optional<WishList> wishListItem = wishListRepository.findByUserIdAndProductId(userId, productId);
        if(wishListItem.isEmpty()){
            throw new RuntimeException("Product not found in wishlist");
        }
        rabbitTemplate.convertAndSend(EXCHANGE_NAME, ROUTING_KEY, productId);

        wishListRepository.delete(wishListItem.get());
    }

    public boolean isProductInWishlist(Long userId, Long productId){
        return wishListRepository.findByUserIdAndProductId(userId, productId).isPresent();
    }
}
