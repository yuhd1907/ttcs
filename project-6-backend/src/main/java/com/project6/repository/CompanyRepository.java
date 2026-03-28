package com.project6.repository;

import com.project6.entity.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.UUID;

public interface CompanyRepository extends JpaRepository<Company, UUID> {
    Optional<Company> findByEmail(String email);
    boolean existsByEmail(String email);
}
