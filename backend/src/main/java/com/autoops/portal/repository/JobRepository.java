package com.autoops.portal.repository;

import com.autoops.portal.entity.JobEntity;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface JobRepository
        extends JpaRepository<JobEntity, Long> {

    @EntityGraph(attributePaths = "service")
    List<JobEntity> findAllByOrderByCreatedAtDesc();
}