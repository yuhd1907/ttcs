package com.project6;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class Project6BackendApplication {
    public static void main(String[] args) {
        SpringApplication.run(Project6BackendApplication.class, args);
    }
}
