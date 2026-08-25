import { useQuery } from '@tanstack/react-query'
import { getAuditEvents } from '../api/auditApi'
import type {
  AuditAction,
  AuditEvent,
} from '../types'

const actionClasses: Record<
  AuditAction,
  string
> = {
  SERVICE_CREATED:
    'bg-emerald-50 text-emerald-700 ring-emerald-600/20',

  SERVICE_UPDATED:
    'bg-blue-50 text-blue-700 ring-blue-600/20',

  SERVICE_ARCHIVED:
    'bg-slate-100 text-slate-700 ring-slate-600/20',
}

const formatAction = (
  action: AuditAction,
) => {
  switch (action) {
    case 'SERVICE_CREATED':
      return 'Created'

    case 'SERVICE_UPDATED':
      return 'Updated'

    case 'SERVICE_ARCHIVED':
      return 'Archived'

    default:
      return action
  }
}

const formatDate = (
  value: string,
) => {
  return new Date(value).toLocaleString()
}

const AuditPage = () => {
  const {
    data: auditEvents = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['audit-events'],
    queryFn: getAuditEvents,
  })

  return (
    <main className="p-4 sm:p-6 lg:p-8">
      <header>
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          Audit
        </h1>

        <p className="mt-2 text-slate-600">
          Track service configuration changes
          and administrative actions.
        </p>
      </header>

      {isLoading && (
        <div className="mt-8 rounded-xl border border-slate-200 bg-white p-8 text-center">
          <p className="text-sm text-slate-500">
            Loading audit history...
          </p>
        </div>
      )}

      {isError && (
        <div className="mt-8 rounded-xl border border-red-200 bg-red-50 p-8 text-center">
          <p className="text-sm text-red-700">
            Unable to load audit history.
          </p>
        </div>
      )}

      {!isLoading &&
        !isError &&
        auditEvents.length === 0 && (
          <div className="mt-8 rounded-xl border border-slate-200 bg-white p-8 text-center">
            <h2 className="font-semibold text-slate-900">
              No audit events yet
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Service changes will appear here.
            </p>
          </div>
        )}

      {!isLoading &&
        !isError &&
        auditEvents.length > 0 && (
          <div className="mt-8 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px] text-left">
                <thead className="border-b border-slate-200 bg-slate-50">
                  <tr>
                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Service
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Action
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Details
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Time
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {auditEvents.map(
                    (event: AuditEvent) => (
                      <tr
                        key={event.id}
                        className="hover:bg-slate-50"
                      >
                        <td className="px-6 py-4">
                          <p className="font-medium text-slate-900">
                            {event.serviceName ??
                              'System'}
                          </p>

                          {event.serviceId && (
                            <p className="mt-1 text-xs text-slate-500">
                              Service #{event.serviceId}
                            </p>
                          )}
                        </td>

                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${actionClasses[event.action]}`}
                          >
                            {formatAction(
                              event.action,
                            )}
                          </span>
                        </td>

                        <td className="max-w-lg px-6 py-4 text-sm text-slate-600">
                          {event.message}
                        </td>

                        <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600">
                          {formatDate(
                            event.createdAt,
                          )}
                        </td>
                      </tr>
                    ),
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
    </main>
  )
}

export default AuditPage