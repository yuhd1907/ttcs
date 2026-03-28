package com.project6.repository;

import com.project6.entity.Company;
import com.project6.entity.JobPost;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.UUID;

public interface JobPostRepository extends JpaRepository<JobPost, UUID> {
    Page<JobPost> findByCompany(Company company, Pageable pageable);
    Optional<JobPost> findByIdAndCompany(UUID id, Company company);
}
