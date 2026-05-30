# Backend cần làm cho tính năng "Đăng ký nhận email"

Tính năng: user đăng ký theo dõi (a) một skill kèm city tuỳ chọn, (b) một công ty. Khi có job mới khớp, hệ thống gửi email cho user.

Frontend đã có UI đầy đủ ở `/user-manage/skill-register`, hiện đang persist tạm vào `localStorage`. Backend cần 3 phần dưới để feature chạy end-to-end.

---

## 1. Endpoint list công ty — **cần ngay**

Hook [`useCompanies.ts`](../project-6/src/hooks/useCompanies.ts) đang gọi:

```
GET /api/public/company/list
```

Trả về `[{ id, name }]`. Nếu chưa có endpoint này thì autocomplete công ty trong trang SkillRegister sẽ trống vĩnh viễn và nút "Theo dõi" luôn bị disable.

Thêm vào [`PublicCompanyController.java`](src/main/java/com/project6/controller/PublicCompanyController.java):

```java
@GetMapping("/list")
public ResponseEntity<List<Map<String, Object>>> listCompanies() {
    List<Map<String, Object>> result = companyRepository.findAll().stream()
        .map(c -> Map.<String, Object>of(
            "id", c.getId(),
            "name", c.getCompanyName()
        ))
        .toList();
    return ResponseEntity.ok(result);
}
```

Inject `CompanyRepository`. Đã nằm trong whitelist `/api/public/**` của `SecurityConfig`, không cần đổi security.

---

## 2. Persist subscriptions (per-user)

Hiện đăng ký lưu trong localStorage (per-browser, không di động theo user). Để backend trigger email được thì cần lưu thật.

### Entity mới

`SkillSubscription` — `(user, skill, city)`, city có thể null:

```java
@Entity
@Table(name = "skill_subscriptions",
    uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "skill_id", "city_id"}))
public class SkillSubscription {
    @Id @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "skill_id", nullable = false)
    private Skill skill;

    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "city_id")
    private City city;            // null = không filter thành phố

    @Column(updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
}
```

`CompanyFollow` — `(user, company)`:

```java
@Entity
@Table(name = "company_follows",
    uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "company_id"}))
public class CompanyFollow {
    @Id @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "company_id", nullable = false)
    private Company company;

    @Column(updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
}
```

Hibernate `ddl-auto: update` (xem [`application.yml`](src/main/resources/application.yml)) sẽ tự tạo bảng.

### Repository

```java
public interface SkillSubscriptionRepository extends JpaRepository<SkillSubscription, UUID> {
    List<SkillSubscription> findByUserId(UUID userId);
    long countByUserId(UUID userId);

    @Query("SELECT s FROM SkillSubscription s " +
           "WHERE s.skill.id = :skillId AND (s.city IS NULL OR s.city.id = :cityId)")
    List<SkillSubscription> findMatching(UUID skillId, UUID cityId);
}

public interface CompanyFollowRepository extends JpaRepository<CompanyFollow, UUID> {
    List<CompanyFollow> findByUserId(UUID userId);
    List<CompanyFollow> findByCompanyId(UUID companyId);
    long countByUserId(UUID userId);
}
```

### Endpoint (yêu cầu đăng nhập)

| Method | Path | Request | Response |
|---|---|---|---|
| GET    | `/user/subscriptions/skills`            | —                       | `[{ id, skillName, cityName }]` |
| POST   | `/user/subscriptions/skills`            | `{ skillId, cityId? }`  | `{ id, skillName, cityName }`   |
| DELETE | `/user/subscriptions/skills/{id}`       | —                       | `200 OK`                        |
| GET    | `/user/subscriptions/companies`         | —                       | `[{ id, companyName }]`         |
| POST   | `/user/subscriptions/companies`         | `{ companyId }`         | `{ id, companyName }`           |
| DELETE | `/user/subscriptions/companies/{id}`    | —                       | `200 OK`                        |

