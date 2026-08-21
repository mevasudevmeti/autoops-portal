ALTER TABLE services
    ADD COLUMN health_url VARCHAR(500);

ALTER TABLE services
    ADD CONSTRAINT chk_service_health_url
        CHECK (
            health_url IS NULL
                OR health_url ~ '^https?://'
    );