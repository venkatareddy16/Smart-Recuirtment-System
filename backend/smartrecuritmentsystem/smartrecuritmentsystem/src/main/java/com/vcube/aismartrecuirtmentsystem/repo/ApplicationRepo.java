package com.vcube.aismartrecuirtmentsystem.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vcube.smartrecuritmentsystem.entity.Application;

public interface ApplicationRepo extends JpaRepository<Application, Long> {
    // Find all applicants for a specific job
    List<Application> findByJobId(Long jobId);
    // Find all jobs a specific candidate applied for
    List<Application> findByCandidateId(Long candidateId);
}
