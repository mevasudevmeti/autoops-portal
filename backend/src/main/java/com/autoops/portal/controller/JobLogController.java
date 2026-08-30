package com.autoops.portal.controller;

import com.autoops.portal.dto.JobLogResponse;
import com.autoops.portal.service.JobLogService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/job-logs")
public class JobLogController {

    private final JobLogService jobLogService;

    public JobLogController(
            JobLogService jobLogService
    ) {
        this.jobLogService = jobLogService;
    }

    @GetMapping
    public List<JobLogResponse> getAllLogs() {
        return jobLogService.getAllLogs();
    }

    @GetMapping("/job/{jobId}")
    public List<JobLogResponse> getLogsByJob(
            @PathVariable Long jobId
    ) {
        return jobLogService
                .getLogsByJobId(jobId);
    }
}