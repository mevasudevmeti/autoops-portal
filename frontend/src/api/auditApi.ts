import type { AuditEvent } from '../types'
import apiClient from './client'

export const getAuditEvents =
  async (): Promise<AuditEvent[]> => {
    const response =
      await apiClient.get<AuditEvent[]>(
        '/audit-events',
      )

    return response.data
  }