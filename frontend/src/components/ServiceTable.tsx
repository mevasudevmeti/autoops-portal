import type { Service } from '../types'
import StatusBadge from './StatusBadge'

interface ServiceTableProps {
  services: Service[]
}

const ServiceTable = ({ services }: ServiceTableProps) => {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left">
          <thead className="border-b border-slate-200 bg-slate-50">
            <tr>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Service
              </th>

              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Environment
              </th>

              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Status
              </th>

              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Version
              </th>

              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                CPU
              </th>

              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Memory
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {services.map((service) => (
              <tr
                key={service.id}
                className="transition-colors hover:bg-slate-50"
              >
                <td className="px-6 py-4">
                  <p className="font-medium text-slate-900">
                    {service.name}
                  </p>
                </td>

                <td className="px-6 py-4 text-sm text-slate-600">
                  {service.environment}
                </td>

                <td className="px-6 py-4">
                  <StatusBadge status={service.status} />
                </td>

                <td className="px-6 py-4 text-sm text-slate-600">
                  {service.version}
                </td>

                <td className="px-6 py-4 text-sm text-slate-600">
                  {service.cpuUsage}%
                </td>

                <td className="px-6 py-4 text-sm text-slate-600">
                  {service.memoryUsage}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ServiceTable