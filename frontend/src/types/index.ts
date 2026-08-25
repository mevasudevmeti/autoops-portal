export type Environment = 'DEV' | 'STAGING' | 'PROD'

export type ServiceStatus = 'HEALTHY' | 'DEGRADED' | 'DOWN'

export interface Service {
  id: number
  name: string
  environment: Environment
  status: ServiceStatus
  version: string
  healthUrl: string | null
  cpuUsage: number
  memoryUsage: number
  uptime: number
}

export interface CreateServiceInput {
  name: string
  environment: Environment
  version: string
  healthUrl: string | null
}


export type JobType =
  | 'HEALTH_CHECK'
  | 'RESTART_SERVICE'

export type JobStatus =
  | 'PENDING'
  | 'RUNNING'
  | 'SUCCESS'
  | 'FAILED'

export interface Job {
  id: number
  serviceId: number
  serviceName: string
  type: JobType
  status: JobStatus
  message: string | null
  createdAt: string
  startedAt: string | null
  completedAt: string | null
}

export type AuditAction =
  | 'SERVICE_CREATED'
  | 'SERVICE_UPDATED'
  | 'SERVICE_ARCHIVED'

export interface AuditEvent {
  id: number
  serviceId: number | null
  serviceName: string | null
  action: AuditAction
  message: string
  createdAt: string
}