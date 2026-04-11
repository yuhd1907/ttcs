package com.project6.controller;

import com.project6.dto.ApiResponse;
import com.project6.dto.JobRequestDTO;
import com.project6.dto.JobResponseDTO;
import com.project6.service.JobService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/company/job")
@RequiredArgsConstructor
public class JobController {

    private final JobService jobService;

    @GetMapping("/list")
    public ResponseEntity<Object> getJobList(@RequestParam(defaultValue = "1") int page) {
        try {
            int size = 12; // Mặc định 12 items / trang
            Page<JobResponseDTO> jobPage = jobService.getJobsByCompany(page, size);
            
            Map<String, Object> data = new HashMap<>();
            data.put("code", "success");
            data.put("message", "Lấy danh sách thành công");
            data.put("jobList", jobPage.getContent());
            data.put("totalPages", jobPage.getTotalPages());
            data.put("totalElements", jobPage.getTotalElements());
            data.put("currentPage", page);
            
            return ResponseEntity.ok(data); 
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @PostMapping("/create")
    public ResponseEntity<ApiResponse> createJob(@ModelAttribute JobRequestDTO req) {
        try {
            jobService.createJob(req);
            return ResponseEntity.ok(ApiResponse.success("Tạo việc làm mới thành công!"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @GetMapping("/detail/{id}")
    public ResponseEntity<ApiResponse> getJobDetail(@PathVariable UUID id) {
        try {
            JobResponseDTO detail = jobService.getJobDetail(id);
            return ResponseEntity.ok(ApiResponse.success("Get detail success", detail));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @GetMapping("/edit/{id}")
    public ResponseEntity<Object> getJobForEdit(@PathVariable UUID id) {
        try {
            JobResponseDTO detail = jobService.getJobDetail(id);
            Map<String, Object> data = new HashMap<>();
            data.put("code", "success");
            data.put("message", "Get detail success");
            data.put("job", detail); 
            return ResponseEntity.ok(data);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @PatchMapping("/edit/{id}")
    public ResponseEntity<ApiResponse> updateJob(@PathVariable UUID id, @ModelAttribute JobRequestDTO req) {
        try {
            jobService.updateJob(id, req);
            return ResponseEntity.ok(ApiResponse.success("Cập nhật thông tin thành công!"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<ApiResponse> deleteJob(@PathVariable UUID id) {
        try {
            jobService.deleteJob(id);
            return ResponseEntity.ok(ApiResponse.success("Xoá công việc thành công!"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }
}
