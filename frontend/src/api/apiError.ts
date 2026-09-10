import axios from 'axios'

export interface ApiErrorResponse {
  status: number
  error: string
  message: string
  path: string
  timestamp: string
}

export const getApiErrorMessage = (
  error: unknown,
): string => {
  if (axios.isAxiosError<ApiErrorResponse>(error)) {
    return (
      error.response?.data?.message ??
      'An unexpected error occurred.'
    )
  }

  if (error instanceof Error) {
    return error.message
  }

  return 'An unexpected error occurred.'
}