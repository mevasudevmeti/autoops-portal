import MetricCard from '../components/MetricCard'
import ServiceTable from '../components/ServiceTable'
import { mockServices } from '../mocks/services'

const DashboardPage = () => {
  const totalServices = mockServices.length

  const healthyServices = mockServices.filter(
    (service) => service.status === 'HEALTHY',
  ).length

  const degradedServices = mockServices.filter(
    (service) => service.status === 'DEGRADED',
  ).length

  const downServices = mockServices.filter(
    (service) => service.status === 'DOWN',
  ).length

  return (
    <main className="p-4 sm:p-6 lg:p-8">
      <header>
        <h1 className="text-3xl font-bold text-slate-900">
          AutoOps Dashboard
        </h1>

        <p className="mt-2 text-slate-600">
          Monitor services and operational workflows.
        </p>
      </header>

      <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          title="Total Services"
          value={totalServices}
          description="Registered services"
        />

        <MetricCard
          title="Healthy"
          value={healthyServices}
          description="Operating normally"
        />

        <MetricCard
          title="Degraded"
          value={degradedServices}
          description="Require attention"
        />

        <MetricCard
          title="Down"
          value={downServices}
          description="Currently unavailable"
        />
      </section>

      <section className="mt-10">
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-slate-900">
            Services
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Current status of registered applications.
          </p>
        </div>
        <ServiceTable services={mockServices} />
      </section>
    </main>
  )
}

export default DashboardPage