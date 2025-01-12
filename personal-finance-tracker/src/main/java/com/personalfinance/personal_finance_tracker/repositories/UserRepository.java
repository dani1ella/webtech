package com.personalfinance.personal_finance_tracker.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.personalfinance.personal_finance_tracker.entities.User;

@Repository // Adding the @Repository annotation is optional as it's already included with Spring Data JPA
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);          // Find user by email
    Optional<User> findByResetToken(String resetToken); // Find user by reset token
}
