package com.project6.dto;

import lombok.Data;
import java.util.List;

@Data
public class CvProfileRequest {
    private String intro;
    private List<EducationDto> educations;
    private List<ExperienceDto> experiences;
    private List<SkillGroupDto> skills;
    private List<LanguageDto> languages;
    private List<ProjectDto> projects;
    private List<CertificateDto> certificates;
    private List<AwardDto> awards;

    @Data
    public static class EducationDto {
        private String school;
        private String degree;
        private String major;
        private Boolean isCurrentlyStudying;
        private String fromMonth;
        private String fromYear;
        private String toMonth;
        private String toYear;
        private String details;
    }

    @Data
    public static class ExperienceDto {
        private String position;
        private String company;
        private Boolean isCurrentlyWorking;
        private String fromMonth;
        private String fromYear;
        private String toMonth;
        private String toYear;
        private String description;
        private String projectDetails;
    }

    @Data
    public static class SkillGroupDto {
        private String type;
        private String groupName;
        private List<SkillItemDto> items;
    }

    @Data
    public static class SkillItemDto {
        private String skill;
        private String experience;
    }

    @Data
    public static class LanguageDto {
        private String language;
        private String level;
    }

    @Data
    public static class ProjectDto {
        private String name;
        private Boolean isCurrentlyWorking;
        private String fromMonth;
        private String fromYear;
        private String toMonth;
        private String toYear;
        private String description;
        private String link;
    }

    @Data
    public static class CertificateDto {
        private String name;
        private String organization;
        private String month;
        private String year;
        private String link;
        private String description;
    }

    @Data
    public static class AwardDto {
        private String name;
        private String organization;
        private String month;
        private String year;
        private String description;
    }
}
