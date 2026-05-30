package com.project6.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Table(name = "job_alert_subscriptions",
       uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "skill_name", "city_name"}))
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JobAlertSkillSubscription {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "skill_name", nullable = false)
    private String skillName;

    @Column(name = "city_name", nullable = false)
    private String cityName;

    @Builder.Default
    private boolean active = true;
}
