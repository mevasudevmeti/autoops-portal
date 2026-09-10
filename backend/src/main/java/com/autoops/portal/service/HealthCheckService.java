package com.autoops.portal.service;

import com.autoops.portal.client.HealthCheckClient;
import com.autoops.portal.client.HealthCheckResult;
import com.autoops.portal.dto.JobResponse;
import com.autoops.portal.entity.JobEntity;
import com.autoops.portal.entity.JobStatus;
import com.autoops.portal.entity.JobType;
import com.autoops.portal.entity.ServiceEntity;
import com.autoops.portal.entity.ServiceStatus;
import com.autoops.portal.exception.ServiceNotFoundException;
import com.autoops.portal.repository.JobRepository;
import com.autoops.portal.repository.ServiceRepository;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
public class HealthCheckService {

    private final ServiceRepository serviceRepository;
    private final JobRepository jobRepository;
    private final HealthCheckJobExecutor healthCheckJobExecutor;

    public HealthCheckService(
            ServiceRepository serviceRepository,
            JobRepository jobRepository,
            HealthCheckJobExecutor healthCheckJobExecutor
    ) {
        this.serviceRepository =
                serviceRepository;

        this.jobRepository =
                jobRepository;

        this.healthCheckJobExecutor = healthCheckJobExecutor;
    }

    public JobResponse runHealthCheck(
            Long serviceId
    ) {
        ServiceEntity service = serviceRepository
                .findById(serviceId)
                .orElseThrow(
                        () -> new ServiceNotFoundException(
                                serviceId
                        )
                );

        String healthUrl =
                service.getHealthUrl();

        JobEntity job =
                new JobEntity();

        job.setService(service);
        job.setType(JobType.HEALTH_CHECK);
        job.setStatus(JobStatus.PENDING);
        job.setMessage("Health check queued");

        JobEntity savedJob =
                jobRepository.save(job);

        if (
                healthUrl == null
                        || healthUrl.isBlank()
        ) {
            savedJob.setStatus(
                    JobStatus.FAILED
            );

            savedJob.setMessage(
                    "No health URL configured"
            );

            savedJob.setCompletedAt(
                    Instant.now()
            );

            JobEntity failedJob =
                    jobRepository.save(
                            savedJob
                    );

            return toResponse(
                    failedJob
            );
        }

        healthCheckJobExecutor.execute(
                savedJob.getId(),
                service.getId(),
                healthUrl
        );

        return toResponse(savedJob);
    }

    private JobResponse toResponse(
            JobEntity job
    ) {
        return new JobResponse(
                job.getId(),
                job.getService().getId(),
                job.getService().getName(),
                job.getType(),
                job.getStatus(),
                job.getMessage(),
                job.getCreatedAt(),
                job.getStartedAt(),
                job.getCompletedAt()
        );
    }
}