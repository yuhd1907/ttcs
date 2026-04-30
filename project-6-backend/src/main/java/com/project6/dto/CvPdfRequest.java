package com.project6.dto;

import lombok.Data;
import java.util.List;

/**
 * DTO nhận dữ liệu từ Frontend để tạo PDF CV.
 * Tái sử dụng các inner class của CvProfileRequest.
 */
@Data
public class CvPdfRequest {
    private String intro;
    private List<CvProfileRequest.EducationDto> educations;
    private List<CvProfileRequest.ExperienceDto> experiences;
    private List<CvProfileRequest.SkillGroupDto> skills;
    private List<CvProfileRequest.LanguageDto> languages;
    private List<CvProfileRequest.ProjectDto> projects;
    private List<CvProfileRequest.CertificateDto> certificates;
    private List<CvProfileRequest.AwardDto> awards;
}
