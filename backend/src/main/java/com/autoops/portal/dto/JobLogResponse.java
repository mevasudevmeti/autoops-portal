package com.autoops.portal.dto;

import com.autoops.portal.entity.JobLogLevel;
import com.autoops.portal.entity.JobType;

import java.time.Instant;

public class JobLogResponse {

    private Long id;
    private Long jobId;
    private Long serviceId;
    private String serviceName;
    private JobType jobType;
    private JobLogLevel level;
    private String message;
    private Instant createdAt;

    public JobLogResponse(
            Long id,
            Long jobId,
            Long serviceId,
            String serviceName,
            JobType jobType,
            JobLogLevel level,
            String message,
            Instant createdAt
    ) {
        this.id = id;
        this.jobId = jobId;
        this.serviceId = serviceId;
        this.serviceName = serviceName;
        this.jobType = jobType;
        this.level = level;
        this.message = message;
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
    }

    public Long getJobId() {
        return jobId;
    }

    public Long getServiceId() {
        return serviceId;
    }

    public String getServiceName() {
        return serviceName;
    }

    public JobType getJobType() {
        return jobType;
    }

    public JobLogLevel getLevel() {
        return level;
    }

    public String getMessage() {
        return message;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }
}