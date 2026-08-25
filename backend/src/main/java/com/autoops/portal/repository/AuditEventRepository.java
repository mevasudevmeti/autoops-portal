package com.autoops.portal.repository;

import com.autoops.portal.entity.AuditEventEntity;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AuditEventRepository
        extends JpaRepository<AuditEventEntity, Long> {

    @EntityGraph(attributePaths = "service")
    List<AuditEventEntity>
    findAllByOrderByCreatedAtDesc();
}