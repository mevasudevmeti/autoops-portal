import { mockServices } from '../mocks/services'

const DashboardPage = () => {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold text-slate-900">
        AutoOps Dashboard
      </h1>

      <p className="mt-2 text-slate-600">
        Monitor services and operational workflows.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {mockServices.map((service) => (
          <div
            key={service.id}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <h2 className="font-semibold text-slate-900">
              {service.name}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {service.environment}
            </p>

            <p className="mt-4 text-sm font-medium">
              {service.status}
            </p>

            <div className="mt-4 text-sm text-slate-600">
              CPU: {service.cpuUsage}%
            </div>

            <div className="text-sm text-slate-600">
              Memory: {service.memoryUsage}%
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}

export default DashboardPage