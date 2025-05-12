package com.wishlist;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@EnableFeignClients(basePackages = "com.wishlist.Client")
@SpringBootApplication
public class WishListServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(WishListServiceApplication.class, args);
	}

}
