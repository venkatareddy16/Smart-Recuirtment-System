package com.vcube.aismartrecuirtmentsystem.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vcube.aismartrecuirtmentsystem.entity.Candidate;

public interface CandidateRepo extends JpaRepository<Candidate, Long> {
    Optional<Candidate> findByUserId(Long userId);
}
