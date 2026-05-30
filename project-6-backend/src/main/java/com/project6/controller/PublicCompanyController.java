package com.project6.controller;

import com.project6.dto.ApiResponse;
import com.project6.dto.JobResponseDTO;
import com.project6.entity.Company;
import com.project6.repository.CompanyRepository;
import com.project6.service.CompanyProfileService;
import com.project6.service.JobService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/public/company")
@RequiredArgsConstructor
public class PublicCompanyController {

    private final CompanyProfileService companyProfileService;
    private final JobService jobService;
    private final CompanyRepository companyRepository;

    /** GET /api/public/company/list — danh sách tất cả công ty (id + tên) cho dropdown */
    @GetMapping("/list")
    public ResponseEntity<Object> listCompanies() {
        List<Map<String, Object>> result = companyRepository.findAll().stream()
                .sorted(Comparator.comparing(Company::getCompanyName))
                .map(c -> {
                    Map<String, Object> m = new LinkedHashMap<>();
                    m.put("id", c.getId());
                    m.put("name", c.getCompanyName());
                    m.put("avatar", c.getAvatar());
                    return m;
                })
                .collect(Collectors.toList());
        return ResponseEntity.ok(result);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getCompanyDetail(@PathVariable String id) {
        try {
            UUID uuid = UUID.fromString(id);
            return ResponseEntity.ok(companyProfileService.getCompanyDetail(uuid));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("ID công ty không hợp lệ (không phải UUID): " + id));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @GetMapping("/{id}/jobs")
    public ResponseEntity<Object> getCompanyJobs(
            @PathVariable String id,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "12") int size) {
        try {
            UUID uuid = UUID.fromString(id);
            Page<JobResponseDTO> jobPage = jobService.getJobsByCompanyId(uuid, page, size);
            Map<String, Object> data = new HashMap<>();
            data.put("code", "success");
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
