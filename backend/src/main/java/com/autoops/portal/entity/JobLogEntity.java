package com.autoops.portal.entity;

import jakarta.persistence.*;

import java.time.Instant;

@Entity
@Table(name = "job_logs")
public class JobLogEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "job_id",
            nullable = false
    )
    private JobEntity job;

    @Enumerated(EnumType.STRING)
    @Column(
            nullable = false,
            length = 20
    )
    private JobLogLevel level;

    @Column(
            nullable = false,
            length = 2000
    )
    private String message;

    @Column(
            name = "created_at",
            nullable = false,
            updatable = false
    )
    private Instant createdAt = Instant.now();

    public JobLogEntity() {
    }

    public Long getId() {
        return id;
    }

    public JobEntity getJob() {
        return job;
    }

    public void setJob(
            JobEntity job
    ) {
        this.job = job;
    }

    public JobLogLevel getLevel() {
        return level;
    }

    public void setLevel(
            JobLogLevel level
    ) {
        this.level = level;
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