package com.project6.entity.cv;

import com.project6.entity.User;
import jakarta.persistence.*;
import lombok.*;
import java.util.UUID;

@Entity
@Table(name = "user_skills")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserSkill {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private User user;

    private String type; // e.g., "hard", "soft"
    
    @Column(name = "group_name")
    private String groupName; // e.g., "Kỹ năng chuyên môn"
    
    @Column(name = "skill_name")
    private String skillName;
    
    private String experience; // e.g., "3 năm", "Cơ bản"
}
