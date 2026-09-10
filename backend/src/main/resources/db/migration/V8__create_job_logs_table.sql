CREATE TABLE job_logs (
                          id BIGSERIAL PRIMARY KEY,

                          job_id BIGINT NOT NULL,

                          level VARCHAR(20) NOT NULL,

                          message VARCHAR(2000) NOT NULL,

                          created_at TIMESTAMP WITH TIME ZONE
                              NOT NULL
                              DEFAULT CURRENT_TIMESTAMP,

                          CONSTRAINT fk_job_logs_job
                              FOREIGN KEY (job_id)
                                  REFERENCES jobs(id)
                                  ON DELETE CASCADE,

                          CONSTRAINT chk_job_log_level
                              CHECK (
                                  level IN (
                                            'INFO',
                                            'WARN',
                                            'ERROR'
                                      )
                                  )
);

CREATE INDEX idx_job_logs_job_id
    ON job_logs(job_id);

CREATE INDEX idx_job_logs_created_at
    ON job_logs(created_at DESC);