ALTER TABLE services
    ADD COLUMN lifecycle_status VARCHAR(20)
        NOT NULL
        DEFAULT 'ACTIVE';

ALTER TABLE services
    ADD CONSTRAINT chk_service_lifecycle_status
        CHECK (
            lifecycle_status IN (
                                 'ACTIVE',
                                 'ARCHIVED'
                )
            );