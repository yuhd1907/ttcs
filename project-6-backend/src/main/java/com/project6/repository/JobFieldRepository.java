package com.project6.repository;

import com.project6.entity.JobField;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface JobFieldRepository extends JpaRepository<JobField, UUID> {
    Optional<JobField> findBySlug(String slug);
}
