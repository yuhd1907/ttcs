package com.project6.controller;

import com.project6.dto.ApiResponse;
import com.project6.service.JobAlertSubscriptionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/user/job-alert")
@RequiredArgsConstructor
public class JobAlertController {

    private final JobAlertSubscriptionService subscriptionService;

    // ===== SKILL SUBSCRIPTIONS =====

    @GetMapping("/skills")
    public ResponseEntity<Object> getSkills() {
        try {
            return ResponseEntity.ok(ApiResponse.success("OK", subscriptionService.getSkillSubscriptions()));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @PostMapping("/skills")
    public ResponseEntity<Object> addSkill(@RequestBody Map<String, String> body) {
        try {
            String skillName = body.get("skillName");
            String cityName = body.get("cityName");
            if (skillName == null || cityName == null || skillName.isBlank() || cityName.isBlank()) {
                return ResponseEntity.badRequest().body(ApiResponse.error("Thiếu kỹ năng hoặc thành phố!"));
            }
            return ResponseEntity.ok(ApiResponse.success("Đăng ký thành công!", subscriptionService.addSkillSubscription(skillName, cityName)));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @DeleteMapping("/skills/{id}")
    public ResponseEntity<Object> removeSkill(@PathVariable UUID id) {
        try {
            subscriptionService.removeSkillSubscription(id);
            return ResponseEntity.ok(ApiResponse.success("Đã xóa đăng ký!"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    // ===== COMPANY FOLLOWS =====

    @GetMapping("/companies")
    public ResponseEntity<Object> getCompanies() {
        try {
            return ResponseEntity.ok(ApiResponse.success("OK", subscriptionService.getCompanyFollows()));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @PostMapping("/companies")
    public ResponseEntity<Object> addCompany(@RequestBody Map<String, String> body) {
        try {
            String companyIdStr = body.get("companyId");
            if (companyIdStr == null || companyIdStr.isBlank()) {
                return ResponseEntity.badRequest().body(ApiResponse.error("Thiếu ID công ty!"));
            }
            return ResponseEntity.ok(ApiResponse.success("Theo dõi thành công!", subscriptionService.addCompanyFollow(UUID.fromString(companyIdStr))));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @DeleteMapping("/companies/{id}")
    public ResponseEntity<Object> removeCompany(@PathVariable UUID id) {
        try {
            subscriptionService.removeCompanyFollow(id);
            return ResponseEntity.ok(ApiResponse.success("Đã xóa theo dõi!"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }
}
