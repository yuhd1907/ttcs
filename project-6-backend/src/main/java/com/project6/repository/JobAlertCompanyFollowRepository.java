package com.project6.repository;

import com.project6.entity.Company;
import com.project6.entity.JobAlertCompanyFollow;
import com.project6.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface JobAlertCompanyFollowRepository extends JpaRepository<JobAlertCompanyFollow, UUID> {
    List<JobAlertCompanyFollow> findByUser(User user);
    List<JobAlertCompanyFollow> findAllByActiveTrue();
    boolean existsByUserAndCompany(User user, Company company);
    void deleteByUserAndCompany(User user, Company company);
}
