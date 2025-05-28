package com.example.demo.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;

@RestController

@RequestMapping("/api")

@CrossOrigin(origins = "http://localhost:5173")

public class LoginController {

    @Autowired

    private UserRepository userRepository;
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @PostMapping("/login")

    public ResponseEntity<?> loginUser(@RequestBody Map<String, String> credentials) {

        String emailOrPhone = credentials.get("emailOrPhone");

        String password = credentials.get("password");

        // Find user by email or phone number
        User foundUser = userRepository.findByEmailOrPhoneNumber(emailOrPhone, emailOrPhone);

        if (foundUser != null) {

            if (passwordEncoder.matches(password, foundUser.getPassword())) {

                return ResponseEntity.ok().body(Map.of(
                        "message", "Login successful!",
                        "role", foundUser.getRole()
                ));

            } else {

                return ResponseEntity.status(401).body(Map.of("message", "Invalidpassword"));

            }

        }

        return ResponseEntity.status(404).body(Map.of("message", "Usernotfound"));

    }

}
