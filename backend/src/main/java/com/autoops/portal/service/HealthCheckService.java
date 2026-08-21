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
    private final HealthCheckClient healthCheckClient;

    public HealthCheckService(
            ServiceRepository serviceRepository,
            JobRepository jobRepository,
            HealthCheckClient healthCheckClient
    ) {
        this.serviceRepository =
                serviceRepository;

        this.jobRepository =
                jobRepository;

        this.healthCheckClient =
                healthCheckClient;
    }

    public JobResponse runHealthCheck(
            Long serviceId
    ) {
        ServiceEntity service =
                serviceRepository
                        .findById(serviceId)
                        .orElseThrow(
                                () ->
                                        new ServiceNotFoundException(
                                                serviceId
                                        )
                        );

        JobEntity job = new JobEntity();

        job.setService(service);
        job.setType(JobType.HEALTH_CHECK);
        job.setStatus(JobStatus.PENDING);
        job.setMessage(
                "Health check queued"
        );

        job = jobRepository.save(job);

        job.setStatus(JobStatus.RUNNING);
        job.setStartedAt(Instant.now());
        job.setMessage(
                "Checking service health"
        );

        jobRepository.save(job);

        String healthUrl =
                service.getHealthUrl();

        if (
                healthUrl == null
                        || healthUrl.isBlank()
        ) {
            job.setStatus(JobStatus.FAILED);
            job.setMessage(
                    "No health URL configured"
            );
            job.setCompletedAt(Instant.now());

            JobEntity failedJob =
                    jobRepository.save(job);

            return toResponse(failedJob);
        }

        HealthCheckResult result =
                healthCheckClient.check(
                        healthUrl
                );

        if (result.healthy()) {
            job.setStatus(
                    JobStatus.SUCCESS
            );

            service.setStatus(
                    ServiceStatus.HEALTHY
            );
        } else {
            job.setStatus(
                    JobStatus.FAILED
            );

            service.setStatus(
                    ServiceStatus.DOWN
            );
        }

        job.setMessage(
                result.message()
        );

        job.setCompletedAt(
                Instant.now()
        );

        serviceRepository.save(service);

        JobEntity completedJob =
                jobRepository.save(job);

        return toResponse(completedJob);
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