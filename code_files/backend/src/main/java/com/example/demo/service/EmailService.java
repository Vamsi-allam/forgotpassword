package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    
    @Value("${spring.mail.username}")
    private String fromEmail;
    
    @Autowired
    private JavaMailSender mailSender;

    public void sendOtpEmail(String toEmail, String otp) throws RuntimeException {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail); // Use the configured no-reply email
            message.setTo(toEmail);
            message.setSubject("Password Reset OTP");
            message.setText("Your OTP for password reset is: " + otp + 
                          "\nThis OTP will expire in 5 minutes.");
            
            mailSender.send(message);
        } catch (Exception e) {
            System.err.println("Failed to send email. Error: " + e.getMessage());
            e.printStackTrace(); // This will help in debugging
            throw new RuntimeException("Failed to send OTP email. Please check email configuration.");
        }
    }
}
