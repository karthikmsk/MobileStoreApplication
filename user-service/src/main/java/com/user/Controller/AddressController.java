package com.user.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.user.DTO.AddressDTO;
import com.user.Service.AddressService;

@RestController
@RequestMapping("api/users/addresses")
public class AddressController {

    @Autowired
    private AddressService addressService;

    @GetMapping("/{id}")
    public ResponseEntity<AddressDTO> getAddressById(@RequestParam Long id) {
        return ResponseEntity.ok(addressService.getAddressById(id));
    }

    @GetMapping()
    public ResponseEntity<List<AddressDTO>> getAllAddresses(){
        return ResponseEntity.ok(addressService.getAllAddresses());
    }
    
    
    @PostMapping("/{userId}")
public ResponseEntity<AddressDTO> createAddress(
        @PathVariable Long userId,
        @RequestBody AddressDTO addressDTO) {

    addressDTO.setUserId(userId); // ensure userId is set
    AddressDTO createdAddress = addressService.createAddress(addressDTO);
    return new ResponseEntity<>(createdAddress, HttpStatus.CREATED);
}


    @PutMapping("/{id}")
    public ResponseEntity<AddressDTO> updateAddress(@PathVariable Long id, @RequestBody AddressDTO addressDTO) {
        AddressDTO updatedAddress = addressService.updateAddress(id, addressDTO);
        return ResponseEntity.ok(updatedAddress);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<AddressDTO>deleteAddress(@PathVariable Long id){
        addressService.deleteAddressById(id);
        return ResponseEntity.noContent().build();
    }
    
}

