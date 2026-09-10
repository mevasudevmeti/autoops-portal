package com.autoops.portal.exception;

public class ServiceNotFoundException extends RuntimeException {

    public ServiceNotFoundException(Long serviceId) {
        super("Service not found with id: " + serviceId);
    }
}