package com.wishlist.Controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.wishlist.DTO.WishListDTO;
import com.wishlist.Entity.WishList;
import com.wishlist.Service.WishListService;

@RestController
@RequestMapping("/api/wishlists")
public class WishListController {

    private final WishListService wishListService;

    public WishListController(WishListService wishListService){
        this.wishListService = wishListService;
    }

    @GetMapping
    public List<WishList> getAllWishListItems(){
        return wishListService.getAllWishListItems();
    }

    @GetMapping("/user/{userId}")
    public List<WishListDTO> getWishListByUserId(@PathVariable Long userId){
        return wishListService.getWishListByUserId(userId);
    }
    @PostMapping("/add")
    public ResponseEntity<WishListDTO> addProductToWishList(@RequestParam Long userId, @RequestParam Long productId){
        WishListDTO wishListDTO = wishListService.addProductToWishList(userId, productId);
        return ResponseEntity.ok(wishListDTO);
    }

    @DeleteMapping("/remove")
    public ResponseEntity<String> removeFromWishList(@RequestParam long userId, @RequestParam Long productId){
        wishListService.removeProductFromWishList(userId, productId);
        return ResponseEntity.ok("Product removed from wishlist");
    }

    @GetMapping("/exists")
    public ResponseEntity<Boolean> isProductInWishList(@RequestParam long userId, @RequestParam Long productId){
        boolean exists = wishListService.isProductInWishlist(userId, productId);
        return ResponseEntity.ok(exists);
    }
}
