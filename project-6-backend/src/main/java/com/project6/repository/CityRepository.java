package com.project6.repository;

import com.project6.entity.City;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface CityRepository extends JpaRepository<City, UUID> {
    Optional<City> findByCode(String code);
    Optional<City> findByName(String name);
}
