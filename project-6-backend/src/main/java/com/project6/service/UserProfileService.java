package com.project6.service;

import com.project6.dto.UserInfoDto;
import com.project6.dto.UserProfileRequest;
import com.project6.entity.User;
import com.project6.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserProfileService {

    private final UserRepository userRepository;
    private final FileStorageService fileStorageService;
    private final CvScreeningService cvScreeningService;

    public UserInfoDto updateProfile(UserProfileRequest request) {
        String currentEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        Optional<User> optionalUser = userRepository.findByEmail(currentEmail);

        if (optionalUser.isEmpty()) {
            throw new RuntimeException("Không tìm thấy người dùng đang đăng nhập.");
        }

        User user = optionalUser.get();

        if (request.getUsername() != null) user.setFullName(request.getUsername());
        if (request.getPhone() != null) user.setPhone(request.getPhone());
        
        // Handle Email update carefully
        if (request.getEmail() != null && !request.getEmail().equals(currentEmail)) {
            // Check if email is already taken
            if (userRepository.findByEmail(request.getEmail()).isPresent()) {
                throw new RuntimeException("Email đã được sử dụng bởi người dùng khác!");
            }
            user.setEmail(request.getEmail());
        }

        // Handle Avatar update
        if (request.getAvatar() != null && !request.getAvatar().isEmpty()) {
            String avatarUrl = fileStorageService.storeFile(request.getAvatar());
            user.setAvatar(avatarUrl);
        }

        if (request.getPosition() != null) user.setPosition(request.getPosition());
        if (request.getBirth_date() != null) user.setBirthDate(request.getBirth_date());
        if (request.getGender() != null) user.setGender(request.getGender());
        if (request.getCity() != null) user.setCity(request.getCity());
        if (request.getAddress() != null) user.setAddress(request.getAddress());
        if (request.getPersonal_link() != null) user.setPersonalLink(request.getPersonal_link());

        // Handle Main CV upload
        if (request.getCv() != null && !request.getCv().isEmpty()) {
            String cvUrl = fileStorageService.storeFile(request.getCv());
            user.setCvUrl(cvUrl);
            // Đặt trạng thái PENDING và trigger xét duyệt bất đồng bộ
            user.setCvStatus("PENDING");
            user.setCvInvalidReason(null);
            user.setCvLevel(null);
            userRepository.save(user);
            cvScreeningService.screenCvAsync(user.getId(), cvUrl);
            return UserInfoDto.from(user);
        }

        User updatedUser = userRepository.save(user);
        return UserInfoDto.from(updatedUser);
    }

    @org.springframework.transaction.annotation.Transactional
    public void updateCvProfile(com.project6.dto.CvProfileRequest req) {
        String currentEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(currentEmail)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng đang đăng nhập."));

        if (req.getIntro() != null) {
            user.setIntro(req.getIntro());
        }

        // Educations
        if (req.getEducations() != null) {
            if (user.getEducations() == null) user.setEducations(new java.util.ArrayList<>());
            else user.getEducations().clear();
            
            user.getEducations().addAll(req.getEducations().stream().map(dto -> 
                com.project6.entity.cv.UserEducation.builder()
                    .user(user)
                    .school(dto.getSchool())
                    .degree(dto.getDegree())
                    .major(dto.getMajor())
                    .isCurrentlyStudying(dto.getIsCurrentlyStudying())
                    .fromMonth(dto.getFromMonth())
                    .fromYear(dto.getFromYear())
                    .toMonth(dto.getToMonth())
                    .toYear(dto.getToYear())
                    .details(dto.getDetails())
                    .build()
            ).collect(java.util.stream.Collectors.toList()));
        }

        // Experiences
        if (req.getExperiences() != null) {
            if (user.getExperiences() == null) user.setExperiences(new java.util.ArrayList<>());
            else user.getExperiences().clear();
            
            user.getExperiences().addAll(req.getExperiences().stream().map(dto -> 
                com.project6.entity.cv.UserExperience.builder()
                    .user(user)
                    .position(dto.getPosition())
                    .company(dto.getCompany())
                    .isCurrentlyWorking(dto.getIsCurrentlyWorking())
                    .fromMonth(dto.getFromMonth())
                    .fromYear(dto.getFromYear())
                    .toMonth(dto.getToMonth())
                    .toYear(dto.getToYear())
                    .description(dto.getDescription())
                    .projectDetails(dto.getProjectDetails())
                    .build()
            ).collect(java.util.stream.Collectors.toList()));
        }

        // Skills
        if (req.getSkills() != null) {
            if (user.getSkills() == null) user.setSkills(new java.util.ArrayList<>());
            else user.getSkills().clear();
            
            for (com.project6.dto.CvProfileRequest.SkillGroupDto group : req.getSkills()) {
                if (group.getItems() != null) {
                    for (com.project6.dto.CvProfileRequest.SkillItemDto item : group.getItems()) {
                        user.getSkills().add(com.project6.entity.cv.UserSkill.builder()
                            .user(user)
                            .type(group.getType())
                            .groupName(group.getGroupName())
                            .skillName(item.getSkill())
                            .experience(item.getExperience())
                            .build()
                        );
                    }
                }
            }
        }

        // Languages
        if (req.getLanguages() != null) {
            if (user.getLanguages() == null) user.setLanguages(new java.util.ArrayList<>());
            else user.getLanguages().clear();
            
            user.getLanguages().addAll(req.getLanguages().stream().map(dto -> 
                com.project6.entity.cv.UserLanguage.builder()
                    .user(user)
                    .language(dto.getLanguage())
                    .level(dto.getLevel())
                    .build()
            ).collect(java.util.stream.Collectors.toList()));
        }

        // Projects
        if (req.getProjects() != null) {
            if (user.getProjects() == null) user.setProjects(new java.util.ArrayList<>());
            else user.getProjects().clear();
            
            user.getProjects().addAll(req.getProjects().stream().map(dto -> 
                com.project6.entity.cv.UserProject.builder()
                    .user(user)
                    .name(dto.getName())
                    .isCurrentlyWorking(dto.getIsCurrentlyWorking())
                    .fromMonth(dto.getFromMonth())
                    .fromYear(dto.getFromYear())
                    .toMonth(dto.getToMonth())
                    .toYear(dto.getToYear())
                    .description(dto.getDescription())
                    .link(dto.getLink())
                    .build()
            ).collect(java.util.stream.Collectors.toList()));
        }

        // Certificates
        if (req.getCertificates() != null) {
            if (user.getCertificates() == null) user.setCertificates(new java.util.ArrayList<>());
            else user.getCertificates().clear();
            
            user.getCertificates().addAll(req.getCertificates().stream().map(dto -> 
                com.project6.entity.cv.UserCertificate.builder()
                    .user(user)
                    .name(dto.getName())
                    .organization(dto.getOrganization())
                    .month(dto.getMonth())
                    .year(dto.getYear())
                    .link(dto.getLink())
                    .description(dto.getDescription())
                    .build()
            ).collect(java.util.stream.Collectors.toList()));
        }

        // Awards
        if (req.getAwards() != null) {
            if (user.getAwards() == null) user.setAwards(new java.util.ArrayList<>());
            else user.getAwards().clear();
            
            user.getAwards().addAll(req.getAwards().stream().map(dto -> 
                com.project6.entity.cv.UserAward.builder()
                    .user(user)
                    .name(dto.getName())
                    .organization(dto.getOrganization())
                    .month(dto.getMonth())
                    .year(dto.getYear())
                    .description(dto.getDescription())
                    .build()
            ).collect(java.util.stream.Collectors.toList()));
        }

        userRepository.save(user);
    }

    /**
     * Lưu URL PDF CV (từ Cloudinary) vào profile người dùng hiện tại.
     * Đồng thời trigger xét duyệt CV bất đồng bộ bằng Claude API.
     */
    public void saveCvUrl(String pdfUrl) {
        String currentEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(currentEmail)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng đang đăng nhập."));
        user.setCvUrl(pdfUrl);
        // Đặt trạng thái PENDING để frontend hiển thị "Đang xét duyệt"
        user.setCvStatus("PENDING");
        user.setCvInvalidReason(null);
        user.setCvLevel(null);
        userRepository.save(user);
        // Kích hoạt xét duyệt bất đồng bộ
        cvScreeningService.screenCvAsync(user.getId(), pdfUrl);
    }
}
