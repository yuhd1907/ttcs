package com.project6.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Table(name = "job_alert_company_follows",
       uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "company_id"}))
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JobAlertCompanyFollow {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id", nullable = false)
    private Company company;

    @Builder.Default
    private boolean active = true;
}
