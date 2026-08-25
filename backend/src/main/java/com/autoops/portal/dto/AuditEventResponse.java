package com.autoops.portal.dto;

import com.autoops.portal.entity.AuditAction;

import java.time.Instant;

public class AuditEventResponse {

    private Long id;
    private Long serviceId;
    private String serviceName;
    private AuditAction action;
    private String message;
    private Instant createdAt;

    public AuditEventResponse(
            Long id,
            Long serviceId,
            String serviceName,
            AuditAction action,
            String message,
            Instant createdAt
    ) {
        this.id = id;
        this.serviceId = serviceId;
        this.serviceName = serviceName;
        this.action = action;
        this.message = message;
        this.createdAt = createdAt;
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

    public AuditAction getAction() {
        return action;
    }

    public String getMessage() {
        return message;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }
}