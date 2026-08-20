package com.autoops.portal.service;

import com.autoops.portal.dto.JobResponse;
import com.autoops.portal.entity.JobEntity;
import com.autoops.portal.repository.JobRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobService {

    private final JobRepository jobRepository;

    public JobService(
            JobRepository jobRepository
    ) {
        this.jobRepository = jobRepository;
    }

    public List<JobResponse> getAllJobs() {
        return jobRepository
                .findAllByOrderByCreatedAtDesc()
                .stream()
                .map(this::toResponse)
                .toList();
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