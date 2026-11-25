package com.vcube.smartrecuritmentsystem.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "resume_analysis")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResumeAnalysis {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Links this AI analysis directly to the specific job application
    @OneToOne
    @JoinColumn(name = "application_id", nullable = false)
    private Application application;

    // AI Feature 2: Job-Description Match Score (e.g., 85.5%)
    private Double matchScore;

    // AI Feature 1: Skills extracted from the uploaded PDF resume
    @Column(columnDefinition = "TEXT")
    private String extractedSkills;

    // Skills mentioned in the Job that are missing in the Candidate's resume
    @Column(columnDefinition = "TEXT")
    private String missingSkills;

    // AI-identified candidate strengths
    @Column(columnDefinition = "TEXT")
    private String strengths;

    // AI-identified candidate weaknesses / gaps
    @Column(columnDefinition = "TEXT")
    private String weaknesses;

    // AI Feature 3: Auto-generated interview questions tailored to candidate gaps
    @Column(columnDefinition = "TEXT")
    private String interviewQuestions;

    // AI Feature 4: Resume Improvement Assistant feedback
    @Column(columnDefinition = "TEXT")
    private String improvementSuggestions;

    private LocalDateTime analyzedAt = LocalDateTime.now();
}