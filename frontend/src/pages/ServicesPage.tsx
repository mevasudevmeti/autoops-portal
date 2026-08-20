import { useState } from 'react'
import ServiceTable from '../components/ServiceTable'
import type {
  CreateServiceInput,
  Environment,
  Job,
  Service,
  ServiceStatus,
} from '../types'
import RegisterServiceForm from '../components/RegisterServiceForm'
import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'

import {
  createService,
  getServices,
} from '../api/servicesApi'

type EnvironmentFilter = 'ALL' | Environment
type StatusFilter = 'ALL' | ServiceStatus

const ServicesPage = () => {
    const [jobs, setJobs] = useState<Job[]>([])
    const [isRegistering, setIsRegistering] = useState(false)
    
    const [searchTerm, setSearchTerm] = useState('')
    const [environment, setEnvironment] = useState<EnvironmentFilter>('ALL')
    const [status, setStatus] = useState<StatusFilter>('ALL')
    const queryClient = useQueryClient()

    const { data: services = [], isLoading, isError } = useQuery({
            queryKey: ['services'],
            queryFn: getServices,
          })

          const createServiceMutation = useMutation({
        mutationFn: createService,

        onSuccess: async () => {
          await queryClient.invalidateQueries({
            queryKey: ['services'],
          })

          setIsRegistering(false)
        },
      })

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

  
  const handleRegisterService = async (
      input: CreateServiceInput,
    ) => {
      await createServiceMutation.mutateAsync(input)
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
              isSubmitting={
                createServiceMutation.isPending
              }
            />
        )}
        {createServiceMutation.isError && (
          <p className="mt-3 text-sm text-red-600">
            Unable to register service. Please check the
            details and try again.
          </p>
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
        {isLoading && (
          <div className="rounded-xl border border-slate-200 bg-white p-8 text-center">
            <p className="text-sm text-slate-500">
              Loading services...
            </p>
          </div>
        )}

        {isError && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-8 text-center">
            <p className="text-sm text-red-700">
              Unable to load services.
            </p>
          </div>
        )}

        {!isLoading && !isError && (
          <ServiceTable services={filteredServices} />
        )}
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