package com.vcube.smartrecuritmentsystem.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vcube.smartrecuritmentsystem.entity.Job;

public interface JobRepo extends JpaRepository<Job, Long> {
    // Find all open jobs for candidates to browse
    List<Job> findByStatus(String status);
    // Find all jobs posted by a specific recruiter
    List<Job> findByRecruiterId(Long recruiterId);
}
