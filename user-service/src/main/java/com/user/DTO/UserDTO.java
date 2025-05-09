package com.user.DTO;

import java.util.List;

import com.user.Enum.Gender;

public class UserDTO {
    private Long id;
    private String name;
    private String email;
    private String phoneNumber;
    private String password;
    private String profilePicture;
    private Gender gender;
    private List<AddressDTO> addresses;

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getPhoneNumber() {
        return phoneNumber;
    }
    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
    
    public String getProfilePicture() {
        return profilePicture;
    }
    public void setProfilePicture(String profilePicture) {
        this.profilePicture = profilePicture;
    }
    public List<AddressDTO> getAddresses() {
        return addresses;
    }
    public void setAddresses(List<AddressDTO> addresses) {
        this.addresses = addresses;
    }
    public Gender getGender() {
        return gender;
    }
    public void setGender(Gender gender) {
        this.gender = gender;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
       
    
}

