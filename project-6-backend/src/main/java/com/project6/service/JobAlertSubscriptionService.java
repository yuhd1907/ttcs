package com.project6.service;

import com.project6.entity.Company;
import com.project6.entity.JobAlertCompanyFollow;
import com.project6.entity.JobAlertSkillSubscription;
import com.project6.entity.User;
import com.project6.repository.CompanyRepository;
import com.project6.repository.JobAlertCompanyFollowRepository;
import com.project6.repository.JobAlertSkillSubscriptionRepository;
import com.project6.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class JobAlertSubscriptionService {

    private final UserRepository userRepository;
    private final CompanyRepository companyRepository;
    private final JobAlertSkillSubscriptionRepository skillSubRepo;
    private final JobAlertCompanyFollowRepository companyFollowRepo;

    private User getCurrentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Người dùng không tồn tại!"));
    }

    // ===== SKILL SUBSCRIPTIONS =====

    @Transactional(readOnly = true)
    public List<Map<String, Object>> getSkillSubscriptions() {
        User user = getCurrentUser();
        return skillSubRepo.findByUser(user).stream().map(s -> {
            Map<String, Object> m = new LinkedHashMap<>();
            m.put("id", s.getId());
            m.put("skillName", s.getSkillName());
            m.put("cityName", s.getCityName());
            m.put("active", s.isActive());
            return m;
        }).collect(Collectors.toList());
    }

    @Transactional
    public Map<String, Object> addSkillSubscription(String skillName, String cityName) {
        User user = getCurrentUser();
        long count = skillSubRepo.findByUser(user).size();
        if (count >= 5) throw new RuntimeException("Bạn chỉ có thể đăng ký tối đa 5 kỹ năng!");
        if (skillSubRepo.existsByUserAndSkillNameAndCityName(user, skillName, cityName)) {
            throw new RuntimeException("Kỹ năng này tại thành phố này đã được đăng ký!");
        }
        JobAlertSkillSubscription sub = skillSubRepo.save(
            JobAlertSkillSubscription.builder()
                .user(user).skillName(skillName).cityName(cityName).active(true).build()
        );
        Map<String, Object> m = new LinkedHashMap<>();
        m.put("id", sub.getId());
        m.put("skillName", sub.getSkillName());
        m.put("cityName", sub.getCityName());
        m.put("active", sub.isActive());
        return m;
    }

    @Transactional
    public void removeSkillSubscription(UUID id) {
        User user = getCurrentUser();
        JobAlertSkillSubscription sub = skillSubRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy đăng ký!"));
        if (!sub.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Bạn không có quyền xóa đăng ký này!");
        }
        skillSubRepo.delete(sub);
    }

    // ===== COMPANY FOLLOWS =====

    @Transactional(readOnly = true)
    public List<Map<String, Object>> getCompanyFollows() {
        User user = getCurrentUser();
        return companyFollowRepo.findByUser(user).stream().map(f -> {
            Map<String, Object> m = new LinkedHashMap<>();
            m.put("id", f.getId());
            m.put("companyId", f.getCompany().getId());
            m.put("companyName", f.getCompany().getCompanyName());
            m.put("active", f.isActive());
            return m;
        }).collect(Collectors.toList());
    }

    @Transactional
    public Map<String, Object> addCompanyFollow(UUID companyId) {
        User user = getCurrentUser();
        long count = companyFollowRepo.findByUser(user).size();
        if (count >= 5) throw new RuntimeException("Bạn chỉ có thể theo dõi tối đa 5 công ty!");
        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new RuntimeException("Công ty không tồn tại!"));
        if (companyFollowRepo.existsByUserAndCompany(user, company)) {
            throw new RuntimeException("Bạn đã theo dõi công ty này rồi!");
        }
        JobAlertCompanyFollow follow = companyFollowRepo.save(
            JobAlertCompanyFollow.builder()
                .user(user).company(company).active(true).build()
        );
        Map<String, Object> m = new LinkedHashMap<>();
        m.put("id", follow.getId());
        m.put("companyId", company.getId());
        m.put("companyName", company.getCompanyName());
        m.put("active", follow.isActive());
        return m;
    }

    @Transactional
    public void removeCompanyFollow(UUID id) {
        User user = getCurrentUser();
        JobAlertCompanyFollow follow = companyFollowRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy theo dõi!"));
        if (!follow.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Bạn không có quyền xóa theo dõi này!");
        }
        companyFollowRepo.delete(follow);
    }
}
