package com.example.demo.controller;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.PasswordResetToken;
import com.example.demo.entity.User;
import com.example.demo.repository.PasswordResetTokenRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.EmailService;

@RestController
@RequestMapping("/api/forgot-password")
@CrossOrigin(origins = "http://localhost:5173")
public class ForgotPasswordController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordResetTokenRepository tokenRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private EmailService emailService;

    @PostMapping("/request-otp")
    @Transactional
    public ResponseEntity<?> requestOtp(@RequestBody Map<String, String> payload) {
        String email = payload.get("email");
        User user = userRepository.findByEmail(email).orElse(null);
        if (user == null) {
            return ResponseEntity.status(404).body(Map.of("message", "User not found"));
        }

        // Generate a 6-digit OTP
        String otp = String.format("%06d", new Random().nextInt(999999));

        // Set expiry date to 5 minutes from now
        LocalDateTime expiryDate = LocalDateTime.now().plusMinutes(5);

        // Remove any existing OTP for this email
        tokenRepository.deleteByEmail(email);

        // Save the new OTP token
        PasswordResetToken token = new PasswordResetToken();
        token.setEmail(email);
        token.setOtp(otp);
        token.setExpiryDate(expiryDate);
        tokenRepository.save(token);

        try {
            emailService.sendOtpEmail(email, otp);
            return ResponseEntity.ok(Map.of("message", "OTP sent to your email"));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("message", "Failed to send OTP email"));
        }
    }

    @PostMapping("/verify-otp")
    @Transactional
    public ResponseEntity<?> verifyOtpAndResetPassword(@RequestBody Map<String, String> payload) {
        String email = payload.get("email");
        String otp = payload.get("otp");
        String newPassword = payload.get("newPassword");

        PasswordResetToken token = tokenRepository.findByEmailAndOtp(email, otp).orElse(null);

        if (token == null) {
            return ResponseEntity.status(400).body(Map.of("message", "Invalid OTP"));
        }

        // Check if the OTP has expired
        if (token.getExpiryDate().isBefore(LocalDateTime.now())) {
            tokenRepository.delete(token);
            return ResponseEntity.status(400).body(Map.of("message", "OTP expired"));
        }

        // OTP is valid – update the user's password
        User user = userRepository.findByEmail(email).orElse(null);
        if (user == null) {
            return ResponseEntity.status(404).body(Map.of("message", "User not found"));
        }
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);

        // Delete the used OTP token
        tokenRepository.delete(token);

        return ResponseEntity.ok(Map.of("message", "Password reset successfully"));
    }
}
