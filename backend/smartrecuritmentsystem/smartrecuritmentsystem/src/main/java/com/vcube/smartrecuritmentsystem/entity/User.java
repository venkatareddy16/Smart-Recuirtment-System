package com.vcube.smartrecuritmentsystem.entity;


import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String fullName;

    // Role will be either "RECRUITER" or "CANDIDATE"
    @Column(nullable = false)
    private String role;

    private LocalDateTime createdAt = LocalDateTime.now();
}