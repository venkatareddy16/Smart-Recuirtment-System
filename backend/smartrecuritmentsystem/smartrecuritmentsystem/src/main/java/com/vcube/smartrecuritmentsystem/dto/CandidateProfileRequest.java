package com.vcube.smartrecuritmentsystem.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CandidateProfileRequest {
    private String phone;
    private String title;           // e.g. "Full Stack Java Developer"
    private Integer experienceYears;// e.g. 2
    private String skills;          // e.g. "Java, Spring Boot, MySQL, React"
}
