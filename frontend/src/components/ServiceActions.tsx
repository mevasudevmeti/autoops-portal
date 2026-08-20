import type { Service } from '../types'

interface ServiceActionsProps {
  service: Service
  onHealthCheck?: (serviceId: number) => void
  onRestart?: (service: Service) => void
}

const ServiceActions = ({
  service,
  onHealthCheck,
  onRestart,
}: ServiceActionsProps) => {
  return (
    <div className="flex items-center gap-2">
        <button
            type="button"
            onClick={() => onHealthCheck?.(service.id)}
            className="rounded-md border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
        >
            Health Check
        </button>
       <button
            type="button"
            onClick={() => onRestart?.(service)}
            className="rounded-md bg-slate-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-slate-800"
        >
            Restart
        </button>
    </div>
  )
}

export default ServiceActions