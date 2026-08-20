import type {
  CreateServiceInput,
  Environment,
  Service,
} from '../types'
import apiClient from './client'

export interface UpdateServiceInput {
  name: string
  environment: Environment
  version: string
}

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

export const updateService = async (
  serviceId: number,
  input: UpdateServiceInput,
): Promise<Service> => {
  const response = await apiClient.put<Service>(
    `/services/${serviceId}`,
    input,
  )

  return response.data
}

export const deleteService = async (
  serviceId: number,
): Promise<void> => {
  await apiClient.delete(
    `/services/${serviceId}`,
  )
}