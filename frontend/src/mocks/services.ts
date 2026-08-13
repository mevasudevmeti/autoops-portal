import type { Service } from '../types'

export const mockServices: Service[] = [
  {
    id: 1,
    name: 'payment-api',
    environment: 'PROD',
    status: 'HEALTHY',
    version: '1.4.2',
    cpuUsage: 23,
    memoryUsage: 48,
    uptime: 99.98,
  },
  {
    id: 2,
    name: 'auth-service',
    environment: 'PROD',
    status: 'HEALTHY',
    version: '2.2.0',
    cpuUsage: 16,
    memoryUsage: 35,
    uptime: 99.99,
  },
  {
    id: 3,
    name: 'notification-worker',
    environment: 'STAGING',
    status: 'DEGRADED',
    version: '1.1.8',
    cpuUsage: 72,
    memoryUsage: 68,
    uptime: 98.72,
  },
  {
    id: 4,
    name: 'email-worker',
    environment: 'DEV',
    status: 'DOWN',
    version: '0.8.1',
    cpuUsage: 0,
    memoryUsage: 0,
    uptime: 94.31,
  },
]