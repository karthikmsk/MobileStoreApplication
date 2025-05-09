package com.wishlist.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.wishlist.Entity.WishList;

@Repository
public interface WishListRepository extends JpaRepository<WishList,Long> {

    @Override
    List<WishList> findAll();

    Optional<WishList> findByUserIdAndProductId(Long userId, Long prodcutId);

    List<WishList> findByUserId(Long userId);

    

}
