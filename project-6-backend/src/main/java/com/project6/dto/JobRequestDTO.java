package com.project6.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;

@Data
public class JobRequestDTO {
    private String name;
    private Integer minSalary;
    private Integer maxSalary;
    private String level;
    private String workingForm;
    private String specialization;
    private String technologies;
    private String fields;
    private String description;
    
    // Uploaded images for Job Details
    private List<MultipartFile> images;
}
