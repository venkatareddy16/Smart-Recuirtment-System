package com.vcube.smartrecuritmentsystem.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.vcube.smartrecuritmentsystem.dto.CandidateProfileRequest;
import com.vcube.smartrecuritmentsystem.entity.Candidate;
import com.vcube.smartrecuritmentsystem.repo.CandidateRepo;

@Service
public class CandidateService {

    @Autowired
    private CandidateRepo candidateRepository;

    // 1. Fetch Candidate Profile by User ID
    public Candidate getProfileByUserId(Long userId) {
        return candidateRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Candidate profile not found for user ID: " + userId));
    }

    // 2. Update Candidate Profile (Skills, Experience, Headline, Phone)
    @Transactional
    public Candidate updateProfile(Long userId, CandidateProfileRequest request) {
        Candidate candidate = getProfileByUserId(userId);

        if (request.getPhone() != null) candidate.setPhone(request.getPhone());
        if (request.getTitle() != null) candidate.setTitle(request.getTitle());
        if (request.getExperienceYears() != null) candidate.setExperienceYears(request.getExperienceYears());
        if (request.getSkills() != null) candidate.setSkills(request.getSkills());

        return candidateRepository.save(candidate);
    }
}
