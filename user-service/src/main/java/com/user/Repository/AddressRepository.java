package com.user.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.user.Entity.Address;
import com.user.Entity.User;

public interface AddressRepository extends JpaRepository<Address, Long> {
    @Query("SELECT u FROM User u LEFT JOIN FETCH u.addresses WHERE u.id = :id")
    Optional<User> findUserWithAddresses(@Param("id") Long id);

}
