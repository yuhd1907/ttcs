package com.project6.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import java.util.List;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
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
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class EducationDto {
        private String id;
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
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class ExperienceDto {
        private String id;
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
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class SkillGroupDto {
        private String id;
        private String type;
        private String groupName;
        private List<SkillItemDto> items;
    }

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class SkillItemDto {
        private String id;
        private String skill;
        private String experience;
    }

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class LanguageDto {
        private String id;
        private String language;
        private String level;
    }

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class ProjectDto {
        private String id;
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
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class CertificateDto {
        private String id;
        private String name;
        private String organization;
        private String month;
        private String year;
        private String link;
        private String description;
    }

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class AwardDto {
        private String id;
        private String name;
        private String organization;
        private String month;
        private String year;
        private String description;
    }
}
