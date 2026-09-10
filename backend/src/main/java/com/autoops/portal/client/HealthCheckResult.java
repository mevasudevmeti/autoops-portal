package com.autoops.portal.client;

public record HealthCheckResult(
        boolean healthy,
        Integer statusCode,
        String message
) {
}