package com.project6.dto;

import com.project6.entity.Company;
import lombok.Data;

@Data
public class CompanyInfoDto {
    private Long id;
    private String email;
    private String companyName;
    private String avatar;
    private String province;
    private String address;
    private String model;
    private String employees;
    private String workingTime;
    private String overtime;
    private String phone;
    private String description;
    private String field;

    public static CompanyInfoDto from(Company company) {
        CompanyInfoDto dto = new CompanyInfoDto();
        dto.id = company.getId();
        dto.email = company.getEmail();
        dto.companyName = company.getCompanyName();
        dto.avatar = company.getAvatar();
        dto.province = company.getProvince();
        dto.address = company.getAddress();
        dto.model = company.getModel();
        dto.employees = company.getEmployees();
        dto.workingTime = company.getWorkingTime();
        dto.overtime = company.getOvertime();
        dto.phone = company.getPhone();
        dto.description = company.getDescription();
        dto.field = company.getField();
        return dto;
    }
}
