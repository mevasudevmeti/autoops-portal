package com.autoops.portal.service;

import com.autoops.portal.client.HealthCheckClient;
import com.autoops.portal.client.HealthCheckResult;
import com.autoops.portal.entity.JobEntity;
import com.autoops.portal.entity.JobStatus;
import com.autoops.portal.entity.ServiceEntity;
import com.autoops.portal.entity.ServiceStatus;
import com.autoops.portal.repository.JobRepository;
import com.autoops.portal.repository.ServiceRepository;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
public class HealthCheckJobExecutor {

    private final JobRepository jobRepository;
    private final ServiceRepository serviceRepository;
    private final HealthCheckClient healthCheckClient;

    public HealthCheckJobExecutor(
            JobRepository jobRepository,
            ServiceRepository serviceRepository,
            HealthCheckClient healthCheckClient
    ) {
        this.jobRepository = jobRepository;
        this.serviceRepository = serviceRepository;
        this.healthCheckClient = healthCheckClient;
    }

    @Async
    public void execute(
            Long jobId,
            Long serviceId,
            String healthUrl
    ) {
        JobEntity job = jobRepository
                .findById(jobId)
                .orElseThrow();

        ServiceEntity service = serviceRepository
                .findById(serviceId)
                .orElseThrow();

        job.setStatus(JobStatus.RUNNING);
        job.setStartedAt(Instant.now());
        job.setMessage("Checking service health");

        jobRepository.save(job);

        HealthCheckResult result =
                healthCheckClient.check(healthUrl);

        if (result.healthy()) {
            job.setStatus(JobStatus.SUCCESS);
            service.setStatus(ServiceStatus.HEALTHY);
        } else {
            job.setStatus(JobStatus.FAILED);
            service.setStatus(ServiceStatus.DOWN);
        }

        job.setMessage(result.message());
        job.setCompletedAt(Instant.now());

        serviceRepository.save(service);
        jobRepository.save(job);
    }
}