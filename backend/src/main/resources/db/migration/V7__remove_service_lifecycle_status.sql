ALTER TABLE services
DROP CONSTRAINT chk_service_lifecycle_status;

ALTER TABLE services
DROP COLUMN lifecycle_status;