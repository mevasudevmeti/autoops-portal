package com.autoops.portal.controller;

import com.autoops.portal.dto.JobResponse;
import com.autoops.portal.service.HealthCheckService;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/services")
public class ServiceOperationController {

    private final HealthCheckService healthCheckService;

    public ServiceOperationController(
            HealthCheckService healthCheckService
    ) {
        this.healthCheckService =
                healthCheckService;
    }

    @PostMapping("/{id}/health-check")
    public JobResponse runHealthCheck(
            @PathVariable Long id
    ) {
        return healthCheckService
                .runHealthCheck(id);
    }
}