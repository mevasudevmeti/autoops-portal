CREATE TABLE jobs (
                      id BIGSERIAL PRIMARY KEY,

                      service_id BIGINT NOT NULL,

                      type VARCHAR(30) NOT NULL,

                      status VARCHAR(20) NOT NULL DEFAULT 'PENDING',

                      message VARCHAR(1000),

                      created_at TIMESTAMP WITH TIME ZONE
                          NOT NULL DEFAULT CURRENT_TIMESTAMP,

                      started_at TIMESTAMP WITH TIME ZONE,

                      completed_at TIMESTAMP WITH TIME ZONE,

                      CONSTRAINT fk_jobs_service
                          FOREIGN KEY (service_id)
                              REFERENCES services(id),

                      CONSTRAINT chk_job_type
                          CHECK (
                              type IN (
                                       'HEALTH_CHECK',
                                       'RESTART_SERVICE'
                                  )
                              ),

                      CONSTRAINT chk_job_status
                          CHECK (
                              status IN (
                                         'PENDING',
                                         'RUNNING',
                                         'SUCCESS',
                                         'FAILED'
                                  )
                              )
);

CREATE INDEX idx_jobs_service_id
    ON jobs(service_id);

CREATE INDEX idx_jobs_created_at
    ON jobs(created_at DESC);