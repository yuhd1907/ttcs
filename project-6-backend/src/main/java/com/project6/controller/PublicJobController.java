package com.project6.controller;

import com.project6.dto.ApiResponse;
import com.project6.dto.JobResponseDTO;
import com.project6.service.JobService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/public/job")
@RequiredArgsConstructor
public class PublicJobController {

    private final JobService jobService;

    @GetMapping("/{id}")
    public ResponseEntity<Object> getJobById(@PathVariable UUID id) {
        try {
            JobResponseDTO job = jobService.getJobById(id);
            if (job == null) return ResponseEntity.notFound().build();
            return ResponseEntity.ok(job);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @GetMapping("/search")
    public ResponseEntity<Object> searchJobs(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String province,
            @RequestParam(required = false) String skill,
            @RequestParam(required = false) String specialization,
            @RequestParam(required = false) String companyName,
            @RequestParam(required = false) String level,
            @RequestParam(required = false) String workType,
            @RequestParam(required = false) Double salaryMin,
            @RequestParam(required = false) Double salaryMax,
            @RequestParam(required = false) String jobField,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "12") int size) {
        
        try {
            List<String> levels = level != null && !level.isEmpty() ? Arrays.asList(level.split(",")) : null;
            List<String> workTypes = workType != null && !workType.isEmpty() ? Arrays.asList(workType.split(",")) : null;
            List<String> jobFields = jobField != null && !jobField.isEmpty() ? Arrays.asList(jobField.split(",")) : null;
            
            BigDecimal minSalary = salaryMin != null ? BigDecimal.valueOf(salaryMin) : null;
            BigDecimal maxSalary = salaryMax != null ? BigDecimal.valueOf(salaryMax) : null;

            Page<JobResponseDTO> jobPage = jobService.searchJobs(
                    keyword, province, skill, specialization, companyName,
                    levels, workTypes, minSalary, maxSalary, jobFields, page, size);

            Map<String, Object> data = new HashMap<>();
            data.put("code", "success");
            data.put("message", "Tìm kiếm thành công");
            data.put("jobList", jobPage.getContent());
            data.put("totalPages", jobPage.getTotalPages());
            data.put("totalElements", jobPage.getTotalElements());
            data.put("currentPage", page);
            
            return ResponseEntity.ok(data);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }
}
