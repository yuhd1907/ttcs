# Database Setup & Master Data Guide

## Tổng quan
Dự án đã được cấu hình để tự động khởi tạo dữ liệu tĩnh (Master Data) cho các bảng: Cities, JobFields, Skills, và Specializations.

## Dữ liệu được khởi tạo

### 1. **Thành phố (Cities)** - 15 thành phố
- Hà Nội, Thành phố Hồ Chí Minh, Đà Nẵng, Hải Phòng, Cần Thơ, Bình Dương, Đồng Nai, Hà Tĩnh, Nghệ An, Quảng Ninh, Lâm Đồng, Kiên Giang, Long An, Tiền Giang, Bến Tre

### 2. **Lĩnh vực công việc (Job Fields)** - 42 lĩnh vực
- Blockchain & Web3, Thực Phẩm, Du Lịch, Bảo Hiểm, E-commerce, Giáo Dục, Ngân Hàng, Games, Chính Phủ, v.v.

### 3. **Công nghệ & Kỹ năng (Skills)** - 50+ kỹ năng
- **Ngôn ngữ lập trình**: Java, Python, JavaScript, TypeScript, C#, C++, Go, Rust, PHP, Ruby, Swift, Kotlin
- **Frontend**: React, Vue.js, Angular, Next.js
- **Backend**: Spring Boot, Node.js, Express, Django, Flask, ASP.NET
- **Database**: PostgreSQL, MySQL, MongoDB, Redis
- **DevOps**: Docker, Kubernetes, AWS, Azure, Google Cloud, Git, CI/CD
- **Công nghệ khác**: GraphQL, REST API, Microservices, Machine Learning, TensorFlow, PyTorch, Blockchain, Solidity, React Native, Flutter, UI/UX Design, Figma, Agile/Scrum

### 4. **Chuyên môn (Specializations)** - 30+ chuyên môn được nhóm theo danh mục

## Cách hoạt động

### Cách 1: DataLoader (Tự động khởi tạo khi ứng dụng chạy)
Khi ứng dụng Spring Boot khởi động:
1. `DataLoader.java` được thực thi (implement CommandLineRunner)
2. Kiểm tra xem các bảng đã có dữ liệu chưa
3. Nếu chưa có, tự động insert dữ liệu tĩnh vào database

### Cách 2: SQL Migration (Sử dụng Flyway)
File `V1__init_master_data.sql` có thể được sử dụng với Flyway migration (nếu cần).

## API Endpoints

Sau khi ứng dụng khởi động, bạn có thể truy cập các endpoint sau:

### Lấy danh sách lĩnh vực công việc
```
GET /api/public/master-data/fields
Response: [
  {
    "id": "uuid",
    "name": "Dịch vụ Blockchain & Web3",
    "slug": "dich-vu-blockchain-web3"
  },
  ...
]
```

### Lấy danh sách chuyên môn
```
GET /api/public/master-data/specializations
Response: [
  {
    "id": "uuid",
    "category": "IT Executive and Management",
    "name": "Cấp điều hành (CTO, CIO, CISO, CDO)",
    "slug": "cap-dieu-hanh-cto-cio-ciso-cdo"
  },
  ...
]
```

### Lấy danh sách thành phố
```
GET /api/public/master-data/cities
Response: [
  {
    "id": "uuid",
    "name": "Hà Nội",
    "code": "HN"
  },
  ...
]
```

### Lấy danh sách công nghệ/kỹ năng
```
GET /api/public/master-data/skills
Response: [
  {
    "id": "uuid",
    "name": "Java"
  },
  ...
]
```

## Cài đặt & Chạy

### 1. Thiết lập Database PostgreSQL
```bash
# Tạo database
createdb ttcs

# Hoặc dùng pgAdmin
```

### 2. Cập nhật cấu hình (nếu cần)
Edit `src/main/resources/application.yml`:
```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/ttcs
    username: postgres
    password: 1907
```

### 3. Build & Run
```bash
# Build project
mvn clean package

# Chạy ứng dụng
mvn spring-boot:run

# Hoặc run jar file
java -jar target/project-6-backend-0.0.1-SNAPSHOT.jar
```

### 4. Kiểm tra dữ liệu
```bash
# Sử dụng curl
curl http://localhost:8080/api/public/master-data/cities
curl http://localhost:8080/api/public/master-data/fields
curl http://localhost:8080/api/public/master-data/skills
curl http://localhost:8080/api/public/master-data/specializations

# Hoặc sử dụng Postman/REST Client
```

## Cấu trúc Entity

### City (Thành phố)
```java
- id: UUID (Primary Key)
- name: String (tên thành phố)
- code: String (mã thành phố, VD: HN, HCM)
```

### JobField (Lĩnh vực công việc)
```java
- id: UUID (Primary Key)
- name: String (tên lĩnh vực)
- slug: String (URL-friendly name)
```

### Skill (Công nghệ/Kỹ năng)
```java
- id: UUID (Primary Key)
- name: String (tên kỹ năng, unique)
```

### Specialization (Chuyên môn)
```java
- id: UUID (Primary Key)
- category: String (danh mục chuyên môn)
- name: String (tên chuyên môn)
- slug: String (URL-friendly name)
```

## Kêm theo trên Frontend (Next.js)

Bạn có thể tạo các hook trong `src/hooks/` để gọi các API này:

```typescript
// src/hooks/useCities.ts
import { useEffect, useState } from 'react';

export const useCities = () => {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/public/master-data/cities')
      .then(res => res.json())
      .then(data => {
        setCities(data);
        setLoading(false);
      });
  }, []);

  return { cities, loading };
};
```

## Lưu ý quan trọng

1. **Khóa ngoại (Foreign Keys)**: Khi tạo job posts hay cv, hãy sử dụng các ID từ các bảng master data này
2. **Unique Constraints**: 
   - `Skill.name` là unique
   - Các lĩnh vực công việc nên có slug unique (tuy hiện tại chưa được set trong code)
3. **Performance**: Hãy cache dữ liệu master data ở phía client để tránh gọi API nhiều lần

## Tương lai

Bạn có thể:
- Thêm API POST/PUT/DELETE cho admin quản lý master data
- Thêm cache layer (Redis) cho dữ liệu master data
- Tạo migration scripts để update dữ liệu khi có thay đổi
- Thêm validation để kiểm tra dữ liệu trước khi insert


