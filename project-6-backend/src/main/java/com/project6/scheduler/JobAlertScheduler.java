package com.project6.scheduler;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

/**
 * JobAlertScheduler - không còn dùng scheduler định kỳ nữa.
 * Thông báo email hiện được gửi ngay lập tức (event-driven) khi công ty đăng job mới,
 * thông qua JobAlertService.notifyNewJob() được gọi trong JobService.createJob().
 */
@Component
@Slf4j
public class JobAlertScheduler {
    // Scheduler đã được thay thế bằng cơ chế event-driven.
    // Email được gửi ngay khi có job mới qua JobAlertService.notifyNewJob()
}
