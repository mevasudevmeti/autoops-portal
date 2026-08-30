package com.autoops.portal.service;

import com.autoops.portal.dto.JobLogResponse;
import com.autoops.portal.entity.JobEntity;
import com.autoops.portal.entity.JobLogEntity;
import com.autoops.portal.entity.JobLogLevel;
import com.autoops.portal.repository.JobLogRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobLogService {

    private final JobLogRepository jobLogRepository;

    public JobLogService(
            JobLogRepository jobLogRepository
    ) {
        this.jobLogRepository = jobLogRepository;
    }

    public void info(
            JobEntity job,
            String message
    ) {
        record(
                job,
                JobLogLevel.INFO,
                message
        );
    }

    public void warn(
            JobEntity job,
            String message
    ) {
        record(
                job,
                JobLogLevel.WARN,
                message
        );
    }

    public void error(
            JobEntity job,
            String message
    ) {
        record(
                job,
                JobLogLevel.ERROR,
                message
        );
    }

    public List<JobLogResponse> getAllLogs() {
        return jobLogRepository
                .findAllByOrderByCreatedAtDesc()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public List<JobLogResponse> getLogsByJobId(
            Long jobId
    ) {
        return jobLogRepository
                .findByJobIdOrderByCreatedAtAsc(jobId)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    private void record(
            JobEntity job,
            JobLogLevel level,
            String message
    ) {
        JobLogEntity log =
                new JobLogEntity();

        log.setJob(job);
        log.setLevel(level);
        log.setMessage(message);

        jobLogRepository.save(log);
    }

    private JobLogResponse toResponse(
            JobLogEntity log
    ) {
        JobEntity job = log.getJob();

        return new JobLogResponse(
                log.getId(),
                job.getId(),
                job.getService().getId(),
                job.getService().getName(),
                job.getType(),
                log.getLevel(),
                log.getMessage(),
                log.getCreatedAt()
        );
    }
}