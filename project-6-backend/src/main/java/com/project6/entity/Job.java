package com.project6.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "jobs")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Job {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id", nullable = false)
    private Company company;

    @Column(nullable = false)
    private String name;

    private Integer minSalary;
    private Integer maxSalary;

    private String level;
    private String workingForm;

    // We will store comma-separated strings for lists to keep table structure simple
    @Column(columnDefinition = "TEXT")
    private String specialization;

    @Column(columnDefinition = "TEXT")
    private String technologies;

    @Column(columnDefinition = "TEXT")
    private String fields;

    @Column(columnDefinition = "TEXT")
    private String description;

    // Store comma-separated image URLs
    @Column(columnDefinition = "TEXT")
    private String images;

    @Column(nullable = false, updatable = false)
    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();
    
    @Builder.Default
    private LocalDateTime updatedAt = LocalDateTime.now();
    
    @PreUpdate
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}
