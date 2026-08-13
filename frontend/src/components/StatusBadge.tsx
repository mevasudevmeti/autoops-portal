import type { ServiceStatus } from '../types'

interface StatusBadgeProps {
  status: ServiceStatus
}

const statusStyles: Record<ServiceStatus, string> = {
  HEALTHY: 'bg-emerald-100 text-emerald-700',
  DEGRADED: 'bg-amber-100 text-amber-700',
  DOWN: 'bg-red-100 text-red-700',
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[status]}`}
    >
      {status}
    </span>
  )
}

export default StatusBadge