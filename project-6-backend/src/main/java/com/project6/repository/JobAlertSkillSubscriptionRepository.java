package com.project6.repository;

import com.project6.entity.JobAlertSkillSubscription;
import com.project6.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface JobAlertSkillSubscriptionRepository extends JpaRepository<JobAlertSkillSubscription, UUID> {
    List<JobAlertSkillSubscription> findByUser(User user);
    List<JobAlertSkillSubscription> findAllByActiveTrue();
    boolean existsByUserAndSkillNameAndCityName(User user, String skillName, String cityName);
    void deleteByUserAndSkillNameAndCityName(User user, String skillName, String cityName);
}
