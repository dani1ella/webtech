package com.personalfinance.personal_finance_tracker.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.personalfinance.personal_finance_tracker.entities.Transaction;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findByUserId(Long userId);
    List<Transaction> findByType(String type); // Adjusted to 'type' field
    List<Transaction> findByUserIdAndType(Long userId, String type); // New method to find by both userId and type
}
