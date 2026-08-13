import { useState } from 'react'
import ServiceTable from '../components/ServiceTable'
import { mockServices } from '../mocks/services'
import type {
  CreateServiceInput,
  Environment,
  Job,
  Service,
  ServiceStatus,
} from '../types'
import RegisterServiceForm from '../components/RegisterServiceForm'

type EnvironmentFilter = 'ALL' | Environment
type StatusFilter = 'ALL' | ServiceStatus

const ServicesPage = () => {
    const [jobs, setJobs] = useState<Job[]>([])
    const [isRegistering, setIsRegistering] = useState(false)
    const [services, setServices] = useState<Service[]>(mockServices)
    const [searchTerm, setSearchTerm] = useState('')
    const [environment, setEnvironment] = useState<EnvironmentFilter>('ALL')
    const [status, setStatus] = useState<StatusFilter>('ALL')

    const filteredServices = services.filter((service) => {
    const matchesSearch = service.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase())

    const matchesEnvironment =
      environment === 'ALL' ||
      service.environment === environment

    const matchesStatus =
      status === 'ALL' ||
      service.status === status

    return (
      matchesSearch &&
      matchesEnvironment &&
      matchesStatus
    )
  })

  const handleRestart = (service: Service) => {
    const newJob: Job = {
        id: Date.now(),
        serviceId: service.id,
        serviceName: service.name,
        type: 'RESTART_SERVICE',
        status: 'PENDING',
        createdAt: new Date().toISOString(),
    }

    setJobs((currentJobs) => [
        newJob,
        ...currentJobs,
    ])
    }

// temporary function to handle health check, in a real application this would likely involve an API call
  const handleHealthCheck = (serviceId: number) => {
    setServices((currentServices) =>
        currentServices.map((service) =>
        service.id === serviceId
            ? {
                ...service,
                status: 'HEALTHY',
            }
            : service,
        ),
    )
    }

  // temporary function to handle service registration, in a real application this would likely involve an API call
  const handleRegisterService = (
  input: CreateServiceInput,
) => {
  setServices((currentServices) => {
    const nextId =
      Math.max(
        0,
        ...currentServices.map(
          (service) => service.id,
        ),
      ) + 1

    const newService: Service = {
      id: nextId,
      name: input.name,
      environment: input.environment,
      version: input.version,
      status: 'HEALTHY',
      cpuUsage: 0,
      memoryUsage: 0,
      uptime: 100,
    }

    return [
      ...currentServices,
      newService,
    ]
  })

  setIsRegistering(false)
}

  const handleClearFilters = () => {
    setSearchTerm('')
    setEnvironment('ALL')
    setStatus('ALL')
  }

  return (
    <main className="p-4 sm:p-6 lg:p-8">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
                <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                    Services
                </h1>
                <p className="mt-2 text-slate-600">
                    Manage and monitor registered services.
                </p>
            </div>

            <button
                type="button"
                onClick={() => setIsRegistering(true)}
                className="self-start rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 sm:self-auto"
            >
                Register Service
            </button>
        </header>
        {isRegistering && (
            <RegisterServiceForm
                onSubmit={handleRegisterService}
                onCancel={() =>
                setIsRegistering(false)
                }
            />
        )}

      <section className="mt-8 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="grid gap-4 md:grid-cols-4">
          <div className="md:col-span-2">
            <label
              htmlFor="service-search"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Search
            </label>

            <input
              id="service-search"
              type="text"
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(event.target.value)
              }
              placeholder="Search services..."
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
            />
          </div>

          <div>
            <label
              htmlFor="environment-filter"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Environment
            </label>

            <select
              id="environment-filter"
              value={environment}
              onChange={(event) =>
                setEnvironment(
                  event.target.value as EnvironmentFilter,
                )
              }
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
            >
              <option value="ALL">All</option>
              <option value="DEV">Development</option>
              <option value="STAGING">Staging</option>
              <option value="PROD">Production</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="status-filter"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Status
            </label>

            <select
              id="status-filter"
              value={status}
              onChange={(event) =>
                setStatus(
                  event.target.value as StatusFilter,
                )
              }
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
            >
              <option value="ALL">All</option>
              <option value="HEALTHY">Healthy</option>
              <option value="DEGRADED">Degraded</option>
              <option value="DOWN">Down</option>
            </select>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-slate-500">
            Showing {filteredServices.length} of{' '}
            {services.length} services
          </p>

          <button
            type="button"
            onClick={handleClearFilters}
            className="text-sm font-medium text-slate-600 hover:text-slate-900"
          >
            Clear filters
          </button>
        </div>
      </section>

      <section className="mt-6">
        <ServiceTable
            services={filteredServices}
            showActions
            onHealthCheck={handleHealthCheck}
            onRestart={handleRestart}
        />
        {jobs.length > 0 && (
        <section className="mt-8">
            <h2 className="text-lg font-semibold text-slate-900">
            Recent Jobs
            </h2>

            <div className="mt-4 space-y-3">
            {jobs.map((job) => (
                <div
                key={job.id}
                className="flex flex-col gap-2 rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between"
                >
                <div>
                    <p className="font-medium text-slate-900">
                    {job.serviceName}
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                    {job.type}
                    </p>
                </div>

                <span className="text-sm font-semibold text-amber-600">
                    {job.status}
                </span>
                </div>
            ))}
            </div>
        </section>
        )}
      </section>
    </main>
  )
}

export default ServicesPage