package com.project6.controller;

import com.project6.dto.ApiResponse;
import com.project6.dto.ApplicationResponseDTO;
import com.project6.service.ApplicationService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
public class ApplicationController {

    private final ApplicationService applicationService;

    // ===================== PUBLIC — ứng viên nộp đơn =====================

    /** POST /api/public/apply — nộp đơn + upload CV */
    @PostMapping("/api/public/apply")
    public ResponseEntity<Object> apply(
            @RequestParam("jobId")     String jobId,
            @RequestParam("fullName")  String fullName,
            @RequestParam("email")     String email,
            @RequestParam("phone")     String phone,
            @RequestParam(value = "coverLetter", required = false) String coverLetter,
            @RequestParam(value = "cv", required = false) MultipartFile cvFile) {
        try {
            ApplicationResponseDTO result = applicationService.apply(
                    UUID.fromString(jobId), fullName, email, phone, coverLetter, cvFile);
            Map<String, Object> body = new HashMap<>();
            body.put("code", "success");
            body.put("message", "Nộp đơn ứng tuyển thành công!");
            body.put("data", result);
            return ResponseEntity.ok(body);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    /** GET /api/public/applications/by-email?email=... — ứng viên tra cứu theo email */
    @GetMapping("/api/public/applications/by-email")
    public ResponseEntity<Object> getByEmail(@RequestParam String email) {
        try {
            List<ApplicationResponseDTO> result = applicationService.getApplicationsByEmail(email);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    /** GET /api/user/my-applications — ứng viên đã đăng nhập xem đơn của mình (dùng cookie JWT) */
    @GetMapping("/api/user/my-applications")
    public ResponseEntity<Object> getMyApplications() {
        try {
            List<ApplicationResponseDTO> result = applicationService.getMyApplications();
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    /** GET /api/public/applications/{id} — chi tiết đơn (ứng viên) */
    @GetMapping("/api/public/applications/{id}")
    public ResponseEntity<Object> getPublicDetail(@PathVariable UUID id) {
        try {
            return ResponseEntity.ok(applicationService.getApplicationDetail(id));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    /** DELETE /api/public/applications/{id} — ứng viên xóa đơn */
    @DeleteMapping("/api/public/applications/{id}")
    public ResponseEntity<Object> deleteApplication(
            @PathVariable UUID id) {
        try {
            applicationService.deleteApplication(id);
            return ResponseEntity.ok(Map.of("code", "success", "message", "Đã xóa đơn ứng tuyển!"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    // ===================== COMPANY — nhà tuyển dụng quản lý =====================

    /** GET /company/applications — xem toàn bộ đơn */
    @GetMapping("/company/applications")
    public ResponseEntity<Object> getAllApplications(
            @RequestParam(defaultValue = "1")  int page,
            @RequestParam(defaultValue = "10") int size) {
        try {
            Page<ApplicationResponseDTO> result = applicationService.getAllApplications(page, size);
            Map<String, Object> body = new HashMap<>();
            body.put("code", "success");
            body.put("data", result.getContent());
            body.put("totalPages", result.getTotalPages());
            body.put("totalElements", result.getTotalElements());
            body.put("currentPage", page);
            return ResponseEntity.ok(body);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    /** GET /company/applications/job/{jobId} — đơn theo job cụ thể */
    @GetMapping("/company/applications/job/{jobId}")
    public ResponseEntity<Object> getApplicationsByJob(
            @PathVariable UUID jobId,
            @RequestParam(defaultValue = "1")  int page,
            @RequestParam(defaultValue = "10") int size) {
        try {
            Page<ApplicationResponseDTO> result = applicationService.getApplicationsByJob(jobId, page, size);
            Map<String, Object> body = new HashMap<>();
            body.put("code", "success");
            body.put("data", result.getContent());
            body.put("totalPages", result.getTotalPages());
            body.put("totalElements", result.getTotalElements());
            return ResponseEntity.ok(body);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    /** GET /company/applications/{id} — chi tiết đơn (tự đổi pending→reviewed) */
    @GetMapping("/company/applications/{id}")
    public ResponseEntity<Object> getCompanyDetail(@PathVariable UUID id) {
        try {
            ApplicationResponseDTO app = applicationService.getApplicationDetail(id);
            if ("pending".equals(app.getStatus())) {
                app = applicationService.updateStatus(id, "reviewed");
            }
            return ResponseEntity.ok(app);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    /** PATCH /company/applications/{id}/status?status=... — duyệt / từ chối */
    @PatchMapping("/company/applications/{id}/status")
    public ResponseEntity<Object> updateStatus(
            @PathVariable UUID id,
            @RequestParam String status) {
        try {
            ApplicationResponseDTO result = applicationService.updateStatus(id, status);
            return ResponseEntity.ok(Map.of("code", "success", "data", result));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }
}
