package com.autoops.portal.entity;

import jakarta.persistence.*;

import java.time.Instant;

@Entity
@Table(name = "audit_events")
public class AuditEventEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "service_id")
    private ServiceEntity service;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 50)
    private AuditAction action;

    @Column(nullable = false, length = 1000)
    private String message;

    @Column(
            name = "created_at",
            nullable = false,
            updatable = false
    )
    private Instant createdAt = Instant.now();

    public AuditEventEntity() {
    }

    public Long getId() {
        return id;
    }

    public ServiceEntity getService() {
        return service;
    }

    public void setService(
            ServiceEntity service
    ) {
        this.service = service;
    }

    public AuditAction getAction() {
        return action;
    }

    public void setAction(
            AuditAction action
    ) {
        this.action = action;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(
            String message
    ) {
        this.message = message;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }
}