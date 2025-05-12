package com.wishlist;

import com.wishlist.Client.ProductClient;
import com.wishlist.Client.UserClient;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class WishListServiceApplicationTests {

	@MockBean
    private ProductClient productClient;

    @MockBean
    private UserClient userClient;

    @Autowired
    private WishListService wishListService;

	@Test
	void contextLoads() {
	}

}
