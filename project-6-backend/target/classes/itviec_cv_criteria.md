======= TIÊU CHÍ XÉT DUYỆT CV TỰ ĐỘNG =======

--- LOGIC QUY TRÌNH ĐÁNH GIÁ (CHAIN OF THOUGHT) ---
Hệ thống kiểm tra TUẦN TỰ theo đúng thứ tự sau, dừng ngay khi gặp điều kiện REJECT:

Bước 1: Kiểm tra Tiêu chí 4 (Tính toàn vẹn) VÀ Tiêu chí 5 (Độ chi tiết).
  → Nếu MỘT trong hai KHÔNG ĐẠT → REJECT NGAY (Early Exit), không xét tiếp.

Bước 2: Kiểm tra Tiêu chí 1 (Thông tin cơ bản).
  → Nếu KHÔNG ĐẠT → REJECT NGAY.
  → Nếu ĐẠT → Chuyển sang Bước 3.

Bước 3: Kiểm tra Tiêu chí 2 (Bằng cấp / Chứng chỉ IT).
  → Nếu ĐẠT → chuyển sang Bước 5.
  → Nếu KHÔNG ĐẠT → chuyển sang Bước 4 (xét cứu vớt cho ứng viên tự học/trái ngành).

Bước 4: Kiểm tra Tiêu chí 3 (Kinh nghiệm thực tế IT).
  → Nếu ĐẠT → chuyển sang Bước 5.
  → Nếu KHÔNG ĐẠT → REJECT.

Bước 5: Kiểm tra Tiêu chí 6 (Tình trạng tốt nghiệp).
  → Chỉ ghi nhận thông tin, KHÔNG ảnh hưởng đến kết quả valid/invalid.
  → Ghi vào trường "graduated" trong JSON output.

Bước 6: Tổng hợp và trả ra JSON.

---

--- TIÊU CHÍ 1: THÔNG TIN CƠ BẢN (Bắt buộc) ---
CV phải có ĐẦY ĐỦ cả hai mục:
- Họ và tên đầy đủ.
- Ít nhất 1 thông tin liên hệ: địa chỉ email, số điện thoại, link LinkedIn, hoặc link GitHub/GitLab.

--- TIÊU CHÍ 2: BẰNG CẤP / CHỨNG CHỈ IT (xét trước Tiêu chí 3) ---
Ứng viên phải có ÍT NHẤT MỘT trong các yếu tố sau:
A. Bằng Đại học / Cao đẳng chuyên ngành: Công nghệ thông tin, Khoa học máy tính, Kỹ thuật phần mềm, Mạng máy tính, Hệ thống thông tin, Điện tử - Viễn thông, An toàn thông tin, hoặc các ngành kỹ thuật tương đương.
B. Chứng chỉ chuyên môn IT quốc tế: AWS, Google Cloud, Azure, CompTIA, CCNA/CCNP, Oracle, Microsoft (MCP/MCSE), PMP (trong bối cảnh IT), Scrum Master.
C. Chứng chỉ lập trình/công nghệ uy tín: FreeCodeCamp, Coursera (chuyên ngành IT), edX, hoặc các coding bootcamp IT có cấp chứng nhận.
→ Nếu KHÔNG có bất kỳ yếu tố nào → Đánh dấu KHÔNG ĐẠT, chuyển xét Tiêu chí 3.

--- TIÊU CHÍ 3: KINH NGHIỆM THỰC TẾ IT (chỉ xét khi KHÔNG ĐẠT Tiêu chí 2) ---
Áp dụng cho ứng viên tự học, trái ngành. Phải có ÍT NHẤT MỘT trong:
A. Đã / đang làm việc tại vị trí IT kỹ thuật (Developer, Tester, Sysadmin, Data Analyst, Helpdesk...) dưới dạng Intern, Fresher hoặc Part-time. BẮT BUỘC có: tên công ty + mô tả công việc cụ thể.
B. Có dự án thực tế tự xây dựng, đóng góp mã nguồn mở (GitHub/GitLab), hoặc sản phẩm Freelance IT được mô tả rõ: chức năng, công nghệ sử dụng, hoặc kèm link sản phẩm/mã nguồn.

