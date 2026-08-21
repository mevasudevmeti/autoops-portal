import type { Job } from '../types'
import apiClient from './client'

export const getJobs = async (): Promise<Job[]> => {
  const response = await apiClient.get<Job[]>(
    '/jobs',
  )

  return response.data
}