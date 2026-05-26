package com.project6.scheduler;

import com.project6.service.JobAlertService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class JobAlertScheduler {

    private final JobAlertService jobAlertService;

    // Chạy lúc 8:00 sáng mỗi ngày
    @Scheduled(cron = "0 0 8 * * ?")
    public void scheduleJobAlerts() {
        log.info("Bắt đầu lập lịch gửi Job Alerts...");
        jobAlertService.processAndSendJobAlerts();
    }
}
