ALTER TABLE jobs
DROP CONSTRAINT fk_jobs_service;

ALTER TABLE jobs
    ADD CONSTRAINT fk_jobs_service
        FOREIGN KEY (service_id)
            REFERENCES services(id)
            ON DELETE CASCADE;


ALTER TABLE audit_events
DROP CONSTRAINT fk_audit_events_service;

ALTER TABLE audit_events
    ADD CONSTRAINT fk_audit_events_service
        FOREIGN KEY (service_id)
            REFERENCES services(id)
            ON DELETE CASCADE;