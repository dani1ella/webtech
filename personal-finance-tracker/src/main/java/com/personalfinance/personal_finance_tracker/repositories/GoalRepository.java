package com.personalfinance.personal_finance_tracker.repositories;

import java.time.LocalDate; // Add this import statement
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.personalfinance.personal_finance_tracker.entities.Goal;
import com.personalfinance.personal_finance_tracker.entities.User;

public interface GoalRepository extends JpaRepository<Goal, Long> {
    List<Goal> findByUser(User user); // Query by User directly
    List<Goal> findByUserId(Long userId); // Existing query by userId
    List<Goal> findByTargetAmount(double targetAmount); // Example method to find goals by targetAmount
    List<Goal> findByTargetDateBefore(LocalDate targetDate); // Example method to find goals by target date
}
