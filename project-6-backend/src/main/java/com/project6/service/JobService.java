package com.project6.service;

import com.project6.dto.JobRequestDTO;
import com.project6.dto.JobResponseDTO;
import com.project6.entity.Company;
import com.project6.entity.JobPost;
import com.project6.entity.Skill;
import com.project6.repository.CompanyRepository;
import com.project6.repository.JobPostRepository;
import com.project6.repository.SkillRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.*;

@Service
@RequiredArgsConstructor
public class JobService {

    private final JobPostRepository jobPostRepository;
    private final CompanyRepository companyRepository;
    private final SkillRepository skillRepository;
    private final FileStorageService fileStorageService;

    private Company getCurrentCompany() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return companyRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy thông tin công ty!"));
    }

    public Page<JobResponseDTO> getJobsByCompany(int page, int size) {
        Company company = getCurrentCompany();
        int pageIndex = (page > 0) ? page - 1 : 0;
        Pageable pageable = PageRequest.of(pageIndex, size, Sort.by(Sort.Direction.DESC, "createdAt"));
        Page<JobPost> jobs = jobPostRepository.findByCompany(company, pageable);
        return jobs.map(JobResponseDTO::from);
    }

    private Set<Skill> saveAndMapSkills(String techString) {
        Set<Skill> skillSet = new HashSet<>();
        if (techString != null && !techString.isBlank()) {
            String[] techs = techString.split(",");
            for (String t : techs) {
                String techName = t.trim();
                if (techName.isEmpty()) continue;
                Skill skill = skillRepository.findByName(techName).orElseGet(() -> {
                    Skill newSkill = Skill.builder().name(techName).build();
                    return skillRepository.save(newSkill);
                });
                skillSet.add(skill);
            }
        }
        return skillSet;
    }

    @Transactional
    public void createJob(JobRequestDTO req) {
        Company company = getCurrentCompany();
        
        JobPost jobPost = JobPost.builder()
                .company(company)
                .postedBy(company.getId()) // assuming postedBy is company's UUID for now
                .title(req.getName() != null ? req.getName() : "Untitled")
                .description(req.getDescription() != null ? req.getDescription() : "")
                .requirements("") // Fallback empty
                .salaryMin(req.getMinSalary() != null ? BigDecimal.valueOf(req.getMinSalary()) : null)
                .salaryMax(req.getMaxSalary() != null ? BigDecimal.valueOf(req.getMaxSalary()) : null)
                .jobType(req.getWorkingForm())
                .level(req.getLevel())
                .specialization(req.getSpecialization())
                .fields(req.getFields())
                .currency("VND")
                .status("open")
                .build();

        Set<Skill> dbSkills = saveAndMapSkills(req.getTechnologies());
        jobPost.setSkills(dbSkills);
                
        // Upload images if exist
        if (req.getImages() != null && !req.getImages().isEmpty()) {
            List<String> imageUrls = new ArrayList<>();
            for (MultipartFile file : req.getImages()) {
                String url = fileStorageService.storeFile(file);
                if (url != null) imageUrls.add(url);
            }
            jobPost.setImages(String.join(",", imageUrls));
        }

        jobPostRepository.save(jobPost);
    }

    @Transactional
    public void updateJob(UUID id, JobRequestDTO req) {
        Company company = getCurrentCompany();
        Optional<JobPost> optionalJob = jobPostRepository.findByIdAndCompany(id, company);
        if (optionalJob.isEmpty()) {
            throw new RuntimeException("Công việc không tồn tại hoặc bạn không có quyền sửa!");
        }

        JobPost jobPost = optionalJob.get();
        if (req.getName() != null) jobPost.setTitle(req.getName());
        if (req.getMinSalary() != null) jobPost.setSalaryMin(BigDecimal.valueOf(req.getMinSalary()));
        if (req.getMaxSalary() != null) jobPost.setSalaryMax(BigDecimal.valueOf(req.getMaxSalary()));
        if (req.getLevel() != null) jobPost.setLevel(req.getLevel());
        if (req.getWorkingForm() != null) jobPost.setJobType(req.getWorkingForm());
        if (req.getSpecialization() != null) jobPost.setSpecialization(req.getSpecialization());
        if (req.getFields() != null) jobPost.setFields(req.getFields());
        if (req.getDescription() != null) jobPost.setDescription(req.getDescription());

        if (req.getTechnologies() != null) {
            jobPost.setSkills(saveAndMapSkills(req.getTechnologies()));
        }

        // Update images if sent
        if (req.getImages() != null && !req.getImages().isEmpty()) {
            List<String> imageUrls = new ArrayList<>();
            for (MultipartFile file : req.getImages()) {
                if (file != null && !file.isEmpty()) {
                    String url = fileStorageService.storeFile(file);
                    if (url != null) imageUrls.add(url);
                }
            }
            if (!imageUrls.isEmpty()) {
                jobPost.setImages(String.join(",", imageUrls));
            }
        }

        jobPostRepository.save(jobPost);
    }

    public void deleteJob(UUID id) {
        Company company = getCurrentCompany();
        Optional<JobPost> optionalJob = jobPostRepository.findByIdAndCompany(id, company);
        if (optionalJob.isEmpty()) {
            throw new RuntimeException("Công việc không tồn tại hoặc bạn không có quyền xoá!");
        }
        jobPostRepository.delete(optionalJob.get());
    }

    public JobResponseDTO getJobDetail(UUID id) {
        Company company = getCurrentCompany();
        Optional<JobPost> optionalJob = jobPostRepository.findByIdAndCompany(id, company);
        if (optionalJob.isEmpty()) {
            throw new RuntimeException("Công việc không tồn tại hoặc bạn không có quyền truy cập!");
        }
        return JobResponseDTO.from(optionalJob.get());
    }
}
