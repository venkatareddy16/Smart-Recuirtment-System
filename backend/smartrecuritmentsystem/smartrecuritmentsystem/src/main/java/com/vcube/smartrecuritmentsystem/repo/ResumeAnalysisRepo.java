package com.vcube.smartrecuritmentsystem.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vcube.smartrecuritmentsystem.entity.ResumeAnalysis;

public interface ResumeAnalysisRepo extends JpaRepository<ResumeAnalysis, Long> {
    // Get the AI evaluation for a specific application
    Optional<ResumeAnalysis> findByApplicationId(Long applicationId);
}