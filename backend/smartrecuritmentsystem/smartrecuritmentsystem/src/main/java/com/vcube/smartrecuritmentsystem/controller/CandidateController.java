package com.vcube.smartrecuritmentsystem.controller;


import com.vcube.smartrecuritmentsystem.dto.CandidateProfileRequest;
import com.vcube.smartrecuritmentsystem.entity.Candidate;
import com.vcube.smartrecuritmentsystem.service.CandidateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/candidates")
public class CandidateController {

    @Autowired
    private CandidateService candidateService;

    // GET /api/candidates/profile/{userId}
    @GetMapping("/profile/{userId}")
    public ResponseEntity<Candidate> getProfile(@PathVariable Long userId) {
        return ResponseEntity.ok(candidateService.getProfileByUserId(userId));
    }

    // PUT /api/candidates/profile/{userId}
    @PutMapping("/profile/{userId}")
    public ResponseEntity<Candidate> updateProfile(@PathVariable Long userId, 
                                                   @RequestBody CandidateProfileRequest request) {
        return ResponseEntity.ok(candidateService.updateProfile(userId, request));
    }
}