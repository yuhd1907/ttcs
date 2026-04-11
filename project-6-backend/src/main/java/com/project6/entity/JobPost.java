package com.project6.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "job_posts")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JobPost {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    // References Companies Table
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id", nullable = false)
    private Company company;

    // References whoever posted (we'll just use the company's UUID for now if it's identical, or User)
    @Column(name = "posted_by", nullable = false)
    private UUID postedBy;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "description", columnDefinition = "TEXT", nullable = false)
    private String description;

    @Column(name = "requirements", columnDefinition = "TEXT", nullable = false)
    private String requirements;

    @Column(name = "salary_min")
    private BigDecimal salaryMin;

    @Column(name = "salary_max")
    private BigDecimal salaryMax;

    @Column(name = "currency")
    @Builder.Default
    private String currency = "VND";

    @Column(name = "job_type")
    private String jobType;

    @Column(name = "work_mode")
    private String workMode;

    @Column(name = "status")
    @Builder.Default
    private String status = "open";

    @Column(name = "expires_at")
    private LocalDateTime expiresAt;

    @Column(name = "created_at", updatable = false)
    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "updated_at")
    @Builder.Default
    private LocalDateTime updatedAt = LocalDateTime.now();

    // Additional fields from original Job implementation that Hibernate will append
    private String level;
    
    // We keep these legacy string fields around or replace them: 
    // We will use the new Relational fields instead:
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "city_id")
    private City city;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "specialization_id")
    private Specialization specializationEntity;

    @ManyToMany
    @JoinTable(
        name = "job_field_mappings",
        joinColumns = @JoinColumn(name = "job_post_id"),
        inverseJoinColumns = @JoinColumn(name = "field_id")
    )
    private Set<JobField> jobFields;
    
    @Column(name = "images", columnDefinition = "TEXT")
    private String images;

    // ManyToMany Mapping exactly to public.job_skills
    @ManyToMany
    @JoinTable(
        name = "job_skills",
        joinColumns = @JoinColumn(name = "job_post_id"),
        inverseJoinColumns = @JoinColumn(name = "skill_id")
    )
    private Set<Skill> skills;

    @PrePersist
    protected void onCreate() {
        if (createdAt == null) createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
