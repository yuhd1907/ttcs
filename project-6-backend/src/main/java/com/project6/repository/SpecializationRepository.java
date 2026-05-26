package com.project6.repository;

import com.project6.entity.Specialization;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SpecializationRepository extends JpaRepository<Specialization, Long> {
    Optional<Specialization> findFirstBySlug(String slug);
    Optional<Specialization> findFirstByName(String name);
}
