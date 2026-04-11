package com.project6.repository;

import com.project6.entity.City;
import com.project6.entity.Company;
import com.project6.entity.JobField;
import com.project6.entity.JobPost;
import com.project6.entity.Skill;
import com.project6.entity.Specialization;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import org.springframework.data.jpa.domain.Specification;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

public class JobPostSpecification {

    public static Specification<JobPost> withDynamicQuery(String keyword, String province, String skill,
                                                          String specialization, String companyName,
                                                          List<String> levels, List<String> workTypes,
                                                          BigDecimal salaryMin, BigDecimal salaryMax,
                                                          List<String> jobFields) {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();
            query.distinct(true);

            // --- Company join (shared, dùng lại cho keyword và companyName) ---
            Join<JobPost, Company> companyJoin = root.join("company", JoinType.LEFT);

            // --- Specialization join (shared, dùng lại cho keyword và specialization filter) ---
            Join<JobPost, Specialization> specJoinShared = root.join("specializationEntity", JoinType.LEFT);

            // --- Keyword: tìm trong title, description, tên công ty, tên chuyên môn ---
            if (keyword != null && !keyword.trim().isEmpty()) {
                String like = "%" + keyword.toLowerCase().trim() + "%";
                Predicate title      = cb.like(cb.lower(root.get("title")),                      like);
                Predicate desc       = cb.like(cb.lower(root.get("description")),                like);
                Predicate company    = cb.like(cb.lower(companyJoin.get("companyName")),         like);
                Predicate specName   = cb.like(cb.lower(specJoinShared.get("name")),             like);
                Predicate specSlugKw = cb.like(cb.lower(specJoinShared.get("slug")),             like);
                predicates.add(cb.or(title, desc, company, specName, specSlugKw));
            }

            // --- Tên công ty riêng ---
            if (companyName != null && !companyName.trim().isEmpty()) {
                String like = "%" + companyName.toLowerCase().trim() + "%";
                predicates.add(cb.like(cb.lower(companyJoin.get("companyName")), like));
            }

            // --- Tỉnh/Thành phố ---
            if (province != null && !province.trim().isEmpty()) {
                Join<JobPost, City> cityJoin = root.join("city", JoinType.LEFT);
                predicates.add(cb.equal(cityJoin.get("name"), province));
            }

            // --- Skill (LIKE, case-insensitive) ---
            if (skill != null && !skill.trim().isEmpty()) {
                Join<JobPost, Skill> skillJoin = root.join("skills", JoinType.INNER);
                String like = "%" + skill.toLowerCase().trim() + "%";
                predicates.add(cb.like(cb.lower(skillJoin.get("name")), like));
            }

            // --- Chuyên môn riêng: tìm qua slug hoặc name ---
            if (specialization != null && !specialization.trim().isEmpty()) {
                String like = "%" + specialization.toLowerCase().trim() + "%";
                Predicate bySlug = cb.like(cb.lower(specJoinShared.get("slug")), like);
                Predicate byName = cb.like(cb.lower(specJoinShared.get("name")), like);
                // Không null (bài phải có specialization)
                predicates.add(cb.and(
                    cb.isNotNull(specJoinShared),
                    cb.or(bySlug, byName)
                ));
            }

            // --- Cấp bậc ---
            if (levels != null && !levels.isEmpty()) {
                predicates.add(root.get("level").in(levels));
            }

            // --- Hình thức làm việc ---
            if (workTypes != null && !workTypes.isEmpty()) {
                predicates.add(root.get("jobType").in(workTypes));
            }

            // --- Lĩnh vực (jobFields) ---
            if (jobFields != null && !jobFields.isEmpty()) {
                Join<JobPost, JobField> fieldJoin = root.join("jobFields", JoinType.INNER);
                predicates.add(fieldJoin.get("slug").in(jobFields));
            }

            // --- Lương ---
            if (salaryMin != null) {
                predicates.add(cb.greaterThanOrEqualTo(root.get("salaryMin"), salaryMin));
            }
            if (salaryMax != null) {
                predicates.add(cb.lessThanOrEqualTo(root.get("salaryMax"), salaryMax));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}

