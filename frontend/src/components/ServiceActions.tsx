import type { Service } from '../types'

interface ServiceActionsProps {
  service: Service
  onHealthCheck: (serviceId: number) => void
}

const ServiceActions = ({
  service,
  onHealthCheck,
}: ServiceActionsProps) => {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => onHealthCheck(service.id)}
        className="rounded-md border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
      >
        Health Check
      </button>
    </div>
  )
}

export default ServiceActions