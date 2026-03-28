package com.project6.repository;

import com.project6.entity.Company;
import com.project6.entity.Job;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface JobRepository extends JpaRepository<Job, Long> {
    Page<Job> findByCompany(Company company, Pageable pageable);
    
    Optional<Job> findByIdAndCompany(Long id, Company company);
}
