package com.project6.controller;

import com.project6.entity.City;
import com.project6.entity.JobField;
import com.project6.entity.Specialization;
import com.project6.entity.Skill;
import com.project6.repository.CityRepository;
import com.project6.repository.JobFieldRepository;
import com.project6.repository.SkillRepository;
import com.project6.repository.SpecializationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/public/master-data")
@RequiredArgsConstructor
public class MasterDataController {

    private final JobFieldRepository jobFieldRepository;
    private final SpecializationRepository specializationRepository;
    private final CityRepository cityRepository;
    private final SkillRepository skillRepository;

    @GetMapping("/fields")
    public ResponseEntity<List<JobField>> getFields() {
        return ResponseEntity.ok(jobFieldRepository.findAll());
    }

    @GetMapping("/specializations")
    public ResponseEntity<List<Specialization>> getSpecializations() {
        return ResponseEntity.ok(specializationRepository.findAll());
    }

    @GetMapping("/cities")
    public ResponseEntity<List<City>> getCities() {
        return ResponseEntity.ok(cityRepository.findAll());
    }

    @GetMapping("/skills")
    public ResponseEntity<List<Skill>> getSkills() {
        return ResponseEntity.ok(skillRepository.findAll());
    }
}