Ràng buộc backend phải tự enforce:
- Tối đa **5** record / user / loại (return 400 nếu vượt).
- Unique `(user, skill, city)` / `(user, company)` — DB constraint sẽ chặn nhưng nên check trước để trả message thân thiện.
- Lấy `currentEmail` từ `SecurityContextHolder` đúng pattern [`UserProfileService.java:21`](src/main/java/com/project6/service/UserProfileService.java#L21).

Route mới phải nằm dưới `/user/...` chứ KHÔNG thuộc whitelist của `SecurityConfig`.

### Khi xong — frontend phải đổi gì

Hiện [`SkillRegister.tsx`](../project-6/src/app/(pages)/user-manage/skill-register/SkillRegister.tsx) đọc/ghi `localStorage`. Khi endpoint sẵn sàng, sẽ swap toàn bộ `useEffect` persistence → fetch các endpoint trên. Đây là việc của bên frontend, không cần backend lo.

---

## 3. Trigger email khi có job mới — **lõi của feature**

### Chỗ chèn

Trong [`JobService.java`](src/main/java/com/project6/service/JobService.java), method `createJob`, **ngay sau** `jobPostRepository.save(...)` thành công:

```java
notificationService.notifyNewJob(savedJob);
```

### Service mới

`SubscriptionNotificationService.notifyNewJob(JobPost job)`:

1. `Set<UUID> recipientIds = new HashSet<>();`
2. Với mỗi `skill ∈ job.getSkills()`:
   - `subs = skillSubscriptionRepository.findMatching(skill.getId(), job.getCity() != null ? job.getCity().getId() : null)`
   - Thêm `sub.getUser().getId()` vào `recipientIds`.
3. `follows = companyFollowRepository.findByCompanyId(job.getCompany().getId())`
   - Thêm `follow.getUser().getId()` vào `recipientIds`.
4. `recipients = userRepository.findAllById(recipientIds)`
5. Với mỗi user, gửi 1 email duy nhất.

Logic dedupe ở bước 2-3 đảm bảo user follow vừa skill vừa công ty của job không nhận 2 email.

### Email template

Reuse y nguyên cấu trúc HTML inline-CSS từ [`JobAlertService.sendEmailToUser`](src/main/java/com/project6/service/JobAlertService.java#L78) — đã có gradient blue header, card layout, button "Xem chi tiết". Chỉ cần đổi tiêu đề:

- Subject (skill match): `"Việc làm mới: {jobTitle} tại {companyName}"`
- Body mở đầu: `"Một việc làm mới khớp với kỹ năng/công ty bạn đang theo dõi..."`

### Async

**Nên `@Async`** để không block request tạo job (gửi mail mất 1-3s). Thêm `@EnableAsync` vào [`Project6BackendApplication`](src/main/java/com/project6/Project6BackendApplication.java) và annotate method `notifyNewJob` bằng `@Async`.

### Lưu ý URL frontend

[`JobAlertService.java:109`](src/main/java/com/project6/service/JobAlertService.java#L109) hardcode `http://localhost:3000`. Khi xây service mới, nên tạo property `app.frontend.url` trong [`application.yml`](src/main/resources/application.yml) và inject qua `@Value("${app.frontend.url}")`. Refactor luôn `JobAlertService` cũ dùng property này.

---

## 4. KHÔNG đụng vào

- [`JobAlertService`](src/main/java/com/project6/service/JobAlertService.java) + [`JobAlertScheduler`](src/main/java/com/project6/scheduler/JobAlertScheduler.java) — mail batch hằng ngày dựa trên skill trong CV. Giữ nguyên. Hai hệ thống song song: cái cũ tự động khám phá theo CV, cái mới là user-opt-in.
- Schema bảng `users`, `companies`, `job_posts` — không sửa cột nào.
- Security whitelist — chỉ `/api/public/company/list` được mở; mọi route mới khác phải authenticated.

---

## 5. Smoke test

1. `GET /api/public/company/list` qua [`api.http`](../project-6/api.http) → trả `[{ id, name }, ...]`.
2. Login user A → `POST /user/subscriptions/skills` `{ skillId: <ID skill JavaScript>, cityId: <ID Hà Nội> }` → DB có record.
3. Đăng ký trùng cùng `(skill, city)` lần 2 → 400.
4. Đăng ký skill thứ 6 → 400 (giới hạn 5).
5. Login company X → `POST /company/job/create` job có skill JavaScript + city Hà Nội → hộp thư user A có email mới.
6. Sub user A là skill JavaScript + city Hà Nội nhưng job ở TP HCM → user A KHÔNG nhận email.
7. User A follow công ty Y. Company Y đăng job bất kỳ → user A nhận email.
8. User A vừa sub skill JavaScript vừa follow công ty X. Company X đăng job có JavaScript → user A nhận **1** email (không phải 2).
