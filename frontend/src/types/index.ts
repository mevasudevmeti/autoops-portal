export type Environment = 'DEV' | 'STAGING' | 'PROD'

export type ServiceStatus = 'HEALTHY' | 'DEGRADED' | 'DOWN'

export interface Service {
  id: number
  name: string
  environment: Environment
  status: ServiceStatus
  version: string
  cpuUsage: number
  memoryUsage: number
  uptime: number
  healthUrl: string | null
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
  createdAt: string
}