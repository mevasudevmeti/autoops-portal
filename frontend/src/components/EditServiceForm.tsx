import { useState, type SubmitEvent } from 'react'
import type { UpdateServiceInput } from '../api/servicesApi'
import type {
  Environment,
  Service,
} from '../types'

interface EditServiceFormProps {
  service: Service

  onSubmit: (
    serviceId: number,
    input: UpdateServiceInput,
  ) => Promise<void>

  onCancel: () => void

  isSubmitting?: boolean
}

interface FormErrors {
  name?: string
  version?: string
}

const EditServiceForm = ({
  service,
  onSubmit,
  onCancel,
  isSubmitting = false,
}: EditServiceFormProps) => {
  const [name, setName] = useState(service.name)

  const [environment, setEnvironment] =
    useState<Environment>(service.environment)

  const [version, setVersion] =
    useState(service.version)

  const [errors, setErrors] =
    useState<FormErrors>({})

  const validateForm = () => {
    const newErrors: FormErrors = {}

    if (!name.trim()) {
      newErrors.name = 'Service name is required.'
    }

    if (!version.trim()) {
      newErrors.version = 'Version is required.'
    }

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (
    event: SubmitEvent<HTMLFormElement>,
  ) => {
    event.preventDefault()

    const isValid = validateForm()

    if (!isValid) {
      return
    }

    try {
      await onSubmit(service.id, {
        name: name.trim(),
        environment,
        version: version.trim(),
      })
    } catch {
      // The parent mutation can display the API error.
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div>
        <h2 className="text-lg font-semibold text-slate-900">
          Edit Service
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Update service registration details.
        </p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div>
          <label
            htmlFor="edit-service-name"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Service name
          </label>

          <input
            id="edit-service-name"
            type="text"
            value={name}
            onChange={(event) => {
              setName(event.target.value)

              if (errors.name) {
                setErrors((currentErrors) => ({
                  ...currentErrors,
                  name: undefined,
                }))
              }
            }}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={
              errors.name
                ? 'edit-service-name-error'
                : undefined
            }
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
          />

          {errors.name && (
            <p
              id="edit-service-name-error"
              className="mt-1 text-sm text-red-600"
            >
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="edit-service-environment"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Environment
          </label>

          <select
            id="edit-service-environment"
            value={environment}
            onChange={(event) =>
              setEnvironment(
                event.target.value as Environment,
              )
            }
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
          >
            <option value="DEV">
              Development
            </option>

            <option value="STAGING">
              Staging
            </option>

            <option value="PROD">
              Production
            </option>
          </select>
        </div>

        <div>
          <label
            htmlFor="edit-service-version"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Version
          </label>

          <input
            id="edit-service-version"
            type="text"
            value={version}
            onChange={(event) => {
              setVersion(event.target.value)

              if (errors.version) {
                setErrors((currentErrors) => ({
                  ...currentErrors,
                  version: undefined,
                }))
              }
            }}
            aria-invalid={Boolean(errors.version)}
            aria-describedby={
              errors.version
                ? 'edit-service-version-error'
                : undefined
            }
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
          />

          {errors.version && (
            <p
              id="edit-service-version-error"
              className="mt-1 text-sm text-red-600"
            >
              {errors.version}
            </p>
          )}
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting
            ? 'Saving...'
            : 'Save Changes'}
        </button>
      </div>
    </form>
  )
}

export default EditServiceForm