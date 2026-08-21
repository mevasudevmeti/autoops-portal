import type { Service } from '../types'

interface ServiceActionsProps {
  service: Service
  onHealthCheck: ( serviceId: number ) => Promise<void>
  isHealthChecking?: boolean
}

const ServiceActions = ({
  service,
  onHealthCheck,
  isHealthChecking = false,
}: ServiceActionsProps) => {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() =>
          void onHealthCheck(service.id)
        }
        disabled={isHealthChecking}
        className="rounded-md border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isHealthChecking
          ? 'Checking...'
          : 'Health Check'}
      </button>
    </div>
  )
}

export default ServiceActions