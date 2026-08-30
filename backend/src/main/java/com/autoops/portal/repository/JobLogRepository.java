package com.autoops.portal.repository;

import com.autoops.portal.entity.JobLogEntity;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface JobLogRepository
        extends JpaRepository<JobLogEntity, Long> {

    @EntityGraph(
            attributePaths = {
                    "job",
                    "job.service"
            }
    )
    List<JobLogEntity>
    findAllByOrderByCreatedAtDesc();

    @EntityGraph(
            attributePaths = {
                    "job",
                    "job.service"
            }
    )
    List<JobLogEntity>
    findByJobIdOrderByCreatedAtAsc(
            Long jobId
    );
}