package com.project6.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class UserProfileRequest {
    private String username;
    private String email;
    private String phone;
    private MultipartFile avatar; // Optional
}
