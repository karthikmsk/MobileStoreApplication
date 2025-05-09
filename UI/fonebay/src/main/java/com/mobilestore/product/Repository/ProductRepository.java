package com.mobilestore.product.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.mobilestore.product.Entity.Product;
import com.mobilestore.product.Enum.Brand;

@Repository
public interface ProductRepository extends JpaRepository<Product,Long>{
    @Query("SELECT p FROM Product p WHERE p.brand = :brand")
    List<Product> findByBrand(@Param("brand") Brand brand);

    Optional<Product> findByProductName(String productName);

    @Query("SELECT p FROM Product p WHERE p.price >= :minPrice AND p.price <= :maxPrice")
    List<Product> getProductsByPriceRange(@Param("minPrice") double minPrice, @Param("maxPrice") double maxPrice);
    
    @Query("SELECT p FROM Product p WHERE p.batteryCapacity >= :minValue AND p.batteryCapacity <= :maxValue")
    List<Product> getProductsByBatteryRange(@Param("minValue") double minValue, @Param("maxValue") double maxValue);
   
    @Query("SELECT p FROM Product p ORDER BY p.price DESC LIMIT 1")
    Product findTopOrderByPriceDesc();

    Integer countByBrand(Brand brand);

    @Query("SELECT p FROM Product p WHERE p.ram = :ram")
    List<Product> findByRam(String ram);
    
    @Query("SELECT p FROM Product p WHERE p.storage = :storage")
    List<Product> findByRom(String storage);

    List<Product> findAllByOrderByPriceAsc();

    List<Product> findAllByOrderByPriceDesc();

    List<Product> findAllByOrderByCreatedAtAsc();

    List<Product> findAllByOrderByCreatedAtDesc();

    @Query("SELECT p FROM Product p LEFT JOIN FETCH p.images WHERE p.productName = :productName " +
           "AND LOWER(p.color) = LOWER(:color) AND LOWER(p.storage) = LOWER(:storage)")
    List<Product> findByProductNameAndColorAndStorage(@Param("productName") String productName,
                                                  @Param("color") String color,
                                                  @Param("storage") String storage);

    @Query("SELECT p FROM Product p WHERE LOWER(p.productName) = LOWER(:productName) AND LOWER(p.color)=LOWER(:color)")
    List<Product> findByProductNameAndColor(@Param("productName")String productName,@Param("color") String color);

    @Query("SELECT p FROM Product p WHERE LOWER(p.productName) = LOWER(:productName) AND LOWER(p.storage) = LOWER(:storage)AND LOWER(p.color) = LOWER(:color)")
    List<Product> findByProductNameAndStorageAndColor(@Param("productName")String productName,@Param("storage") String storage,@Param("color") String color);

    @Query("SELECT DISTINCT p.color FROM Product p WHERE p.productName = :productName")
    List<String> findDistinctColorsByProductName(@Param("productName") String productName);

    @Query("SELECT DISTINCT p.storage FROM Product p WHERE LOWER(p.productName) = LOWER(:productName) AND LOWER(p.color) = LOWER(:color)")
    List<String> findDistinctStoragesByProductNameAndColor(@Param("productName") String productName,@Param("color") String color);



    
}
