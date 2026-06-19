package com.project6.dto;

import com.project6.entity.Application;
import lombok.Builder;
import lombok.Data;
import java.util.UUID;

@Data
@Builder
public class ApplicationResponseDTO {
    private UUID id;
    private String fullName;
    private String email;
    private String phone;
    private String cvUrl;
    private String coverLetter;
    private String status;
    private String createdAt;

    // Job info
    private UUID jobId;
    private String jobTitle;

    public static ApplicationResponseDTO from(Application app) {
        return ApplicationResponseDTO.builder()
                .id(app.getId())
                .fullName(app.getFullName())
                .email(app.getEmail())
                .phone(app.getPhone())
                .cvUrl(app.getCvUrl())
                .coverLetter(app.getCoverLetter())
                .status(app.getStatus())
                .createdAt(app.getCreatedAt() != null ? app.getCreatedAt().toString() : null)
                .jobId(app.getJobPost() != null ? app.getJobPost().getId() : null)
                .jobTitle(app.getJobPost() != null ? app.getJobPost().getTitle() : null)
                .build();
    }
}
