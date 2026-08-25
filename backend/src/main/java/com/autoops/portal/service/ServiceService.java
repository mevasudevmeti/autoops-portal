package com.autoops.portal.service;

import com.autoops.portal.dto.CreateServiceRequest;
import com.autoops.portal.dto.ServiceResponse;
import com.autoops.portal.entity.ServiceEntity;
import com.autoops.portal.entity.ServiceStatus;
import com.autoops.portal.exception.DuplicateServiceException;
import com.autoops.portal.exception.ServiceNotFoundException;
import com.autoops.portal.repository.ServiceRepository;
import org.springframework.stereotype.Service;
import com.autoops.portal.dto.UpdateServiceRequest;
import com.autoops.portal.entity.AuditAction;
import java.util.List;

@Service
public class ServiceService {

    private final ServiceRepository serviceRepository;
    private final AuditService auditService;

    public ServiceService(
            ServiceRepository serviceRepository,
            AuditService auditService
    ) {
        this.serviceRepository = serviceRepository;
        this.auditService = auditService;
    }

    public List<ServiceResponse> getAllServices() {
        return serviceRepository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public ServiceResponse getServiceById(Long id) {
        ServiceEntity service = serviceRepository
                .findById(id)
                .orElseThrow(
                        () -> new ServiceNotFoundException(id)
                );

        return toResponse(service);
    }

    public ServiceResponse createService(
            CreateServiceRequest request
    ) {
        String normalizedName = request
                .getName()
                .trim();

        String normalizedVersion = request
                .getVersion()
                .trim();

        String normalizedHealthUrl = request
                .getHealthUrl()
                .trim();

        boolean alreadyExists =
                serviceRepository.existsByNameAndEnvironment(
                        normalizedName,
                        request.getEnvironment()
                );

        if (alreadyExists) {
            throw new DuplicateServiceException(
                    normalizedName,
                    request.getEnvironment()
            );
        }

        ServiceEntity service = new ServiceEntity();

        service.setName(normalizedName);
        service.setEnvironment(request.getEnvironment());
        service.setVersion(normalizedVersion);
        service.setStatus(ServiceStatus.HEALTHY);
        service.setCpuUsage(0.0);
        service.setMemoryUsage(0.0);
        service.setUptime(100.0);
        service.setHealthUrl(normalizedHealthUrl);


        ServiceEntity savedService =
                serviceRepository.save(service);
        auditService.recordServiceEvent(
                savedService,
                AuditAction.SERVICE_CREATED,
                "Service "
                        + savedService.getName()
                        + " registered"
        );

        return toResponse(savedService);
    }

    private ServiceResponse toResponse(
            ServiceEntity service
    ) {
        return new ServiceResponse(
                service.getId(),
                service.getName(),
                service.getEnvironment(),
                service.getStatus(),
                service.getVersion(),
                service.getHealthUrl(),
                service.getCpuUsage(),
                service.getMemoryUsage(),
                service.getUptime()
        );
    }

    public ServiceResponse updateService(
            Long id,
            UpdateServiceRequest request
    ) {
        ServiceEntity service = serviceRepository
                .findById(id)
                .orElseThrow(
                        () -> new ServiceNotFoundException(id)
                );
        String oldName = service.getName();
        String oldVersion = service.getVersion();
        String oldHealthUrl = service.getHealthUrl();
        var oldEnvironment = service.getEnvironment();
        String normalizedName = request.getName().trim();
        String normalizedVersion = request.getVersion().trim();
        String normalizedHealthUrl = request.getHealthUrl().trim();
        boolean duplicate =
                serviceRepository.existsByNameAndEnvironmentAndIdNot(
                        normalizedName,
                        request.getEnvironment(),
                        id
                );

        if (duplicate) {
            throw new DuplicateServiceException(
                    normalizedName,
                    request.getEnvironment()
            );
        }
        StringBuilder changes =
                new StringBuilder();
        if (!oldName.equals(normalizedName)) {
            changes.append(
                    "name: "
                            + oldName
                            + " -> "
                            + normalizedName
                            + "; "
            );
        }

        if (
                oldEnvironment
                        != request.getEnvironment()
        ) {
            changes.append(
                    "environment: "
                            + oldEnvironment
                            + " -> "
                            + request.getEnvironment()
                            + "; "
            );
        }

        if (
                !oldVersion.equals(
                        normalizedVersion
                )
        ) {
            changes.append(
                    "version: "
                            + oldVersion
                            + " -> "
                            + normalizedVersion
                            + "; "
            );
        }

        if (
                oldHealthUrl == null
                        || !oldHealthUrl.equals(
                        normalizedHealthUrl
                )
        ) {
            changes.append(
                    "healthUrl: "
                            + oldHealthUrl
                            + " -> "
                            + normalizedHealthUrl
                            + "; "
            );
        }
        service.setName(normalizedName);
        service.setEnvironment(request.getEnvironment());
        service.setVersion(normalizedVersion);
        service.setHealthUrl(normalizedHealthUrl);
        ServiceEntity updated =
                serviceRepository.save(service);
        String auditMessage =
                changes.length() > 0
                        ? "Service "
                        + updated.getName()
                        + " updated: "
                        + changes
                        : "Service "
                        + updated.getName()
                        + " updated with no field changes";

        auditService.recordServiceEvent(
                updated,
                AuditAction.SERVICE_UPDATED,
                auditMessage
        );

        return toResponse(updated);
    }

    public void deleteService(Long id) {
        ServiceEntity service = serviceRepository
                .findById(id)
                .orElseThrow(
                        () -> new ServiceNotFoundException(id)
                );

        serviceRepository.delete(service);
    }
}