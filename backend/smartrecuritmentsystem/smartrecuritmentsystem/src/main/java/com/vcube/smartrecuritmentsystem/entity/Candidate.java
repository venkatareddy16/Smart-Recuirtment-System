package com.vcube.smartrecuritmentsystem.entity;


import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "candidates")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Candidate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Links this profile directly to the User account (role = CANDIDATE)
    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
    private User user;

    private String phone;

    // Professional headline (e.g., "Full Stack Java Developer")
    private String title;

    // Years of total experience
    private Integer experienceYears;

    // Comma-separated or extracted list of skills (e.g., "Java, Spring Boot, MySQL, React")
    @Column(columnDefinition = "TEXT")
    private String skills;

    // Path or URL to the uploaded PDF resume file
    private String resumeUrl;

    private LocalDateTime createdAt = LocalDateTime.now();
}