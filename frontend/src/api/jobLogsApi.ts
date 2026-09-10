import type { JobLog } from '../types'
import apiClient from './client'

export const getJobLogs =
  async (): Promise<JobLog[]> => {
    const response =
      await apiClient.get<JobLog[]>(
        '/job-logs',
      )

    return response.data
  }

export const getJobLogsByJobId = async (
  jobId: number,
): Promise<JobLog[]> => {
  const response =
    await apiClient.get<JobLog[]>(
      `/job-logs/job/${jobId}`,
    )

  return response.data
}