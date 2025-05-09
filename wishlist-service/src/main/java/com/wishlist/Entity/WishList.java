package com.wishlist.Entity;

import java.util.Date;
import java.util.Map;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;

@Entity
@Table(name = "wishlist")
public class WishList {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long wishListId;
    private Long userId;
    private Long productId;
    private Date addedAt;

    @Transient
    private Map<String,Object> productDetails;
    @Transient
    private Map<String,Object> userDetails;

    public WishList(){

    }
    
    public WishList(Long wishListId, Long userId, Long productId, Date addedAt) {
        this.wishListId = wishListId;
        this.userId = userId;
        this.productId = productId;
        this.addedAt = addedAt;
    }

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
    public Date getAddedAt() {
        return addedAt;
    }
    public void setAddedAt(Date addedAt) {
        this.addedAt = addedAt;
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
