package com.vcube.smartrecuritmentsystem.entity;


import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "jobs")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Job {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // The recruiter who posted this job opening
    @ManyToOne
    @JoinColumn(name = "recruiter_id", nullable = false)
    private User recruiter;

    @Column(nullable = false)
    private String title;

    // Full description (used by the AI engine to evaluate candidates)
    @Column(columnDefinition = "TEXT", nullable = false)
    private String description;

    // Required skills (e.g., "Java, Spring Boot, MySQL, REST APIs")
    @Column(columnDefinition = "TEXT", nullable = false)
    private String requiredSkills;

    // e.g., "Remote", "Bangalore", "Hyderabad"
    private String location;

    // e.g., "0-2 years", "3-5 years", "Senior"
    private String experienceLevel;

    // "OPEN" or "CLOSED"
    @Column(nullable = false)
    private String status = "OPEN";

    private LocalDateTime createdAt = LocalDateTime.now();
}