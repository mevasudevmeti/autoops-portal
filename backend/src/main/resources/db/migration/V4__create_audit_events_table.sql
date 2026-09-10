CREATE TABLE audit_events (
                              id BIGSERIAL PRIMARY KEY,

                              service_id BIGINT,

                              action VARCHAR(50) NOT NULL,

                              message VARCHAR(1000) NOT NULL,

                              created_at TIMESTAMP WITH TIME ZONE
                                  NOT NULL
                                  DEFAULT CURRENT_TIMESTAMP,

                              CONSTRAINT fk_audit_events_service
                                  FOREIGN KEY (service_id)
                                      REFERENCES services(id),

                              CONSTRAINT chk_audit_action
                                  CHECK (
                                      action IN (
                                      'SERVICE_CREATED',
                                      'SERVICE_UPDATED',
                                      'SERVICE_ARCHIVED'
                                      )
)
    );

CREATE INDEX idx_audit_events_service_id
    ON audit_events(service_id);

CREATE INDEX idx_audit_events_created_at
    ON audit_events(created_at DESC);