package com.project6.entity.cv;

import com.project6.entity.User;
import jakarta.persistence.*;
import lombok.*;
import java.util.UUID;

@Entity
@Table(name = "user_awards")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserAward {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private User user;

    private String name;
    private String organization;
    
    private String month;
    private String year;
    
    @Column(columnDefinition = "TEXT")
    private String description;
}
