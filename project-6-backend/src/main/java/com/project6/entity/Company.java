package com.project6.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.UUID;
import java.time.LocalDateTime;

@Entity
@Table(name = "companies")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Company {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String companyName;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    private String avatar;
    private String province;
    private String address;
    private String model;
    private String employees;
    private String workingTime;
    private String overtime;
    private String phone;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String field;

    @Column(nullable = false)
    @Builder.Default
    private String role = "COMPANY";

    @Column(nullable = false, updatable = false)
    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();
}

