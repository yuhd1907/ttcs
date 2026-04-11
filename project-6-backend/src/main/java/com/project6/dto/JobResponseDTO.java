package com.project6.dto;

import com.project6.entity.JobPost;
import com.project6.entity.Skill;
import com.project6.entity.JobField;
import com.project6.entity.Specialization;
import lombok.Builder;
import lombok.Data;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

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

    public static JobResponseDTO from(JobPost job) {
        return JobResponseDTO.builder()
                ._id(job.getId())
                .companyId(job.getCompany().getId())
                .companyLogo(job.getCompany().getAvatar())
                .companyName(job.getCompany().getCompanyName())
                .name(job.getTitle()) // Mapping title to name
                .minSalary(job.getSalaryMin() != null ? job.getSalaryMin().intValue() : null)
                .maxSalary(job.getSalaryMax() != null ? job.getSalaryMax().intValue() : null)
                .level(job.getLevel())
                .workingForm(job.getJobType()) // Mapping jobType to workingForm
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
                .build();
    }

    private static List<String> splitString(String str) {
        if (str == null || str.trim().isEmpty()) {
            return Collections.emptyList();
        }
        return Arrays.asList(str.split(","));
    }
}
