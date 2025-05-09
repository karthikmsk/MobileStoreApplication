package com.user.Controller;

import com.user.DTO.AuthRequest;
import com.user.Service.AuthenticationService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class AuthenticationController {

    private final AuthenticationService authenticationService;
    private static final Logger logger = LoggerFactory.getLogger(AuthenticationController.class);

    public AuthenticationController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest authRequest) {
        try {
            String token = authenticationService.authenticate(authRequest.getEmail(), authRequest.getPassword());
            return ResponseEntity.ok().body(Map.of("token", token));
        } catch (BadCredentialsException e) {
            logger.error("Invalid password for user: {}", authRequest.getEmail());
            return ResponseEntity.status(401).body(Map.of("error", "Invalid password"));
        } catch (UsernameNotFoundException e) {
            logger.error("User not found: {}", authRequest.getEmail());
            return ResponseEntity.status(404).body(Map.of("error", "User not found"));
        } catch (Exception e) {
            logger.error("Unexpected error: {}", e.getMessage(), e);
            return ResponseEntity.status(500).body(Map.of("error", "Internal server error"));
        }
    }
}
