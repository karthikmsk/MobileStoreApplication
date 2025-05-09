package com.mobilestore.product.DTO;

import java.util.List;
import com.mobilestore.product.Enum.Brand;

public class ProductDTO {
    private String productId;
    private String productName;
    private Brand brand;
    private Double price;
    private String description;
    private String processor;
    private String ram;
    private String storage;
    private Integer batteryCapacity;
    private Double displaySize;
    private String resolution;
    private String refreshRate;
    private String camera;
    private String frontCamera;
    private String osType;
    private String osVersion;
    private String screenType;
    private String chargeWatt;
    private String network;
    private Double weight;
    private String color;
    private Boolean isFastCharging;
    private Boolean isWirelessCharging;
    private Double discount;
    private Integer finalPrice;
    private String warranty;
    private Boolean isInStock;
    private Long sellerId;

    private List<String> images;

    private double averageRating;
    private String ratingsCount;
    private Boolean isFeatured;

    public ProductDTO() {

    }

    public ProductDTO(String productId, String productName, Brand brand, Double price, String description,
            String processor,
            String ram, String storage, Integer batteryCapacity, Double displaySize, String resolution,
            String refreshRate, String camera, String frontCamera, String osType, String osVersion, String screenType,
            String chargeWatt, String network, Double weight, String color, Boolean isFastCharging,
            Boolean isWirelessCharging, Double discount, Integer finalPrice, String warranty, Boolean isInStock,
            Long sellerId, List<String> images, double averageRating, String ratingsCount, Boolean isFeatured) {
        this.productId = productId;
        this.productName = productName;
        this.brand = brand;
        this.price = price;
        this.description = description;
        this.processor = processor;
        this.ram = ram;
        this.storage = storage;
        this.batteryCapacity = batteryCapacity;
        this.displaySize = displaySize;
        this.resolution = resolution;
        this.refreshRate = refreshRate;
        this.camera = camera;
        this.frontCamera = frontCamera;
        this.osType = osType;
        this.osVersion = osVersion;
        this.screenType = screenType;
        this.chargeWatt = chargeWatt;
        this.network = network;
        this.weight = weight;
        this.color = color;
        this.isFastCharging = isFastCharging;
        this.isWirelessCharging = isWirelessCharging;
        this.discount = discount;
        this.finalPrice = finalPrice;
        this.warranty = warranty;
        this.isInStock = isInStock;
        this.sellerId = sellerId;
        this.images = images;
        this.averageRating = averageRating;
        this.ratingsCount = ratingsCount;
        this.isFeatured = isFeatured;
    }

    public String getProductId() {
        return productId;
    }

    public void setProductId(String productId) {
        this.productId = productId;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public Brand getBrand() {
        return brand;
    }

    public void setBrand(Brand brand) {
        this.brand = brand;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getProcessor() {
        return processor;
    }

    public void setProcessor(String processor) {
        this.processor = processor;
    }

    public String getRam() {
        return ram;
    }

    public void setRam(String ram) {
        this.ram = ram;
    }

    public String getStorage() {
        return storage;
    }

    public void setStorage(String storage) {
        this.storage = storage;
    }

    public Integer getBatteryCapacity() {
        return batteryCapacity;
    }

    public void setBatteryCapacity(Integer batteryCapacity) {
        this.batteryCapacity = batteryCapacity;
    }

    public Double getDisplaySize() {
        return displaySize;
    }

    public void setDisplaySize(Double displaySize) {
        this.displaySize = displaySize;
    }

    public String getResolution() {
        return resolution;
    }

    public void setResolution(String resolution) {
        this.resolution = resolution;
    }

    public String getRefreshRate() {
        return refreshRate;
    }

    public void setRefreshRate(String refreshRate) {
        this.refreshRate = refreshRate;
    }

    public String getCamera() {
        return camera;
    }

    public void setCamera(String camera) {
        this.camera = camera;
    }

    public String getFrontCamera() {
        return frontCamera;
    }

    public void setFrontCamera(String frontCamera) {
        this.frontCamera = frontCamera;
    }

    public String getOsType() {
        return osType;
    }

    public void setOsType(String osType) {
        this.osType = osType;
    }

    public String getOsVersion() {
        return osVersion;
    }

    public void setOsVersion(String osVersion) {
        this.osVersion = osVersion;
    }

    public String getScreenType() {
        return screenType;
    }

    public void setScreenType(String screenType) {
        this.screenType = screenType;
    }

    public String getChargeWatt() {
        return chargeWatt;
    }

    public void setChargeWatt(String chargeWatt) {
        this.chargeWatt = chargeWatt;
    }

    public String getNetwork() {
        return network;
    }

    public void setNetwork(String network) {
        this.network = network;
    }

    public Double getWeight() {
        return weight;
    }

    public void setWeight(Double weight) {
        this.weight = weight;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public Boolean getIsFastCharging() {
        return isFastCharging;
    }

    public void setIsFastCharging(Boolean isFastCharging) {
        this.isFastCharging = isFastCharging;
    }

    public Boolean getIsWirelessCharging() {
        return isWirelessCharging;
    }

    public void setIsWirelessCharging(Boolean isWirelessCharging) {
        this.isWirelessCharging = isWirelessCharging;
    }

    public Double getDiscount() {
        return discount;
    }

    public void setDiscount(Double discount) {
        this.discount = discount;
    }

    public Integer getFinalPrice() {
        return finalPrice;
    }

    public void setFinalPrice(Integer finalPrice) {
       this.finalPrice = finalPrice;
    }

    public String getWarranty() {
        return warranty;
    }

    public void setWarranty(String warranty) {
        this.warranty = warranty;
    }

    public Long getSellerId() {
        return sellerId;
    }

    public void setSellerId(Long sellerId) {
        this.sellerId = sellerId;
    }

    public List<String> getImages() {
        return images;
    }

    public void setImages(List<String> images) {
        this.images = images;
    }

    public double getAverageRating() {
        return averageRating;
    }

    public void setAverageRating(double averageRating) {
        this.averageRating = averageRating;
    }

    public String getRatingsCount() {
        return ratingsCount;
    }

    public void setRatingsCount(String ratingsCount) {
        this.ratingsCount = ratingsCount;
    }

    public Boolean getIsFeatured() {
        return isFeatured;
    }

    public void setIsFeatured(Boolean isFeatured) {
        this.isFeatured = isFeatured;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Boolean getIsInStock() {
        return isInStock;
    }

    public void setIsInStock(Boolean isInStock) {
        this.isInStock = isInStock;
    }

}
