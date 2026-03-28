package com.project6.service;

import com.project6.dto.CompanyInfoDto;
import com.project6.dto.CompanyProfileRequest;
import com.project6.entity.Company;
import com.project6.repository.CompanyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CompanyProfileService {

    private final CompanyRepository companyRepository;
    private final FileStorageService fileStorageService;

    public CompanyInfoDto updateProfile(CompanyProfileRequest request) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Optional<Company> optionalCompany = companyRepository.findByEmail(email);

        if (optionalCompany.isEmpty()) {
            throw new RuntimeException("Không tìm thấy công ty đang đăng nhập.");
        }

        Company company = optionalCompany.get();

        if (request.getCompanyName() != null) company.setCompanyName(request.getCompanyName());
        if (request.getProvince() != null) company.setProvince(request.getProvince());
        if (request.getAddress() != null) company.setAddress(request.getAddress());
        if (request.getModel() != null) company.setModel(request.getModel());
        if (request.getEmployees() != null) company.setEmployees(request.getEmployees());
        if (request.getWorkingTime() != null) company.setWorkingTime(request.getWorkingTime());
        if (request.getOvertime() != null) company.setOvertime(request.getOvertime());
        // For security, usually email updates require verification. Assuming here simple update.
        if (request.getEmail() != null) company.setEmail(request.getEmail());
        if (request.getPhone() != null) company.setPhone(request.getPhone());
        if (request.getField() != null) company.setField(request.getField());
        if (request.getDescription() != null) company.setDescription(request.getDescription());

        // Handle Avatar update
        if (request.getAvatar() != null && !request.getAvatar().isEmpty()) {
            String avatarUrl = fileStorageService.storeFile(request.getAvatar());
            company.setAvatar(avatarUrl);
        }

        Company updatedCompany = companyRepository.save(company);
        return CompanyInfoDto.from(updatedCompany);
    }
}
