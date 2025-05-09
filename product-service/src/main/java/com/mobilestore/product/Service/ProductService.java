package com.mobilestore.product.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import java.util.stream.Collectors;

import org.hibernate.Hibernate;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import com.mobilestore.product.DTO.ProductDTO;
import com.mobilestore.product.Entity.Product;
import com.mobilestore.product.Enum.Brand;
import com.mobilestore.product.Exception.ProductNotFoundException;
import com.mobilestore.product.Mapper.ProductMapper;
import com.mobilestore.product.Repository.ProductRepository;

import jakarta.transaction.Transactional;

@Service
public class ProductService {

    @Autowired
    private final RabbitTemplate rabbitTemplate;

    @Autowired
    private final ProductRepository productRepository;

    private final ProductMapper productMapper;

    private static final String EXCHANGE_NAME = "product-exchange";

    private static final String ROUTING_KEY = "product.update";

    public ProductService(ProductRepository productRepository, ProductMapper productMapper,
            RabbitTemplate rabbitTemplate) {
        this.productRepository = productRepository;
        this.productMapper = productMapper;
        this.rabbitTemplate = rabbitTemplate;
        this.rabbitTemplate.setMessageConverter(new Jackson2JsonMessageConverter());
    }

    @Transactional
    public ProductDTO getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException("Product not found"));
        Hibernate.initialize(product.getImages()); // Initialize the images collection
        return productMapper.convertToDTO(product);
    }

    @Transactional
    public int getProductCountsByBrand(Brand brand) {
        return productRepository.countByBrand(brand);
    }
    
    @Transactional
    public List<String> getProductBrands(){
        return Arrays.stream(Brand.values()).map(Enum :: name).collect(Collectors.toList());
    }

    @Transactional
    public List<ProductDTO> getProductByBrand(Brand brand) {
        List<Product> products = productRepository.findByBrand(brand);
        products.forEach(product -> Hibernate.initialize(product.getImages())); // Initialize the images collection
        return productMapper.convertToDTOList(products);
    }

    @Transactional
    public List<ProductDTO> getProductsAscSortByPrice() {
        List<Product> products = productRepository.findAll(Sort.by(Sort.Direction.ASC, "price"));
        return products.stream().map(productMapper::convertToDTO).collect(Collectors.toList());
    }

    @Transactional
    public List<ProductDTO> getProductsDescSortByPrice() {
        List<Product> products = productRepository.findAll(Sort.by(Sort.Direction.DESC, "price"));
        return products.stream().map(productMapper::convertToDTO).collect(Collectors.toList());
    }

    @Transactional
    public List<ProductDTO> getNewProducts() {
        List<Product> products = productRepository.findAll(Sort.by(Sort.Direction.ASC, "createdAt"));
        return products.stream().map(productMapper::convertToDTO).collect(Collectors.toList());
    }

    @Transactional
    public List<ProductDTO> getOldProducts() {
        List<Product> products = productRepository.findAll(Sort.by(Sort.Direction.DESC, "createdAt"));
        return products.stream().map(productMapper::convertToDTO).collect(Collectors.toList());
    }

    @Transactional
    public List<String> getDistinctColorsByProductName(String productName) {
        return productRepository.findDistinctColorsByProductName(productName);
    }

    @Transactional
    public List<String> getDistinctStoragesByProductName(String productName, String color) {
        return productRepository.findDistinctStoragesByProductNameAndColor(productName, color);
    }

    @Transactional
    public ProductDTO getProductByName(String productName) {
        Product product = productRepository.findByProductName(productName)
                .orElseThrow(() -> new RuntimeException("Product not found in " + productName));
        Hibernate.initialize(product.getImages());
        return productMapper.convertToDTO(product);
    }

    @Transactional
    public List<ProductDTO> getProductByColor(@RequestParam String productName, @RequestParam String color) {
        List<Product> products = productRepository.findByProductNameAndColor(productName, color);
        products.forEach(product -> Hibernate.initialize(product.getImages())); // Initialize the images collection
        return products.stream().map(productMapper::convertToDTO).collect(Collectors.toList());
    }

    @Transactional
    public List<ProductDTO> getProductByStorage(@RequestParam String productName, @RequestParam String storage,
            @RequestParam String color) {
        List<Product> products = productRepository.findByProductNameAndStorageAndColor(productName, storage, color);
        products.forEach(product -> Hibernate.initialize(product.getImages())); // Initialize the images collection
        return products.stream().map(productMapper::convertToDTO).collect(Collectors.toList());
    }

    @Transactional
    public List<ProductDTO> getProductByRam(String ram) {
        List<Product> products = productRepository.findByRam(ram);
        if (products.isEmpty()) {
            throw new RuntimeException("Product not found with RAM: " + ram);
        }
        products.forEach(product -> Hibernate.initialize(product.getImages())); // Initialize the images collection
        return productMapper.convertToDTOList(products);
    }

    @Transactional
    public List<List<ProductDTO>> getProductsByBattery(Integer minValue, Integer maxValue, Integer batteryRange) {
        List<List<ProductDTO>> storageBuckets = new ArrayList<>();

        for (double bucketMinPrice = minValue; bucketMinPrice < maxValue; bucketMinPrice += batteryRange) {
            double bucketMaxPrice = bucketMinPrice + batteryRange;
            List<Product> productsInRange = productRepository.getProductsByBatteryRange(bucketMinPrice, bucketMaxPrice);

            if (!productsInRange.isEmpty()) {
                productsInRange.forEach(product -> Hibernate.initialize(product.getImages())); // Initialize the images
                                                                                               // collection
                storageBuckets.add(productMapper.convertToDTOList(productsInRange));
            }
        }

        return storageBuckets;
    }

    @Transactional
    public List<List<ProductDTO>> getProductsByPriceBuckets(double minPrice, double maxPrice, double priceRange) {
        List<List<ProductDTO>> priceBuckets = new ArrayList<>();

        for (double bucketMinPrice = minPrice; bucketMinPrice < maxPrice; bucketMinPrice += priceRange) {
            double bucketMaxPrice = bucketMinPrice + priceRange;
            List<Product> productsInRange = productRepository.getProductsByPriceRange(bucketMinPrice, bucketMaxPrice);

            if (!productsInRange.isEmpty()) {
                productsInRange.forEach(product -> Hibernate.initialize(product.getImages())); // Initialize the images
                                                                                               // collection
                priceBuckets.add(productMapper.convertToDTOList(productsInRange));
            }
        }

        return priceBuckets;
    }

    public ProductDTO createProduct(ProductDTO productDTO) {
        Product product = productMapper.convertToEntity(productDTO);
        product.setProductId(null);
        product = productRepository.save(product);
        ProductDTO createdProductDTO = productMapper.convertToDTO(product);
        System.out.println(product);
        rabbitTemplate.convertAndSend(EXCHANGE_NAME, ROUTING_KEY, createdProductDTO);
        return productMapper.convertToDTO(product);
    }

    public ProductDTO updateProduct(Long id, ProductDTO productDTO) {
        Product existingProduct = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        existingProduct.setProductName(productDTO.getProductName());
        existingProduct.setBrand(productDTO.getBrand());
        existingProduct.setPrice(productDTO.getPrice());
        existingProduct.setDescription(productDTO.getDescription());
        existingProduct.setProcessor(productDTO.getProcessor());
        existingProduct.setRam(productDTO.getRam());
        existingProduct.setStorage(productDTO.getStorage());
        existingProduct.setBatteryCapacity(productDTO.getBatteryCapacity());
        existingProduct.setDisplaySize(productDTO.getDisplaySize());
        existingProduct.setResolution(productDTO.getResolution());
        existingProduct.setRefreshRate(productDTO.getRefreshRate());
        existingProduct.setCamera(productDTO.getCamera());
        existingProduct.setFrontCamera(productDTO.getFrontCamera());
        existingProduct.setOsType(productDTO.getOsType());
        existingProduct.setOsVersion(productDTO.getOsVersion());
        existingProduct.setScreenType(productDTO.getScreenType());
        existingProduct.setChargeWatt(productDTO.getChargeWatt());
        existingProduct.setNetwork(productDTO.getNetwork());
        existingProduct.setWeight(productDTO.getWeight());
        existingProduct.setColor(productDTO.getColor());
        existingProduct.setIsFastCharging(productDTO.getIsFastCharging());
        existingProduct.setIsWirelessCharging(productDTO.getIsWirelessCharging());
        existingProduct.setDiscount(productDTO.getDiscount());
        existingProduct.setWarranty(productDTO.getWarranty());
        existingProduct.setIsInStock(productDTO.getIsInStock());
        existingProduct.setSellerId(productDTO.getSellerId());
        existingProduct.setImages(productDTO.getImages());
        existingProduct.setAverageRating(productDTO.getAverageRating());
        existingProduct.setRatingsCount(productDTO.getRatingsCount());

        Product updatedProduct = productRepository.save(existingProduct);
        ProductDTO updatedProductDTO = productMapper.convertToDTO(updatedProduct);

        // Publish event to RabbitMQ
        rabbitTemplate.convertAndSend(EXCHANGE_NAME, ROUTING_KEY, updatedProductDTO);
        return productMapper.convertToDTO(updatedProduct);
    }

    public void deleteProductById(Long id) {
        productRepository.deleteById(id);
        rabbitTemplate.convertAndSend(EXCHANGE_NAME, ROUTING_KEY, id);

    }

    @Transactional
    public List<ProductDTO> getAllProducts() {
        List<Product> products = productRepository.findAll();
        products.forEach(product -> Hibernate.initialize(product.getImages())); // Initialize the images collection
        return productMapper.convertToDTOList(products);
    }

    @Transactional
    public Map<String, Map<String, Integer>> getFilterCounts() {
        List<Product> products = productRepository.findAll();

        Map<String, Integer> priceRangeCounts = new TreeMap<>(
                Comparator.comparingInt(range -> Integer.valueOf(range.split("-")[0])));
        priceRangeCounts.put("0-10000", (int) products.stream().filter(p -> p.getFinalPrice() < 10000).count());
        priceRangeCounts.put("10000-20000",
                (int) products.stream().filter(p -> p.getFinalPrice() >= 10000 && p.getFinalPrice() < 20000).count());
        priceRangeCounts.put("20000-30000",
                (int) products.stream().filter(p -> p.getFinalPrice() >= 20000 && p.getFinalPrice() < 30000).count());
        priceRangeCounts.put("30000-40000",
                (int) products.stream().filter(p -> p.getFinalPrice() >= 30000 && p.getFinalPrice() < 40000).count());
        priceRangeCounts.put("40000-50000",
                (int) products.stream().filter(p -> p.getFinalPrice() >= 40000 && p.getFinalPrice() < 50000).count());
        priceRangeCounts.put("50000-60000",
                (int) products.stream().filter(p -> p.getFinalPrice() >= 50000 && p.getFinalPrice() < 60000).count());
        priceRangeCounts.put("60000-70000",
                (int) products.stream().filter(p -> p.getFinalPrice() >= 60000 && p.getFinalPrice() < 70000).count());
        priceRangeCounts.put("70000-80000",
                (int) products.stream().filter(p -> p.getFinalPrice() >= 70000 && p.getFinalPrice() < 80000).count());
        priceRangeCounts.put("80000-90000",
                (int) products.stream().filter(p -> p.getFinalPrice() >= 80000 && p.getFinalPrice() < 90000).count());
        priceRangeCounts.put("90000-100000",
                (int) products.stream().filter(p -> p.getFinalPrice() >= 90000 && p.getFinalPrice() < 100000).count());
        priceRangeCounts.put("100000-300000",
                (int) products.stream().filter(p -> p.getFinalPrice() >= 100000 && p.getFinalPrice() < 300000).count());

        Map<String, Map<String, Integer>> filterCounts = new HashMap<>();
        filterCounts.put("priceRange", priceRangeCounts);

        return filterCounts;

    }
}