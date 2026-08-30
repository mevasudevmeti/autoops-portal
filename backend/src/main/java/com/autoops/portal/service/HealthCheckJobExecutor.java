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
    private final JobLogService jobLogService;

    public HealthCheckJobExecutor(
            JobRepository jobRepository,
            ServiceRepository serviceRepository,
            HealthCheckClient healthCheckClient,
            JobLogService jobLogService
    ) {
        this.jobRepository = jobRepository;
        this.serviceRepository = serviceRepository;
        this.healthCheckClient = healthCheckClient;
        this.jobLogService = jobLogService;
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

        try {
            jobLogService.info(
                    job,
                    "Health check started"
            );

            job.setStatus(JobStatus.RUNNING);
            job.setStartedAt(Instant.now());
            job.setMessage(
                    "Checking service health"
            );

            jobRepository.save(job);

            jobLogService.info(
                    job,
                    "Sending health request to "
                            + healthUrl
            );

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

                if (result.statusCode() != null) {
                    jobLogService.info(
                            job,
                            "Received HTTP "
                                    + result.statusCode()
                    );
                }

                jobLogService.info(
                        job,
                        "Health check completed successfully"
                );
            } else {
                job.setStatus(
                        JobStatus.FAILED
                );

                service.setStatus(
                        ServiceStatus.DOWN
                );

                if (result.statusCode() != null) {
                    jobLogService.warn(
                            job,
                            "Health endpoint returned HTTP "
                                    + result.statusCode()
                    );
                }

                jobLogService.error(
                        job,
                        result.message()
                );
            }

            job.setMessage(
                    result.message()
            );

        } catch (Exception exception) {

            job.setStatus(
                    JobStatus.FAILED
            );

            job.setMessage(
                    "Unexpected health check failure"
            );

            service.setStatus(
                    ServiceStatus.DOWN
            );

            jobLogService.error(
                    job,
                    "Unexpected health check failure: "
                            + exception.getMessage()
            );
        } finally {

            job.setCompletedAt(
                    Instant.now()
            );

            serviceRepository.save(service);
            jobRepository.save(job);
        }
    }
}