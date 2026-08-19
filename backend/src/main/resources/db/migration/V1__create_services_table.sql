CREATE TABLE services (
                          id BIGSERIAL PRIMARY KEY,

                          name VARCHAR(100) NOT NULL,

                          environment VARCHAR(20) NOT NULL,

                          status VARCHAR(20) NOT NULL DEFAULT 'HEALTHY',

                          version VARCHAR(50) NOT NULL,

                          cpu_usage DOUBLE PRECISION NOT NULL DEFAULT 0,

                          memory_usage DOUBLE PRECISION NOT NULL DEFAULT 0,

                          uptime DOUBLE PRECISION NOT NULL DEFAULT 100,

                          CONSTRAINT uk_service_name_environment
                              UNIQUE (name, environment),

                          CONSTRAINT chk_service_environment
                              CHECK (environment IN ('DEV', 'STAGING', 'PROD')),

                          CONSTRAINT chk_service_status
                              CHECK (status IN ('HEALTHY', 'DEGRADED', 'DOWN')),

                          CONSTRAINT chk_cpu_usage
                              CHECK (cpu_usage >= 0 AND cpu_usage <= 100),

                          CONSTRAINT chk_memory_usage
                              CHECK (memory_usage >= 0 AND memory_usage <= 100),

                          CONSTRAINT chk_uptime
                              CHECK (uptime >= 0 AND uptime <= 100)
);