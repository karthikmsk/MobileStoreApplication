package com.mobilestore.product.Controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mobilestore.product.DTO.ProductDTO;
import com.mobilestore.product.Enum.Brand;
import com.mobilestore.product.Service.ProductService;

@RestController

@RequestMapping("api/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping("/all")
    public List<ProductDTO> getAllProducts() {
        return productService.getAllProducts();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDTO> getProductById(@PathVariable Long id) {
        return ResponseEntity.ok(productService.getProductById(id));
    }

    @GetMapping("/brand/{brand}")
    public List<ProductDTO> getProductByBrand(@PathVariable Brand brand) {
        return productService.getProductByBrand(brand);
    }

    @GetMapping("/brands")
    public List<String> getProductBrands() {
        return productService.getProductBrands();
    }

    @GetMapping("/brand/{brand}/count")
public ResponseEntity<?> getProductCountByBrand(@PathVariable String brand) {
    try {
        Brand brandEnum = Brand.valueOf(brand.toUpperCase());
        int count = productService.getProductCountsByBrand(brandEnum);
        return ResponseEntity.ok(count);
    } catch (IllegalArgumentException e) {
        return ResponseEntity.badRequest().body("Invalid brand name: " + brand);
    }
}


    @GetMapping("/name/{productName}")
    public ResponseEntity<ProductDTO> getProductByName(@PathVariable String productName) {
        return ResponseEntity.ok(productService.getProductByName(productName));
    }

    @GetMapping("/mobile/color-variants")
    public ResponseEntity<List<ProductDTO>> getProductByColor(@RequestParam String productName,@RequestParam String color) {
        List<ProductDTO> product = productService.getProductByColor(productName, color);
        return ResponseEntity.ok(product);
    }

    @GetMapping("/mobile/storage-variants")
    public ResponseEntity<List<ProductDTO>> getProductByStorage(@RequestParam String productName,@RequestParam String storage,@RequestParam String color){
        List<ProductDTO> product  = productService.getProductByStorage(productName,storage,color);
        return ResponseEntity.ok(product);
    }
    
    
    @GetMapping("/price-range")
    public ResponseEntity<List<List<ProductDTO>>> getProductByPriceRange(@RequestParam double minPrice,
            @RequestParam double maxPrice,
            @RequestParam int priceRange) {
        List<List<ProductDTO>> priceBuckets = productService.getProductsByPriceBuckets(minPrice, maxPrice, priceRange);
        if (priceBuckets.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(priceBuckets);
    }

    @GetMapping("/battery-range")
    public ResponseEntity<List<List<ProductDTO>>> getProductByBattery(@RequestParam Integer minValue,
            @RequestParam Integer maxValue, @RequestParam Integer batteryRange) {
        List<List<ProductDTO>> batteryBuckets = productService.getProductsByBattery(minValue, maxValue, batteryRange);
        if (batteryBuckets.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(batteryBuckets);

    }

    @GetMapping("/ram/{ram}")
    public List<ProductDTO> getProductByRam(@PathVariable String ram) {
        return productService.getProductByRam(ram);
    }

    @GetMapping("/filter-counts")
    public ResponseEntity<Map<String, Map<String, Integer>>> getFilterCounts() {
        Map<String, Map<String, Integer>> filterCounts = productService.getFilterCounts();
        return ResponseEntity.ok(filterCounts);
    }

    @GetMapping("/sort/price-asc")
    public List<ProductDTO> getProductsAscSortByPrice() {
        return productService.getProductsAscSortByPrice();
    }

    @GetMapping("/sort/price-desc")
    public List<ProductDTO> getProductsDescSortByPrice() {
        return productService.getProductsDescSortByPrice();
    }

    @GetMapping("/sort/newest")
    public List<ProductDTO> getNewProducts() {
        return productService.getNewProducts();
    }

    @GetMapping("/old-products")
    public List<ProductDTO> getOldProducts() {
        return productService.getOldProducts();
    }

    @GetMapping("/colors")
    public ResponseEntity<List<String>> getColorsByProductName(@RequestParam String productName){
        List<String> colors = productService.getDistinctColorsByProductName(productName);
        return ResponseEntity.ok(colors);
    }

    @GetMapping("/storages")
    public ResponseEntity<List<String>> getStoragesByProductName(@RequestParam String productName,@RequestParam String color){
        List<String> storages = productService.getDistinctStoragesByProductName(productName,color);
        return ResponseEntity.ok(storages);
    }

    

    @PostMapping
    public ResponseEntity<?> createProduct(@RequestBody ProductDTO productDTO) {
        productDTO.setProductId(null);
        if (productDTO.getPrice() == null) {
            return ResponseEntity.badRequest().body("Price cannot be null");
        }
        ProductDTO savedProduct = productService.createProduct(productDTO);
        return ResponseEntity.ok(savedProduct);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductDTO> updateProduct(@PathVariable Long id, @RequestBody ProductDTO productDTO) {
        ProductDTO updatedProduct = productService.updateProduct(id, productDTO);
        return ResponseEntity.ok(updatedProduct);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ProductDTO> deleteProductById(@PathVariable Long id) {
        productService.deleteProductById(id);
        return ResponseEntity.noContent().build();
    }

}
