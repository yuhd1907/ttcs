package com.project6.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.UUID;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String fullName;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    private String phone;

    private String avatar;

    @Column(name = "position")
    private String position;

    @Column(name = "birth_date")
    private String birthDate;

    @Column(name = "gender")
    private String gender;

    @Column(name = "city")
    private String city;

    @Column(name = "address")
    private String address;

    @Column(name = "personal_link")
    private String personalLink;

    @Column(name = "cv_url")
    private String cvUrl;

    // CV screening status: NONE | PENDING | VALID | INVALID
    @Column(name = "cv_status")
    @Builder.Default
    private String cvStatus = "NONE";

    @Column(name = "cv_invalid_reason", columnDefinition = "TEXT")
    private String cvInvalidReason;

    // CV level determined by AI: FRESHER | ABOVE_FRESHER (legacy, kept for compatibility)
    @Column(name = "cv_level")
    private String cvLevel;

    // CV graduation status determined by AI: true=graduated, false=not yet graduated, null=unknown
    @Column(name = "cv_graduated")
    private Boolean cvGraduated;

    @Column(nullable = false)
    @Builder.Default
    private String role = "USER";

    @Column(nullable = false, updatable = false)
    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(columnDefinition = "TEXT")
    private String intro;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private java.util.List<com.project6.entity.cv.UserEducation> educations;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private java.util.List<com.project6.entity.cv.UserExperience> experiences;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private java.util.List<com.project6.entity.cv.UserSkill> skills;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private java.util.List<com.project6.entity.cv.UserLanguage> languages;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private java.util.List<com.project6.entity.cv.UserProject> projects;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private java.util.List<com.project6.entity.cv.UserCertificate> certificates;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private java.util.List<com.project6.entity.cv.UserAward> awards;
}