--- TIÊU CHÍ 4: TÍNH TOÀN VẸN & ĐỊNH DẠNG (Bắt buộc — vi phạm = REJECT NGAY) ---
CV phải ĐÁP ỨNG ĐỒNG THỜI:
- KHÔNG phải file trống, file lỗi font, hoặc thiếu hoàn toàn các phần nội dung cơ bản.
- KHÔNG chứa thông tin rác, spam, văn bản vô nghĩa (Lorem Ipsum, ký tự lặp lại để qua mặt hệ thống).
- Nội dung phải mạch lạc, có cấu trúc rõ ràng, con người có thể đọc và hiểu được.

--- TIÊU CHÍ 5: ĐỘ CHI TIẾT MÔ TẢ (Bắt buộc — vi phạm = REJECT NGAY) ---
Ngăn chặn CV viết đối phó, quá sơ sài:
- Mỗi vị trí công việc hoặc dự án phải có mô tả cụ thể về công việc/chức năng thực hiện. Không chấp nhận chỉ liệt kê tên công ty, tên dự án, thời gian mà không mô tả nội dung.
- Kỹ năng phải đi kèm ngữ cảnh thực hành.
- Vi phạm điển hình: Chỉ ghi "Kỹ năng: Học Java", "Biết PHP" mà KHÔNG có bất kỳ mô tả, bài tập lớn, hay dự án đi kèm → KHÔNG HỢP LỆ.

--- TIÊU CHÍ 6: TÌNH TRẠNG TỐT NGHIỆP (chỉ ghi nhận, KHÔNG ảnh hưởng kết quả valid) ---
Xác định xem ứng viên đã tốt nghiệp hay chưa dựa trên thông tin trong CV. Kết quả ghi vào trường "graduated" (true/false/null) trong JSON.

ĐÃ TỐT NGHIỆP (graduated=true) nếu:
- Năm kết thúc học tập <= năm hiện tại (2025 trở về trước).
- Hoặc CV ghi rõ trạng thái: "Đã tốt nghiệp", "Graduated", "Tốt nghiệp năm [năm <= 2025]".

CHƯA TỐT NGHIỆP (graduated=false) nếu:
- Năm kết thúc học tập > năm hiện tại (2026 trở đi).
- Hoặc CV ghi: "Sinh viên năm 3", "Sinh viên năm cuối", "Undergrad", "Undergraduate Student", "Expected Graduation [năm > 2025]".
- Hoặc thời gian học hiện tại là "2023 - Present", "2024 - Hiện tại", v.v.

KHÔNG XÁC ĐỊNH (graduated=null) nếu không có đủ thông tin để kết luận.

---

======= VÍ DỤ ĐÁNH GIÁ =======

Ví dụ 1 – CV HỢP LỆ (đã tốt nghiệp):
  Có họ tên, email, SĐT.
  Bằng CNTT, ĐH Bách Khoa, tốt nghiệp 2024.
  Dự án "Hệ thống quản lý thư viện" – Java Spring Boot + MySQL – mô tả đầy đủ chức năng và vai trò.
  → valid=true, reason="CV hợp lệ", graduated=true

Ví dụ 2 – CV HỢP LỆ (chưa tốt nghiệp, trái ngành, có dự án):
  Có họ tên, email, GitHub.
  Học ngành Kinh tế (2022 - 2026, chưa tốt nghiệp).
  Có 2 dự án GitHub mô tả rõ: web bán hàng (React + Node.js), chatbot (Python + FastAPI).
  → valid=true, reason="CV hợp lệ", graduated=false

Ví dụ 3 – CV KHÔNG HỢP LỆ (thiếu thông tin liên hệ):
  Chỉ có tên, không email/SĐT/LinkedIn/GitHub.
  Học CNTT nhưng không có bất kỳ liên hệ nào.
  → valid=false, reason="Thiếu thông tin liên hệ", graduated=null

Ví dụ 4 – CV KHÔNG HỢP LỆ (mô tả sơ sài):
  Có tên, email. Có bằng CNTT.
  Kỹ năng chỉ ghi: "Học Java, Biết PHP" mà không có dự án hay mô tả gì thêm.
  → valid=false, reason="Mô tả kỹ năng quá sơ sài, thiếu ngữ cảnh thực hành", graduated=null

Ví dụ 5 – CV KHÔNG HỢP LỆ (không có bằng cấp IT và không có dự án/kinh nghiệm):
  Có tên, email. Học ngành Kinh tế, không có chứng chỉ IT.
  Không có dự án, không có kinh nghiệm làm việc IT.
  → valid=false, reason="Không có bằng cấp IT và không có kinh nghiệm/dự án IT thực tế", graduated=false
