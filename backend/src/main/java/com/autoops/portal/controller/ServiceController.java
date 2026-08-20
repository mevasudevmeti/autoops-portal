package com.autoops.portal.controller;

import com.autoops.portal.dto.CreateServiceRequest;
import com.autoops.portal.dto.ServiceResponse;
import com.autoops.portal.service.ServiceService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import com.autoops.portal.dto.UpdateServiceRequest;
import java.util.List;

@RestController
@RequestMapping("/api/services")
public class ServiceController {

    private final ServiceService serviceService;

    public ServiceController(
            ServiceService serviceService
    ) {
        this.serviceService = serviceService;
    }

    @GetMapping
    public List<ServiceResponse> getAllServices() {
        return serviceService.getAllServices();
    }

    @GetMapping("/{id}")
    public ServiceResponse getServiceById(
            @PathVariable Long id
    ) {
        return serviceService.getServiceById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ServiceResponse createService(
            @Valid @RequestBody CreateServiceRequest request
    ) {
        return serviceService.createService(request);
    }

    @PutMapping("/{id}")
    public ServiceResponse updateService(
            @PathVariable Long id,
            @Valid @RequestBody UpdateServiceRequest request
    ) {
        return serviceService.updateService(id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteService(
            @PathVariable Long id
    ) {
        serviceService.deleteService(id);
    }
}