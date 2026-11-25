package com.vcube.smartrecuritmentsystem.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vcube.smartrecuritmentsystem.entity.Candidate;

public interface CandidateRepo extends JpaRepository<Candidate, Long> {
    Optional<Candidate> findByUserId(Long userId);
}
