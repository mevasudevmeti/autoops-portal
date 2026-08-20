import type {
  CreateServiceInput,
  Service,
} from '../types'
import apiClient from './client'

export const getServices = async (): Promise<Service[]> => {
  const response = await apiClient.get<Service[]>(
    '/services',
  )

  return response.data
}

export const createService = async (
  input: CreateServiceInput,
): Promise<Service> => {
  const response = await apiClient.post<Service>(
    '/services',
    input,
  )

  return response.data
}