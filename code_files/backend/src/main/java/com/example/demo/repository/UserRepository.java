package com.example.demo.repository;
import java.util.Optional;
 
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.User; 
public interface UserRepository extends JpaRepository<User, Long> {

  // Removed duplicate method declaration to resolve the error
  Optional<User> findByEmail(String email);
  User findByEmailOrPhoneNumber(String email, String phoneNumber);
  Optional<User> findByEmailAndPassword(String email, String password);
  Optional<User> findByPhoneNumber(String phoneNumber);
}