package com.project6.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class UserProfileRequest {
    private String username;
    private String email;
    private String phone;
    private MultipartFile avatar; // Optional
    private String position;
    private String birth_date;
    private String gender;
    private String city;
    private String address;
    private String personal_link;
    private MultipartFile cv; // Optional for CV upload
}