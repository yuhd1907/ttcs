package com.project6.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.project6.entity.User;
import com.project6.repository.UserRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.*;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;

import java.io.ByteArrayInputStream;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

/**
 * Service xét duyệt CV tự động bằng Google Gemini API với kiến trúc RAG.
 *
 * Logging strategy:
 *  - [INIT]   : khởi động / nạp knowledge base
 *  - [STEP-1] : download PDF
 *  - [STEP-2] : trích xuất text từ PDF
 *  - [STEP-3] : gọi Gemini API (RAG)
 *  - [STEP-4] : parse JSON phản hồi
 *  - [STEP-5] : lưu DB
 *  - [RETRY]  : thông tin từng lần retry
 *  - [FALLBACK]: kích hoạt fallback model / rule-based
 *  - [RESULT] : kết quả cuối cùng
 *  - [ERROR]  : chi tiết lỗi
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class CvScreeningService {

    private final UserRepository userRepository;
    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;
    private final UserProfileBuilderService profileBuilderService;

    @Value("${gemini.api-key}")
    private String geminiApiKey;

    @Value("${gemini.model:gemini-2.5-flash}")
    private String geminiModel;

    private static final String FALLBACK_MODEL   = "gemini-2.0-flash-lite";
    private static final String GEMINI_URL_TEMPLATE =
        "https://generativelanguage.googleapis.com/v1beta/models/%s:generateContent?key=%s";

    private static final DateTimeFormatter TS = DateTimeFormatter.ofPattern("HH:mm:ss.SSS");

    // =========================================================
    //  RAG – Knowledge Base
    // =========================================================

    private String knowledgeBase = "";

    @PostConstruct
    public void init() {
        log.info("╔══════════════════════════════════════════════════════╗");
        log.info("║  [INIT] CvScreeningService khởi động                 ║");
        log.info("╚══════════════════════════════════════════════════════╝");
        try {
            ClassPathResource resource = new ClassPathResource("itviec_cv_criteria.md");
            this.knowledgeBase = new String(resource.getInputStream().readAllBytes(), StandardCharsets.UTF_8);
            log.info("[INIT] ✅ Knowledge base (RAG) nạp thành công: {} ký tự từ 'itviec_cv_criteria.md'",
                knowledgeBase.length());
        } catch (Exception e) {
            this.knowledgeBase = buildDefaultKnowledgeBase();
            log.warn("[INIT] ⚠️  Không đọc được 'itviec_cv_criteria.md' → dùng knowledge base mặc định ({} ký tự). Lỗi: {}",
                knowledgeBase.length(), e.getMessage());
        }
        log.info("[INIT] Gemini primary model  : {}", geminiModel);
        log.info("[INIT] Gemini fallback model : {}", FALLBACK_MODEL);
    }

    // =========================================================
    //  Main async flow
    // =========================================================

    @Async
    public void screenCvAsync(UUID userId, String cvUrl) {
        String sessionId = userId.toString().substring(0, 8); // short id cho log
        long startMs = System.currentTimeMillis();

        log.info("┌─────────────────────────────────────────────────────────────");
        log.info("│ [START] Xét duyệt CV | userId={} | time={}", userId, ts());
        log.info("│ [START] CV URL : {}", maskUrl(cvUrl));
        log.info("└─────────────────────────────────────────────────────────────");

        try {
            // ── STEP-1: Download PDF ──────────────────────────────────────
            log.info("[STEP-1][{}] Bắt đầu tải PDF từ Cloudinary...", sessionId);
            long t1 = System.currentTimeMillis();
            byte[] pdfBytes = downloadFile(cvUrl);
            long d1 = System.currentTimeMillis() - t1;

            if (pdfBytes == null || pdfBytes.length == 0) {
                log.error("[STEP-1][{}] ❌ Tải PDF thất bại sau {}ms | URL={}", sessionId, d1, maskUrl(cvUrl));
                updateStatus(userId, "INVALID", "Không thể tải file CV. File có thể bị lỗi hoặc không tồn tại.", null);
                logEnd(sessionId, "INVALID", startMs);
                return;
            }
            log.info("[STEP-1][{}] ✅ Tải PDF thành công | kích thước={}KB | thời gian={}ms",
                sessionId, pdfBytes.length / 1024, d1);

            // ── STEP-2: Trích xuất text ───────────────────────────────────
            log.info("[STEP-2][{}] Bắt đầu trích xuất text từ PDF (PDFBox)...", sessionId);
            long t2 = System.currentTimeMillis();
            String cvText = extractTextFromPdf(pdfBytes);
            long d2 = System.currentTimeMillis() - t2;

            if (cvText == null || cvText.trim().length() < 50) {
                log.warn("[STEP-2][{}] ⚠️  PDF không trích xuất được text (có thể là PDF ảnh scan) | ký tự={} | {}ms",
                    sessionId, cvText == null ? 0 : cvText.trim().length(), d2);
                log.info("[STEP-2][{}] → Fallback: đọc profile từ database...", sessionId);
                cvText = profileBuilderService.buildCvText(userId);
                if (cvText != null && cvText.trim().length() >= 50) {
                    log.info("[STEP-2][{}] ✅ Profile DB: {} ký tự", sessionId, cvText.length());
                }
            } else {
                log.info("[STEP-2][{}] ✅ Trích xuất text thành công | {} ký tự | {}ms", sessionId, cvText.length(), d2);
                log.debug("[STEP-2][{}] Preview (500 ký tự đầu): {}", sessionId,
                    cvText.substring(0, Math.min(500, cvText.length())).replace("\n", " ↵ "));
            }

            if (cvText == null || cvText.trim().length() < 50) {
                log.error("[STEP-2][{}] ❌ Không có nội dung text để xét duyệt (< 50 ký tự)", sessionId);
                updateStatus(userId, "INVALID",
                    "File CV không đọc được hoặc nội dung quá ngắn. Vui lòng điền đầy đủ thông tin trên trang Cá nhân trước.", null);
                logEnd(sessionId, "INVALID", startMs);
                return;
            }

            // ── STEP-3: RAG → Gemini ──────────────────────────────────────
            log.info("[STEP-3][{}] Bắt đầu xây dựng RAG prompt và gọi Gemini API...", sessionId);
            log.debug("[STEP-3][{}] Knowledge base size: {} ký tự | CV text size: {} ký tự",
                sessionId, knowledgeBase.length(), cvText.length());
            long t3 = System.currentTimeMillis();
            Map<String, Object> result = callGeminiWithRag(cvText, sessionId);
            long d3 = System.currentTimeMillis() - t3;

            if (result == null) {
                log.warn("[STEP-3][{}] ⚠️  Gemini API thất bại hoàn toàn sau {}ms → kích hoạt Rule-Based fallback",
                    sessionId, d3);
                result = ruleBasedFallback(cvText, sessionId);
            } else {
                log.info("[STEP-3][{}] ✅ Gemini phản hồi thành công | tổng thời gian={}ms", sessionId, d3);
            }

            // ── STEP-4 + 5: Lưu DB ───────────────────────────────────────
            boolean valid     = (Boolean) result.getOrDefault("valid", false);
            String  reason    = (String)  result.getOrDefault("reason", "Không xác định được lý do.");
            Boolean graduated = (Boolean) result.getOrDefault("graduated", null);
            String  src       = (String)  result.getOrDefault("source", "gemini");

            log.info("[STEP-4][{}] Kết quả phân tích: valid={} | graduated={} | source={}", sessionId, valid, graduated, src);
            log.info("[STEP-4][{}] Lý do: {}", sessionId, reason);

            if (valid) {
                updateStatus(userId, "VALID", null, graduated);
            } else {
                updateStatus(userId, "INVALID", reason, graduated);
            }

            logEnd(sessionId, valid ? "VALID ✅" : "INVALID ❌", startMs);

        } catch (Exception e) {
            log.error("[ERROR][{}] Lỗi không mong đợi tại screenCvAsync: {} | class={}",
                sessionId, e.getMessage(), e.getClass().getSimpleName(), e);
            updateStatus(userId, "INVALID", "Đã xảy ra lỗi khi xét duyệt CV. Vui lòng thử tải lại file.", null);
            logEnd(sessionId, "ERROR ❌", startMs);
        }
    }

    // =========================================================
    //  RAG Core
    // =========================================================

    private Map<String, Object> callGeminiWithRag(String cvText, String sessionId) {
        String prompt = buildRagPrompt(cvText);

        // Thử primary model trước, rồi fallback model
        String[] models = { geminiModel, FALLBACK_MODEL };

        for (String model : models) {
            log.info("[STEP-3][{}] Gọi model: '{}' | max_retry=3", sessionId, model);
            Map<String, Object> result = callGeminiWithRetry(model, prompt, 3, sessionId);
            if (result != null) {
                result.put("source", "gemini/" + model);
                return result;
            }
            log.warn("[FALLBACK][{}] Model '{}' thất bại hoàn toàn → thử model tiếp theo", sessionId, model);
        }

        log.error("[FALLBACK][{}] ❌ Tất cả {} model đều thất bại", sessionId, models.length);
        return null;
    }

    private Map<String, Object> callGeminiWithRetry(String model, String prompt, int maxRetries, String sessionId) {
        for (int attempt = 1; attempt <= maxRetries; attempt++) {
            log.info("[RETRY][{}] model={} | lần thử {}/{}", sessionId, model, attempt, maxRetries);
            try {
                long t = System.currentTimeMillis();
                Map<String, Object> result = doCallGemini(model, prompt, sessionId);
                long ms = System.currentTimeMillis() - t;

                if (result != null) {
                    log.info("[RETRY][{}] ✅ model='{}' thành công ở lần {}/{} | {}ms",
                        sessionId, model, attempt, maxRetries, ms);
                    return result;
                }
                // result null = JSON parse lỗi, không cần retry
                log.warn("[RETRY][{}] ⚠️  model='{}' trả về JSON không hợp lệ | {}ms → không retry", sessionId, model, ms);
                break;

            } catch (HttpServerErrorException e) {
                int waitMs = (int) Math.pow(2, attempt - 1) * 2000; // 2s, 4s, 8s
                log.warn("[RETRY][{}] ⚠️  HTTP {} ({}): {} | model='{}' | lần {}/{} | đợi {}ms trước retry",
                    sessionId, e.getStatusCode().value(), e.getStatusCode(), e.getResponseBodyAsString(),
                    model, attempt, maxRetries, waitMs);
                sleepQuietly(waitMs);

            } catch (HttpClientErrorException e) {
                log.error("[ERROR][{}] ❌ HTTP {} ({}): {} | model='{}' | không retry (lỗi client)",
                    sessionId, e.getStatusCode().value(), e.getStatusCode(), truncate(e.getResponseBodyAsString(), 300), model);
                logGeminiClientError(e, model, sessionId);
                break; // 4xx không retry

            } catch (Exception e) {
                int waitMs = (int) Math.pow(2, attempt - 1) * 2000;
                log.warn("[RETRY][{}] ⚠️  Exception: {} | {} | model='{}' | lần {}/{} | đợi {}ms",
                    sessionId, e.getClass().getSimpleName(), e.getMessage(), model, attempt, maxRetries, waitMs);
                sleepQuietly(waitMs);
            }
        }
        return null;
    }

    private Map<String, Object> doCallGemini(String model, String prompt, String sessionId) throws Exception {
        String systemInstruction =
            "Bạn là hệ thống xét duyệt CV chuyên nghiệp cho nền tảng tuyển dụng IT. " +
            "Chỉ trả về JSON thuần túy, không có markdown code block, không có giải thích, chỉ JSON.";

        Map<String, Object> generationConfig = new HashMap<>();
        generationConfig.put("temperature", 0.1);
        generationConfig.put("maxOutputTokens", 600);
        generationConfig.put("responseMimeType", "application/json");

        Map<String, Object> body = new HashMap<>();
        body.put("generationConfig", generationConfig);
        body.put("systemInstruction", Map.of("parts", List.of(Map.of("text", systemInstruction))));
        body.put("contents", List.of(Map.of("parts", List.of(Map.of("text", prompt)))));

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        String url = String.format(GEMINI_URL_TEMPLATE, model, geminiApiKey);
        log.debug("[STEP-3][{}] POST → {}", sessionId, url.replaceAll("key=.*", "key=***MASKED***"));

        long t = System.currentTimeMillis();
        ResponseEntity<String> response = restTemplate.exchange(
            url, HttpMethod.POST, new HttpEntity<>(body, headers), String.class
        );
        long ms = System.currentTimeMillis() - t;

        log.info("[STEP-3][{}] HTTP {} từ Gemini model='{}' | {}ms", sessionId, response.getStatusCode().value(), model, ms);

        if (!response.getStatusCode().is2xxSuccessful() || response.getBody() == null) {
            log.warn("[STEP-3][{}] ⚠️  Phản hồi không thành công: HTTP {}", sessionId, response.getStatusCode());
            return null;
        }

        // Log raw response (truncated)
        String rawBody = response.getBody();
        log.debug("[STEP-3][{}] Raw response ({}B): {}", sessionId, rawBody.length(), truncate(rawBody, 500));

        // Parse candidates[0].content.parts[0].text
        JsonNode root = objectMapper.readTree(rawBody);

        // Log usage metadata nếu có
        if (root.has("usageMetadata")) {
            JsonNode usage = root.path("usageMetadata");
            log.info("[STEP-3][{}] Token usage → input={} | output={} | total={}",
                sessionId,
                usage.path("promptTokenCount").asInt(0),
                usage.path("candidatesTokenCount").asInt(0),
                usage.path("totalTokenCount").asInt(0));
        }

        JsonNode candidates = root.path("candidates");
        if (candidates.isEmpty()) {
            log.warn("[STEP-3][{}] ⚠️  Không có 'candidates' trong phản hồi Gemini", sessionId);
            // Log finishReason nếu có
            if (root.has("promptFeedback")) {
                log.warn("[STEP-3][{}] promptFeedback: {}", sessionId, root.path("promptFeedback"));
            }
            return null;
        }

        // Log finishReason
        String finishReason = candidates.get(0).path("finishReason").asText("UNKNOWN");
        log.info("[STEP-3][{}] finishReason: {}", sessionId, finishReason);
        if (!"STOP".equals(finishReason) && !"MAX_TOKENS".equals(finishReason)) {
            log.warn("[STEP-3][{}] ⚠️  finishReason không phải STOP: '{}' → kết quả có thể không hoàn chỉnh",
                sessionId, finishReason);
        }

        String content = candidates.get(0)
            .path("content").path("parts").get(0)
            .path("text").asText("");

        log.info("[STEP-4][{}] Gemini raw JSON: {}", sessionId, truncate(content, 300));
        return parseGeminiJson(content, sessionId);
    }

    // =========================================================
    //  Helpers – logging
    // =========================================================

    private void logGeminiClientError(HttpClientErrorException e, String model, String sessionId) {
        int code = e.getStatusCode().value();
        String hint;
        switch (code) {
            case 400 -> hint = "Request body sai format hoặc model không hỗ trợ tham số này";
            case 401 -> hint = "API key không hợp lệ hoặc đã hết hạn – kiểm tra gemini.api-key trong application.yml";
            case 403 -> hint = "API key không có quyền sử dụng model này";
            case 404 -> hint = "Model '" + model + "' không tồn tại";
            case 429 -> hint = "Quá giới hạn request (rate limit) – đợi và thử lại hoặc nâng cấp quota";
            default  -> hint = "Lỗi HTTP " + code + " từ Gemini";
        }
        log.error("[ERROR][{}] Gemini {} Error → {}", sessionId, code, hint);
        try {
            JsonNode errBody = objectMapper.readTree(e.getResponseBodyAsString());
            log.error("[ERROR][{}] Gemini error detail: {}", sessionId, errBody.path("error").path("message").asText());
        } catch (Exception ignored) {}
    }

    private void logEnd(String sessionId, String outcome, long startMs) {
        long total = System.currentTimeMillis() - startMs;
        log.info("┌─────────────────────────────────────────────────────────────");
        log.info("│ [RESULT] sessionId={} | outcome={} | tổng thời gian={}ms", sessionId, outcome, total);
        log.info("└─────────────────────────────────────────────────────────────");
    }

    private String ts() { return LocalDateTime.now().format(TS); }

    private String maskUrl(String url) {
        if (url == null) return "null";
        return url.length() > 80 ? url.substring(0, 80) + "…" : url;
    }

    private String truncate(String s, int max) {
        if (s == null) return "null";
        return s.length() > max ? s.substring(0, max) + "…" : s;
    }

    // =========================================================
    //  RAG – Prompt Builder
    // =========================================================

    private String buildRagPrompt(String cvText) {
        String truncated = cvText.length() > 12000
            ? cvText.substring(0, 12000) + "\n...[nội dung bị cắt bớt]"
            : cvText;

        return """
            Hãy đánh giá CV dưới đây dựa trên tiêu chí kiểm duyệt được cung cấp.

            ======== TIÊU CHÍ XÉT DUYỆT (Knowledge Base) ========
            %s
            =====================================================

            ======== NỘI DUNG CV CẦN ĐÁNH GIÁ ========
            %s
            ============================================

            ======== YÊU CẦU ĐẦU RA ========
            Trả về JSON hợp lệ với ĐÚNG 3 trường sau, KHÔNG thêm trường nào khác:
            {
              "valid": true hoặc false,
              "reason": "Lý do ngắn gọn bằng tiếng Việt (tối đa 200 ký tự). Nếu valid=true thì ghi 'CV hợp lệ'.",
              "graduated": true (đã tốt nghiệp) | false (chưa tốt nghiệp) | null (không xác định được)
            }
            Trường "graduated" chỉ phản ánh tình trạng học tập, KHÔNG ảnh hưởng đến kết quả valid.
            """.formatted(this.knowledgeBase, truncated);
    }

    // =========================================================
    //  JSON Parser
    // =========================================================

    private Map<String, Object> parseGeminiJson(String content, String sessionId) {
        try {
            int start = content.indexOf('{');
            int end   = content.lastIndexOf('}');
            if (start == -1 || end == -1 || end <= start) {
                log.error("[STEP-4][{}] ❌ Không tìm thấy JSON object trong: '{}'", sessionId, truncate(content, 200));
                return null;
            }
            String json = content.substring(start, end + 1);
            JsonNode node = objectMapper.readTree(json);

            boolean validField    = node.path("valid").asBoolean(false);
            String  reasonField   = node.path("reason").asText("Không xác định.");
            Boolean graduatedField = node.path("graduated").isNull() ? null : node.path("graduated").asBoolean();

            log.info("[STEP-4][{}] Parse JSON thành công → valid={} | graduated={} | reason={}",
                sessionId, validField, graduatedField, truncate(reasonField, 150));

            Map<String, Object> result = new HashMap<>();
            result.put("valid",     validField);
            result.put("reason",    reasonField);
            result.put("graduated", graduatedField);
            return result;

        } catch (Exception e) {
            log.error("[STEP-4][{}] ❌ Parse JSON thất bại | content='{}' | lỗi={}",
                sessionId, truncate(content, 300), e.getMessage());
            return null;
        }
    }

    // =========================================================
    //  Rule-Based Fallback
    // =========================================================

    private Map<String, Object> ruleBasedFallback(String cvText, String sessionId) {
        log.info("[FALLBACK][{}] Kích hoạt Rule-Based fallback (không cần Gemini)...", sessionId);
        String text = cvText.toLowerCase();
        Map<String, Object> result = new HashMap<>();

        boolean hasContact  = text.contains("@") || text.contains("điện thoại") || text.contains("phone");
        long techCount      = List.of("java","python","javascript","react","angular","vue","spring",
                "node","sql","html","css","git","docker","php","c++","c#",".net","kotlin","swift",
                "mysql","postgresql","mongodb")
            .stream().filter(text::contains).count();
        boolean hasDegree   = text.contains("đại học") || text.contains("university") ||
            text.contains("kỹ sư") || text.contains("cntt") || text.contains("computer");
        boolean hasExpOrProj = text.contains("kinh nghiệm") || text.contains("experience") ||
            text.contains("công ty") || text.contains("dự án") || text.contains("project");

        log.info("[FALLBACK][{}] Rule check → hasContact={} | techSkills={} | hasDegree={} | hasExpOrProj={}",
            sessionId, hasContact, techCount, hasDegree, hasExpOrProj);

        boolean valid = hasContact && techCount >= 2 && (hasDegree || hasExpOrProj);

        if (!valid) {
            List<String> missing = new ArrayList<>();
            if (!hasContact)                    missing.add("thiếu thông tin liên hệ");
            if (techCount < 2)                  missing.add("thiếu kỹ năng IT cụ thể (tìm thấy " + techCount + ")");
            if (!hasDegree && !hasExpOrProj)    missing.add("thiếu bằng cấp hoặc kinh nghiệm/dự án IT");
            String reason = "CV chưa đạt yêu cầu: " + String.join(", ", missing);
            log.info("[FALLBACK][{}] → INVALID | {}", sessionId, reason);
            result.put("valid",     false);
            result.put("reason",    reason);
            result.put("graduated", null);
            result.put("source",    "rule-based-fallback");
        } else {
            log.info("[FALLBACK][{}] → VALID", sessionId);
            result.put("valid",     true);
            result.put("reason",    "CV hợp lệ");
            result.put("graduated", null);
            result.put("source",    "rule-based-fallback");
        }
        return result;
    }

    // =========================================================
    //  Helpers – IO
    // =========================================================

    private byte[] downloadFile(String url) {
        try {
            java.net.URI uri = java.net.URI.create(url);
            long t = System.currentTimeMillis();
            ResponseEntity<byte[]> response = restTemplate.getForEntity(uri, byte[].class);
            long ms = System.currentTimeMillis() - t;
            log.debug("[STEP-1] HTTP {} từ Cloudinary | {}ms", response.getStatusCode().value(), ms);
            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                return response.getBody();
            }
            log.warn("[STEP-1] Cloudinary trả HTTP {} (không có body)", response.getStatusCode());
        } catch (Exception e) {
            log.error("[STEP-1] ❌ Lỗi tải file | URL={} | {} : {}", maskUrl(url),
                e.getClass().getSimpleName(), e.getMessage());
        }
        return null;
    }

    private String extractTextFromPdf(byte[] pdfBytes) {
        try (PDDocument document = PDDocument.load(new ByteArrayInputStream(pdfBytes))) {
            int pages = document.getNumberOfPages();
            PDFTextStripper stripper = new PDFTextStripper();
            String text = stripper.getText(document).replaceAll("\\s{3,}", "\n\n").trim();
            log.debug("[STEP-2] PDF có {} trang | {} ký tự trích xuất được", pages, text.length());
            return text;
        } catch (Exception e) {
            log.error("[STEP-2] ❌ PDFBox lỗi: {} : {}", e.getClass().getSimpleName(), e.getMessage());
            return null;
        }
    }

    private void updateStatus(UUID userId, String status, String reason, Boolean graduated) {
        try {
            log.info("[STEP-5] Lưu DB → userId={} | cvStatus={} | graduated={}", userId, status, graduated);
            User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy user: " + userId));
            user.setCvStatus(status);
            user.setCvInvalidReason(reason);
            if (graduated != null) user.setCvGraduated(graduated);
            userRepository.save(user);
            log.info("[STEP-5] ✅ Lưu DB thành công | userId={} | cvStatus={} | graduated={}", userId, status, graduated);
        } catch (Exception e) {
            log.error("[STEP-5] ❌ Lỗi lưu DB | userId={} | {}: {}", userId,
                e.getClass().getSimpleName(), e.getMessage());
        }
    }

    private void sleepQuietly(long ms) {
        try { Thread.sleep(ms); }
        catch (InterruptedException ie) { Thread.currentThread().interrupt(); }
    }

    private String buildDefaultKnowledgeBase() {
        return """
            TIÊU CHÍ XÉT DUYỆT CV:
            1. Có họ tên và ít nhất 1 thông tin liên hệ (email, SĐT, LinkedIn/GitHub).
            2. Có bằng cấp IT/CNTT hoặc chứng chỉ chuyên ngành IT.
               Nếu không có bằng cấp → phải có kinh nghiệm/dự án IT thực tế.
            3. Nội dung không rác, không spam, có cấu trúc rõ ràng.
            4. Mô tả công việc/dự án đủ chi tiết, không sơ sài.
            OUTPUT: JSON 3 trường: {"valid": true/false, "reason": "...", "graduated": true/false/null}
            """;
    }

}
