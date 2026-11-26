package com.vcube.smartrecuritmentsystem.repo;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vcube.smartrecuritmentsystem.entity.User;

public interface UserRepo extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);

	boolean existsByUsername(String username);
    
   // boolean existsByEmail(String email);
}