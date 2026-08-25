package com.autoops.portal.service;

import com.autoops.portal.dto.AuditEventResponse;
import com.autoops.portal.entity.AuditAction;
import com.autoops.portal.entity.AuditEventEntity;
import com.autoops.portal.entity.ServiceEntity;
import com.autoops.portal.repository.AuditEventRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuditService {

    private final AuditEventRepository auditEventRepository;

    public AuditService(
            AuditEventRepository auditEventRepository
    ) {
        this.auditEventRepository =
                auditEventRepository;
    }

    public void recordServiceEvent(
            ServiceEntity service,
            AuditAction action,
            String message
    ) {
        AuditEventEntity event =
                new AuditEventEntity();

        event.setService(service);
        event.setAction(action);
        event.setMessage(message);

        auditEventRepository.save(event);
    }

    public List<AuditEventResponse>
    getAllAuditEvents() {

        return auditEventRepository
                .findAllByOrderByCreatedAtDesc()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    private AuditEventResponse toResponse(
            AuditEventEntity event
    ) {
        ServiceEntity service =
                event.getService();

        return new AuditEventResponse(
                event.getId(),
                service != null
                        ? service.getId()
                        : null,
                service != null
                        ? service.getName()
                        : null,
                event.getAction(),
                event.getMessage(),
                event.getCreatedAt()
        );
    }
}