package com.autoops.portal.dto;

import com.autoops.portal.entity.JobStatus;
import com.autoops.portal.entity.JobType;

import java.time.Instant;

public class JobResponse {

    private Long id;

    private Long serviceId;

    private String serviceName;

    private JobType type;

    private JobStatus status;

    private String message;

    private Instant createdAt;

    private Instant startedAt;

    private Instant completedAt;

    public JobResponse(
            Long id,
            Long serviceId,
            String serviceName,
            JobType type,
            JobStatus status,
            String message,
            Instant createdAt,
            Instant startedAt,
            Instant completedAt
    ) {
        this.id = id;
        this.serviceId = serviceId;
        this.serviceName = serviceName;
        this.type = type;
        this.status = status;
        this.message = message;
        this.createdAt = createdAt;
        this.startedAt = startedAt;
        this.completedAt = completedAt;
    }

    public Long getId() {
        return id;
    }

    public Long getServiceId() {
        return serviceId;
    }

    public String getServiceName() {
        return serviceName;
    }

    public JobType getType() {
        return type;
    }

    public JobStatus getStatus() {
        return status;
    }

    public String getMessage() {
        return message;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public Instant getStartedAt() {
        return startedAt;
    }

    public Instant getCompletedAt() {
        return completedAt;
    }
}