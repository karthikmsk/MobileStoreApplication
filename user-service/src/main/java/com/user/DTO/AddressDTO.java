package com.user.DTO;

import com.user.Enum.AddressType;

public class AddressDTO {
    private Long addressId;
    private String street;
    private String city;
    private String state;
    private String zipCode;
    private AddressType addressType;
    private Long userId;
    
    public Long getAddressId() {
        return addressId;
    }
    public void setAddressId(Long addressId) {
        this.addressId = addressId;
    }
    public String getStreet() {
        return street;
    }
    public void setStreet(String street) {
        this.street = street;
    }
    public String getCity() {
        return city;
    }
    public void setCity(String city) {
        this.city = city;
    }
    public String getState() {
        return state;
    }
    public void setState(String state) {
        this.state = state;
    }
    public String getZipCode() {
        return zipCode;
    }
    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }
    public AddressType getAddressType() {
        return addressType;
    }
    public void setAddressType(AddressType addressType) {
        this.addressType = addressType;
    }
    public Long getUserId() {
        return userId;
    }
    public void setUserId(Long userId) {
        this.userId = userId;
    }

    

}
