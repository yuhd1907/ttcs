package com.project6.dto;

import com.project6.entity.JobPost;
import com.project6.entity.Skill;
import com.project6.entity.JobField;
import lombok.Builder;
import lombok.Data;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import java.time.LocalDateTime;

@Data
@Builder
public class JobResponseDTO {
    private UUID _id; 
    private UUID companyId;
    private String companyLogo;
    private String companyName;

    private String name;
    private Integer minSalary;
    private Integer maxSalary;
    private String level;
    private String workingForm;
    
    private List<String> specialization;
    private List<String> technologies;
    private List<String> fields;
    
    private String description;
    private List<String> images;
    private String address;

    // Company detail fields for job detail page
    private String companyModel;
    private String companyField;
    private String companyEmployees;
    private String companyWorkingTime;
    private String companyWorkOvertime;
    private String companyAddress;

    private String timeSince;

    public static JobResponseDTO from(JobPost job) {
        return JobResponseDTO.builder()
                ._id(job.getId())
                .companyId(job.getCompany().getId())
                .companyLogo(job.getCompany().getAvatar())
                .companyName(job.getCompany().getCompanyName())
                .name(job.getTitle())
                .minSalary(job.getSalaryMin() != null ? job.getSalaryMin().intValue() : null)
                .maxSalary(job.getSalaryMax() != null ? job.getSalaryMax().intValue() : null)
                .level(job.getLevel())
                .workingForm(job.getJobType())
                .address(job.getCompany().getAddress())
                .specialization(job.getSpecializationEntity() != null 
                    ? Collections.singletonList(job.getSpecializationEntity().getSlug()) 
                    : Collections.emptyList())
                .technologies(job.getSkills() != null 
                    ? job.getSkills().stream().map(Skill::getName).collect(Collectors.toList())
                    : Collections.emptyList())
                .fields(job.getJobFields() != null
                    ? job.getJobFields().stream().map(JobField::getSlug).collect(Collectors.toList())
                    : Collections.emptyList())
                .description(job.getDescription())
                .images(splitString(job.getImages()))
                // Company detail fields
                .companyModel(job.getCompany().getModel())
                .companyField(job.getCompany().getField())
                .companyEmployees(job.getCompany().getEmployees())
                .companyWorkingTime(job.getCompany().getWorkingTime())
                .companyWorkOvertime(job.getCompany().getOvertime())
                .companyAddress(job.getCompany().getAddress())
                .timeSince(calculateTimeSince(job.getCreatedAt()))
                .build();
    }

    private static String calculateTimeSince(LocalDateTime dateTime) {
        if (dateTime == null) return "Đăng gần đây";
        
        LocalDateTime now = LocalDateTime.now();
        java.time.Duration duration = java.time.Duration.between(dateTime, now);
        
        long days = duration.toDays();
        if (days >= 365) return "Đăng từ " + (days / 365) + " năm trước";
        if (days >= 30) return "Đăng từ " + (days / 30) + " tháng trước";
        if (days >= 1) return "Đăng từ " + days + " ngày trước";
        
        long hours = duration.toHours();
        if (hours >= 1) return "Đăng từ " + hours + " giờ trước";
        
        long minutes = duration.toMinutes();
        if (minutes >= 1) return "Đăng từ " + minutes + " phút trước";
        
        return "Đăng gần đây";
    }

    private static List<String> splitString(String str) {
        if (str == null || str.trim().isEmpty()) {
            return Collections.emptyList();
        }
        return Arrays.asList(str.split(","));
    }
}
