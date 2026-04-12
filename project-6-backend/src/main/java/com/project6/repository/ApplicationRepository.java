package com.project6.repository;

import com.project6.entity.Application;
import com.project6.entity.Company;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.UUID;

public interface ApplicationRepository extends JpaRepository<Application, UUID> {

    // Lấy tất cả đơn ứng tuyển của một công việc (theo company)
    @Query("SELECT a FROM Application a WHERE a.jobPost.id = :jobId AND a.jobPost.company = :company")
    Page<Application> findByJobPostIdAndCompany(
            @Param("jobId") UUID jobId,
            @Param("company") Company company,
            Pageable pageable);

    // Lấy tất cả đơn ứng tuyển của company (mọi job)
    @Query("SELECT a FROM Application a WHERE a.jobPost.company = :company")
    Page<Application> findAllByCompany(@Param("company") Company company, Pageable pageable);

    // Kiểm tra ứng viên đã nộp đơn chưa (theo email + jobId)
    boolean existsByEmailAndJobPostId(String email, UUID jobPostId);
}
