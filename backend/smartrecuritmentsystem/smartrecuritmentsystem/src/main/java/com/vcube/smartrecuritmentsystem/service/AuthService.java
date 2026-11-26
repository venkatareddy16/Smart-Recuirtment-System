package com.vcube.smartrecuritmentsystem.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.vcube.smartrecuritmentsystem.dto.AuthResponse;
import com.vcube.smartrecuritmentsystem.dto.LoginRequest;
import com.vcube.smartrecuritmentsystem.dto.RegisterRequest;
import com.vcube.smartrecuritmentsystem.entity.Candidate;
import com.vcube.smartrecuritmentsystem.entity.User;
import com.vcube.smartrecuritmentsystem.repo.CandidateRepo;
import com.vcube.smartrecuritmentsystem.repo.UserRepo;
import com.vcube.smartrecuritmentsystem.securityconfig.JwtUtils;

@Service
public class AuthService {

    @Autowired
    private UserRepo repo;

    @Autowired
    private CandidateRepo candidateRepo;

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    private JwtUtils jwtUtil;

    // REGISTER
    @Transactional
    public AuthResponse register(RegisterRequest request) {
        if (repo.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Email is already registered!");
        }

        User user = new User();
        user.setFullName(request.getFullName());
        user.setUsername(request.getUsername());
        user.setPassword(encoder.encode(request.getPassword()));
        
        // Ensure format is ROLE_CANDIDATE or ROLE_RECRUITER
        String roleName = request.getRole().toUpperCase();
        if (!roleName.startsWith("ROLE_")) {
            roleName = "ROLE_" + roleName;
        }
        user.setRole(roleName);

        User savedUser = repo.save(user);

        // Auto-create Candidate profile if registered as candidate
        if ("ROLE_CANDIDATE".equals(savedUser.getRole())) {
            Candidate candidate = new Candidate();
            candidate.setUser(savedUser);
            candidateRepo.save(candidate);
        }

        return new AuthResponse(
                "User registered successfully",
                null,
                savedUser.getId(),
                savedUser.getUsername(),
                savedUser.getFullName(),
                savedUser.getRole()
        );
    }

    // LOGIN
    public AuthResponse login(LoginRequest request) {
        User dbUser = repo.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!encoder.matches(request.getPassword(), dbUser.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        String token = jwtUtil.generateToken(dbUser.getUsername(), dbUser.getRole());

        return new AuthResponse(
                "Login successful",
                token,
                dbUser.getId(),
                dbUser.getUsername(),
                dbUser.getFullName(),
                dbUser.getRole()
        );
    }
}