import { useQuery } from '@tanstack/react-query'
import { getJobs } from '../api/jobsApi'
import type {
  Job,
  JobStatus,
} from '../types'

const statusClasses: Record<
  JobStatus,
  string
> = {
  PENDING:
    'bg-amber-50 text-amber-700 ring-amber-600/20',

  RUNNING:
    'bg-blue-50 text-blue-700 ring-blue-600/20',

  SUCCESS:
    'bg-emerald-50 text-emerald-700 ring-emerald-600/20',

  FAILED:
    'bg-red-50 text-red-700 ring-red-600/20',
}

const formatDate = (
  value: string | null,
) => {
  if (!value) {
    return '—'
  }

  return new Date(value).toLocaleString()
}

const formatJobType = (
  type: Job['type'],
) => {
  switch (type) {
    case 'HEALTH_CHECK':
      return 'Health Check'

    case 'RESTART_SERVICE':
      return 'Restart Service'

    default:
      return type
  }
}

const JobsPage = () => {
  const {
    data: jobs = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['jobs'],
    queryFn: getJobs,
  })

  return (
    <main className="p-4 sm:p-6 lg:p-8">
      <header>
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          Jobs
        </h1>

        <p className="mt-2 text-slate-600">
          View operational jobs and workflow
          history.
        </p>
      </header>

      {isLoading && (
        <div className="mt-8 rounded-xl border border-slate-200 bg-white p-8 text-center">
          <p className="text-sm text-slate-500">
            Loading jobs...
          </p>
        </div>
      )}

      {isError && (
        <div className="mt-8 rounded-xl border border-red-200 bg-red-50 p-8 text-center">
          <p className="text-sm text-red-700">
            Unable to load jobs.
          </p>
        </div>
      )}

      {!isLoading &&
        !isError &&
        jobs.length === 0 && (
          <div className="mt-8 rounded-xl border border-slate-200 bg-white p-8 text-center">
            <h2 className="font-semibold text-slate-900">
              No jobs yet
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Operational jobs will appear here
              after actions are executed.
            </p>
          </div>
        )}

      {!isLoading &&
        !isError &&
        jobs.length > 0 && (
          <div className="mt-8 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] text-left">
                <thead className="border-b border-slate-200 bg-slate-50">
                  <tr>
                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Service
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Operation
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Status
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Message
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Started
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Completed
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {jobs.map((job) => (
                    <tr
                      key={job.id}
                      className="hover:bg-slate-50"
                    >
                      <td className="px-6 py-4">
                        <p className="font-medium text-slate-900">
                          {job.serviceName}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          Job #{job.id}
                        </p>
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-600">
                        {formatJobType(job.type)}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${statusClasses[job.status]}`}
                        >
                          {job.status}
                        </span>
                      </td>

                      <td className="max-w-xs px-6 py-4 text-sm text-slate-600">
                        {job.message ?? '—'}
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-600">
                        {formatDate(
                          job.startedAt,
                        )}
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-600">
                        {formatDate(
                          job.completedAt,
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
    </main>
  )
}

export default JobsPage