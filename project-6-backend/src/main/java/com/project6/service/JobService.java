package com.project6.service;

import com.project6.dto.JobRequestDTO;
import com.project6.dto.JobResponseDTO;
import com.project6.entity.Company;
import com.project6.entity.JobPost;
import com.project6.entity.Skill;
import com.project6.repository.CompanyRepository;
import com.project6.repository.CityRepository;
import com.project6.repository.JobPostRepository;
import com.project6.repository.SkillRepository;
import com.project6.repository.SpecializationRepository;
import com.project6.repository.JobFieldRepository;
import com.project6.entity.JobField;
import com.project6.entity.Specialization;
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
import org.springframework.data.jpa.domain.Specification;

@Service
@RequiredArgsConstructor
public class JobService {

    private final JobPostRepository jobPostRepository;
    private final CompanyRepository companyRepository;
    private final CityRepository cityRepository;
    private final SkillRepository skillRepository;
    private final SpecializationRepository specializationRepository;
    private final JobFieldRepository jobFieldRepository;
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

    public JobResponseDTO getJobById(UUID id) {
        return jobPostRepository.findById(id)
                .map(JobResponseDTO::from)
                .orElse(null);
    }

    public Page<JobResponseDTO> searchJobs(String keyword, String province, String skill,
                                           String specialization, String companyName,
                                           List<String> levels, List<String> workTypes,
                                           BigDecimal salaryMin, BigDecimal salaryMax,
                                           List<String> jobFields, int page, int size) {
        int pageIndex = (page > 0) ? page - 1 : 0;
        Pageable pageable = PageRequest.of(pageIndex, size, Sort.by(Sort.Direction.DESC, "createdAt"));
        
        Specification<JobPost> spec = com.project6.repository.JobPostSpecification.withDynamicQuery(
                keyword, province, skill, specialization, companyName,
                levels, workTypes, salaryMin, salaryMax, jobFields);
        
        Page<JobPost> jobs = jobPostRepository.findAll(spec, pageable);
        return jobs.map(JobResponseDTO::from);
    }

    private Set<Skill> saveAndMapSkills(String techString) {
        Set<Skill> skillSet = new HashSet<>();
        if (techString != null && !techString.isBlank()) {
            String[] techs = techString.split(",");
            for (String t : techs) {
                String techName = t.trim();
                if (techName.isEmpty()) continue;
                Skill skill = skillRepository.findFirstByName(techName).orElseGet(() -> {
                    Skill newSkill = Skill.builder().name(techName).build();
                    return skillRepository.save(newSkill);
                });
                skillSet.add(skill);
            }
        }
        return skillSet;
    }

    private Specialization getOrCreateSpecialization(String name) {
        if (name == null || name.isBlank()) return null;
        return specializationRepository.findFirstByName(name)
                .orElseGet(() -> specializationRepository.save(
                        Specialization.builder().slug(name).name(name).build()));
    }

    private Set<JobField> getOrCreateFields(String fieldsString) {
        Set<JobField> fieldsSet = new HashSet<>();
        if (fieldsString != null && !fieldsString.isBlank()) {
            String[] fieldArray = fieldsString.split(",");
            for (String f : fieldArray) {
                String name = f.trim();
                if (name.isEmpty()) continue;
                JobField jf = jobFieldRepository.findFirstByName(name).orElseGet(() -> 
                        jobFieldRepository.save(JobField.builder().slug(name).name(name).build()));
                fieldsSet.add(jf);
            }
        }
        return fieldsSet;
    }

    @Transactional
    public void createJob(JobRequestDTO req) {
        Company company = getCurrentCompany();
        
        JobPost jobPost = JobPost.builder()
                .company(company)
                .postedBy(company.getId())
                .title(req.getName() != null ? req.getName() : "Untitled")
                .description(req.getDescription() != null ? req.getDescription() : "")
                .requirements("")
                .salaryMin(req.getMinSalary() != null ? BigDecimal.valueOf(req.getMinSalary()) : null)
                .salaryMax(req.getMaxSalary() != null ? BigDecimal.valueOf(req.getMaxSalary()) : null)
                .jobType(req.getWorkingForm())
                .level(req.getLevel())
                .specializationEntity(getOrCreateSpecialization(req.getSpecialization()))
                .jobFields(getOrCreateFields(req.getFields()))
                .city(req.getCityName() != null && !req.getCityName().isBlank()
                        ? cityRepository.findFirstByName(req.getCityName()).orElse(null) : null)
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
        if (req.getSpecialization() != null) jobPost.setSpecializationEntity(getOrCreateSpecialization(req.getSpecialization()));
        if (req.getFields() != null) jobPost.setJobFields(getOrCreateFields(req.getFields()));
        if (req.getDescription() != null) jobPost.setDescription(req.getDescription());
        if (req.getCityName() != null && !req.getCityName().isBlank()) {
            cityRepository.findFirstByName(req.getCityName()).ifPresent(jobPost::setCity);
        }

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

    public List<JobResponseDTO> getSimilarJobs(UUID jobId, int limit) {
        JobPost currentJob = jobPostRepository.findById(jobId).orElse(null);
        if (currentJob == null) return Collections.emptyList();

        // Collect current job's skill IDs and specialization ID
        Set<UUID> currentSkillIds = currentJob.getSkills() == null ? Collections.emptySet()
                : currentJob.getSkills().stream().map(Skill::getId).collect(java.util.stream.Collectors.toSet());
        UUID currentSpecId = currentJob.getSpecializationEntity() != null
                ? currentJob.getSpecializationEntity().getId() : null;

        // Fetch all other jobs
        List<JobPost> allJobs = jobPostRepository.findAll();

        return allJobs.stream()
                .filter(j -> !j.getId().equals(jobId))
                .filter(j -> {
                    // Same specialization
                    boolean sameSpec = currentSpecId != null
                            && j.getSpecializationEntity() != null
                            && j.getSpecializationEntity().getId().equals(currentSpecId);
                    // At least 3 matching skills
                    long matchingSkills = j.getSkills() == null ? 0
                            : j.getSkills().stream().filter(s -> currentSkillIds.contains(s.getId())).count();
                    return sameSpec || matchingSkills >= 3;
                })
                .sorted((a, b) -> {
                    int scoreA = similarityScore(a, currentSpecId, currentSkillIds);
                    int scoreB = similarityScore(b, currentSpecId, currentSkillIds);
                    return Integer.compare(scoreB, scoreA); // descending
                })
                .limit(limit)
                .map(JobResponseDTO::from)
                .collect(java.util.stream.Collectors.toList());
    }

    private int similarityScore(JobPost job, UUID specId, Set<UUID> skillIds) {
        int score = 0;
        // Same specialization = high bonus
        if (specId != null && job.getSpecializationEntity() != null
                && job.getSpecializationEntity().getId().equals(specId)) {
            score += 100;
        }
        // Each matching skill adds 10 points
        if (job.getSkills() != null) {
            score += (int) job.getSkills().stream()
                    .filter(s -> skillIds.contains(s.getId()))
                    .count() * 10;
        }
        return score;
    }
}
