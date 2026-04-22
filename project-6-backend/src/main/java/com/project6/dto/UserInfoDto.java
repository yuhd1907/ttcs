package com.project6.dto;

import com.project6.entity.User;
import lombok.Data;
import java.util.UUID;

@Data
public class UserInfoDto {
    private UUID id;
    private String email;
    private String username;  // = fullName
    private String phone;
    private String avatar;

    private String position;
    private String birth_date;
    private String gender;
    private String city;
    private String address;
    private String personal_link;
    private String cvUrl;

    private String intro;
    private java.util.List<CvProfileRequest.EducationDto> educations;
    private java.util.List<CvProfileRequest.ExperienceDto> experiences;
    private java.util.List<CvProfileRequest.SkillGroupDto> skills;
    private java.util.List<CvProfileRequest.LanguageDto> languages;
    private java.util.List<CvProfileRequest.ProjectDto> projects;
    private java.util.List<CvProfileRequest.CertificateDto> certificates;
    private java.util.List<CvProfileRequest.AwardDto> awards;

    public static UserInfoDto from(User user) {
        UserInfoDto dto = new UserInfoDto();
        dto.id = user.getId();
        dto.email = user.getEmail();
        dto.username = user.getFullName();
        dto.phone = user.getPhone();
        dto.avatar = user.getAvatar();
        dto.position = user.getPosition();
        dto.birth_date = user.getBirthDate();
        dto.gender = user.getGender();
        dto.city = user.getCity();
        dto.address = user.getAddress();
        dto.personal_link = user.getPersonalLink();
        dto.cvUrl = user.getCvUrl();

        dto.intro = user.getIntro();
        
        if (user.getEducations() != null) {
            dto.educations = user.getEducations().stream().map(e -> {
                CvProfileRequest.EducationDto d = new CvProfileRequest.EducationDto();
                d.setSchool(e.getSchool());
                d.setDegree(e.getDegree());
                d.setMajor(e.getMajor());
                d.setIsCurrentlyStudying(e.getIsCurrentlyStudying());
                d.setFromMonth(e.getFromMonth());
                d.setFromYear(e.getFromYear());
                d.setToMonth(e.getToMonth());
                d.setToYear(e.getToYear());
                d.setDetails(e.getDetails());
                return d;
            }).collect(java.util.stream.Collectors.toList());
        }

        if (user.getExperiences() != null) {
            dto.experiences = user.getExperiences().stream().map(e -> {
                CvProfileRequest.ExperienceDto d = new CvProfileRequest.ExperienceDto();
                d.setPosition(e.getPosition());
                d.setCompany(e.getCompany());
                d.setIsCurrentlyWorking(e.getIsCurrentlyWorking());
                d.setFromMonth(e.getFromMonth());
                d.setFromYear(e.getFromYear());
                d.setToMonth(e.getToMonth());
                d.setToYear(e.getToYear());
                d.setDescription(e.getDescription());
                d.setProjectDetails(e.getProjectDetails());
                return d;
            }).collect(java.util.stream.Collectors.toList());
        }

        if (user.getSkills() != null) {
            java.util.Map<String, java.util.List<com.project6.entity.cv.UserSkill>> grouped = user.getSkills().stream()
                .collect(java.util.stream.Collectors.groupingBy(
                    s -> (s.getType() != null ? s.getType() : "") + "|" + (s.getGroupName() != null ? s.getGroupName() : "")
                ));
            
            dto.skills = new java.util.ArrayList<>();
            for (java.util.Map.Entry<String, java.util.List<com.project6.entity.cv.UserSkill>> entry : grouped.entrySet()) {
                CvProfileRequest.SkillGroupDto groupDto = new CvProfileRequest.SkillGroupDto();
                com.project6.entity.cv.UserSkill first = entry.getValue().get(0);
                groupDto.setType(first.getType());
                groupDto.setGroupName(first.getGroupName());
                
                groupDto.setItems(entry.getValue().stream().map(s -> {
                    CvProfileRequest.SkillItemDto item = new CvProfileRequest.SkillItemDto();
                    item.setSkill(s.getSkillName());
                    item.setExperience(s.getExperience());
                    return item;
                }).collect(java.util.stream.Collectors.toList()));
                
                dto.skills.add(groupDto);
            }
        }

        if (user.getLanguages() != null) {
            dto.languages = user.getLanguages().stream().map(l -> {
                CvProfileRequest.LanguageDto d = new CvProfileRequest.LanguageDto();
                d.setLanguage(l.getLanguage());
                d.setLevel(l.getLevel());
                return d;
            }).collect(java.util.stream.Collectors.toList());
        }

        if (user.getProjects() != null) {
            dto.projects = user.getProjects().stream().map(p -> {
                CvProfileRequest.ProjectDto d = new CvProfileRequest.ProjectDto();
                d.setName(p.getName());
                d.setIsCurrentlyWorking(p.getIsCurrentlyWorking());
                d.setFromMonth(p.getFromMonth());
                d.setFromYear(p.getFromYear());
                d.setToMonth(p.getToMonth());
                d.setToYear(p.getToYear());
                d.setDescription(p.getDescription());
                d.setLink(p.getLink());
                return d;
            }).collect(java.util.stream.Collectors.toList());
        }

        if (user.getCertificates() != null) {
            dto.certificates = user.getCertificates().stream().map(c -> {
                CvProfileRequest.CertificateDto d = new CvProfileRequest.CertificateDto();
                d.setName(c.getName());
                d.setOrganization(c.getOrganization());
                d.setMonth(c.getMonth());
                d.setYear(c.getYear());
                d.setLink(c.getLink());
                d.setDescription(c.getDescription());
                return d;
            }).collect(java.util.stream.Collectors.toList());
        }

        if (user.getAwards() != null) {
            dto.awards = user.getAwards().stream().map(a -> {
                CvProfileRequest.AwardDto d = new CvProfileRequest.AwardDto();
                d.setName(a.getName());
                d.setOrganization(a.getOrganization());
                d.setMonth(a.getMonth());
                d.setYear(a.getYear());
                d.setDescription(a.getDescription());
                return d;
            }).collect(java.util.stream.Collectors.toList());
        }

        return dto;
    }
}
