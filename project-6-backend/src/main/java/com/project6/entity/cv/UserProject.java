package com.project6.entity.cv;

import com.project6.entity.User;
import jakarta.persistence.*;
import lombok.*;
import java.util.UUID;

@Entity
@Table(name = "user_projects")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserProject {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private User user;

    private String name;
    
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
    
    private String link;
}
