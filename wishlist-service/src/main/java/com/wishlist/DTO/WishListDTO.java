package com.wishlist.DTO;

import java.util.Map;

public class WishListDTO {
    private Long wishListId;
    private Long userId;
    private Long productId;
    private Map<String, Object> productDetails;
    private Map<String, Object> userDetails;

    public Long getWishListId() {
        return wishListId;
    }
    public void setWishListId(Long wishListId) {
        this.wishListId = wishListId;
    }
    public Long getUserId() {
        return userId;
    }
    public void setUserId(Long userId) {
        this.userId = userId;
    }
    public Long getProductId() {
        return productId;
    }
    public void setProductId(Long productId) {
        this.productId = productId;
    }
    public Map<String, Object> getProductDetails() {
        return productDetails;
    }
    public void setProductDetails(Map<String, Object> productDetails) {
        this.productDetails = productDetails;
    }
    public Map<String, Object> getUserDetails() {
        return userDetails;
    }
    public void setUserDetails(Map<String, Object> userDetails) {
        this.userDetails = userDetails;
    }
    
    
}
