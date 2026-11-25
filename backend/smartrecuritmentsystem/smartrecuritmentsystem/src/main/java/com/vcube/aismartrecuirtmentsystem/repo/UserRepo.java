package com.vcube.aismartrecuirtmentsystem.repo;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vcube.aismartrecuirtmentsystem.entity.User;

public interface UserRepo extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    
   // boolean existsByEmail(String email);
}