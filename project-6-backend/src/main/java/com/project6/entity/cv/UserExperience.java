package com.project6.entity.cv;

import com.project6.entity.User;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "user_experiences")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserExperience {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private User user;

    private String position;
    private String company;
    
    @Column(name = "is_currently_working")
    private Boolean isCurrentlyWorking;

    @Column(name = "from_month")
    private String fromMonth;
    @Column(name = "from_year")
    private String fromYear;
    @Column(name = "to_month")
    private String toMonth;
    @Column(name = "to_year")
    private String toYear;

    @Column(columnDefinition = "TEXT")
    private String description;
    
    @Column(name = "project_details", columnDefinition = "TEXT")
    private String projectDetails;
}
