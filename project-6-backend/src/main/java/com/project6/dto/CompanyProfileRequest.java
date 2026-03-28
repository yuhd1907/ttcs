package com.project6.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class CompanyProfileRequest {
    private String companyName;
    private String province;
    private String address;
    private String model;
    private String employees;
    private String workingTime;
    private String overtime;
    private String email;
    private String phone;
    private String field;
    private String description;
    
    // File upload (optional since user might not change avatar)
    private MultipartFile avatar;
}
