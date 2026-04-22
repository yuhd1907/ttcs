package com.project6.entity.cv;

import com.project6.entity.User;
import jakarta.persistence.*;
import lombok.*;
import java.util.UUID;

@Entity
@Table(name = "user_certificates")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserCertificate {
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
    
    private String link;
    
    @Column(columnDefinition = "TEXT")
    private String description;
}
