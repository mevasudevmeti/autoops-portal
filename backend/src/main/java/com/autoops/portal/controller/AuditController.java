package com.autoops.portal.controller;

import com.autoops.portal.dto.AuditEventResponse;
import com.autoops.portal.service.AuditService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/audit-events")
public class AuditController {

    private final AuditService auditService;

    public AuditController(
            AuditService auditService
    ) {
        this.auditService = auditService;
    }

    @GetMapping
    public List<AuditEventResponse>
    getAllAuditEvents() {
        return auditService
                .getAllAuditEvents();
    }
}