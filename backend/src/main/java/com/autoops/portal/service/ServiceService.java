package com.autoops.portal.service;

import com.autoops.portal.dto.CreateServiceRequest;
import com.autoops.portal.dto.ServiceResponse;
import com.autoops.portal.entity.ServiceEntity;
import com.autoops.portal.entity.ServiceStatus;
import com.autoops.portal.exception.DuplicateServiceException;
import com.autoops.portal.exception.ServiceNotFoundException;
import com.autoops.portal.repository.ServiceRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServiceService {

    private final ServiceRepository serviceRepository;

    public ServiceService(
            ServiceRepository serviceRepository
    ) {
        this.serviceRepository = serviceRepository;
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

        ServiceEntity savedService =
                serviceRepository.save(service);

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
                service.getCpuUsage(),
                service.getMemoryUsage(),
                service.getUptime()
        );
    }
}