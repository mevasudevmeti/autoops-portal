package com.autoops.portal.dto;

import com.autoops.portal.entity.Environment;
import com.autoops.portal.entity.ServiceStatus;

public class ServiceResponse {

    private Long id;
    private String name;
    private Environment environment;
    private ServiceStatus status;
    private String version;
    private double cpuUsage;
    private double memoryUsage;
    private double uptime;

    public ServiceResponse(
            Long id,
            String name,
            Environment environment,
            ServiceStatus status,
            String version,
            double cpuUsage,
            double memoryUsage,
            double uptime
    ) {
        this.id = id;
        this.name = name;
        this.environment = environment;
        this.status = status;
        this.version = version;
        this.cpuUsage = cpuUsage;
        this.memoryUsage = memoryUsage;
        this.uptime = uptime;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public Environment getEnvironment() {
        return environment;
    }

    public ServiceStatus getStatus() {
        return status;
    }

    public String getVersion() {
        return version;
    }

    public double getCpuUsage() {
        return cpuUsage;
    }

    public double getMemoryUsage() {
        return memoryUsage;
    }

    public double getUptime() {
        return uptime;
    }
}