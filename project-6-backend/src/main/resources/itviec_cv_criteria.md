======= TIÊU CHÍ XÉT DUYỆT CV (Theo chuẩn ITviec) =======

--- TIÊU CHÍ 1: THÔNG TIN CƠ BẢN (Bắt buộc) ---
CV phải có:
- Họ và tên đầy đủ.
- Ít nhất 1 thông tin liên hệ trong số: địa chỉ email, số điện thoại, link hồ sơ LinkedIn, link GitHub/GitLab.

--- TIÊU CHÍ 2: BẰNG CẤP / CHỨNG CHỈ (Bắt buộc — chọn 1 trong 2) ---
Lựa chọn A – Bằng cấp chính quy:
  - Đại học / Cao đẳng chuyên ngành: CNTT, Khoa học máy tính, Kỹ thuật phần mềm, Điện tử - Viễn thông, Toán - Tin, hoặc các ngành kỹ thuật liên quan.
Lựa chọn B – Chứng chỉ chuyên ngành IT được công nhận:
  - Các chứng chỉ hợp lệ: AWS Certified, Google Cloud, Azure, CCNA/CCNP, Oracle Certified, CompTIA, Microsoft MCP, PMI, Scrum/Agile.

--- TIÊU CHÍ 3: KINH NGHIỆM THỰC TẾ HOẶC DỰ ÁN (Bắt buộc — chọn 1 trong 2) ---
Lựa chọn A – Kinh nghiệm làm việc:
  - Đã từng làm việc tại công ty IT, dù là internship/thực tập (có tên công ty, vị trí, thời gian).
Lựa chọn B – Dự án cụ thể:
  - Có ít nhất 1 dự án cá nhân, đồ án tốt nghiệp, hoặc dự án nhóm với đầy đủ: tên dự án, mô tả ngắn về chức năng, vai trò bản thân, và các công nghệ sử dụng.

--- TIÊU CHÍ 4: KỸ NĂNG KỸ THUẬT IT (Bắt buộc) ---
- Phải liệt kê rõ ràng ít nhất 2 kỹ năng/công nghệ IT cụ thể.
- Ví dụ hợp lệ: Java, Python, JavaScript, TypeScript, C++, C#, Go, Rust, PHP, Ruby, SQL, MySQL, PostgreSQL, MongoDB, Redis, React, Angular, Vue, Spring Boot, Django, Node.js, Docker, Kubernetes, Git, Linux, Figma, v.v.
- Ghi chung chung như "kỹ năng mềm", "tư duy" không được tính.

--- TIÊU CHÍ 5: CHẤT LƯỢNG & ĐỊNH DẠNG (Bắt buộc) ---
- Nội dung CV phải đủ dài và có cấu trúc rõ ràng (không phải file trống hoặc chỉ vài dòng).
- Có mô tả cụ thể, không quá sơ sài (ví dụ: chỉ liệt kê "Học Java" mà không có gì khác là KHÔNG hợp lệ).
- Không phải danh sách keyword không có ngữ cảnh.

======= PHÂN LOẠI CẤP ĐỘ (chỉ áp dụng khi CV hợp lệ) =======

"FRESHER":
  - Ứng viên chưa có hoặc có dưới 1 năm kinh nghiệm làm việc chuyên nghiệp tại công ty IT.
  - Thời gian làm đồ án, tự học, làm dự án cá nhân KHÔNG được tính vào kinh nghiệm chuyên nghiệp.

"ABOVE_FRESHER":
  - Ứng viên đã có từ 1 năm trở lên kinh nghiệm làm việc THỰC TẾ, có trả lương tại một tổ chức/công ty trong lĩnh vực IT.

======= VÍ DỤ ĐÁNH GIÁ =======

Ví dụ 1 – CV HỢP LỆ (FRESHER):
  Có họ tên, email, số điện thoại.
  Đang học Đại học Bách Khoa chuyên ngành CNTT.
  Có 1 đồ án tốt nghiệp "Ứng dụng quản lý thư viện" sử dụng Java Spring Boot + MySQL.
  Kỹ năng: Java, SQL, Git, HTML/CSS.
  → Kết quả: valid=true, level="FRESHER"

Ví dụ 2 – CV HỢP LỆ (ABOVE_FRESHER):
  Có đầy đủ thông tin liên hệ và LinkedIn.
  Bằng Kỹ sư CNTT, ĐH Bách Khoa TP.HCM.
  Kinh nghiệm: 2 năm tại FPT Software, vị trí Backend Developer (Java).
  Kỹ năng: Java, Spring Boot, PostgreSQL, Docker, Git.
  → Kết quả: valid=true, level="ABOVE_FRESHER"

Ví dụ 3 – CV KHÔNG HỢP LỆ:
  Chỉ có tên và email.
  Học trường không rõ, không có chuyên ngành.
  Không có dự án hoặc kinh nghiệm gì.
  Kỹ năng: "chăm chỉ", "học hỏi nhanh".
  → Kết quả: valid=false, level=null, reason="Thiếu bằng cấp IT, thiếu kinh nghiệm/dự án, thiếu kỹ năng kỹ thuật cụ thể"
