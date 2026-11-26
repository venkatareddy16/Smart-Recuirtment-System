package com.vcube.smartrecuritmentsystem.entity;


import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "applications")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // The job the candidate is applying for
    @ManyToOne
    @JoinColumn(name = "job_id", nullable = false)
    private Job job;

    // The candidate who applied
    @ManyToOne
    @JoinColumn(name = "candidate_id", nullable = false)
    private Candidate candidate;

    // Path or filename of the PDF resume uploaded for THIS specific job application
    private String resumeUrl;

    // Status: "APPLIED", "SHORTLISTED", "REJECTED"
    @Column(nullable = false)
    private String status = "APPLIED";

    // Optional short note or message from candidate
    @Column(columnDefinition = "TEXT")
    private String coverNote;

    private LocalDateTime appliedAt = LocalDateTime.now();
}