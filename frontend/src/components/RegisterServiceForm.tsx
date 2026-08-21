import { useState, type SubmitEvent } from 'react'
import type {
  CreateServiceInput,
  Environment,
} from '../types'

interface RegisterServiceFormProps {
  onSubmit: ( service: CreateServiceInput ) => Promise<void>

  onCancel: () => void
  isSubmitting?: boolean
}

interface FormErrors {
  name?: string
  version?: string
  healthUrl?: string
}

const RegisterServiceForm = ({
  onSubmit,
  onCancel,
  isSubmitting = false,
}: RegisterServiceFormProps) => {
    const [name, setName] = useState('')
    const [environment, setEnvironment] = useState<Environment>('DEV')
    const [version, setVersion] = useState('')
    const [healthUrl, setHealthUrl] = useState('')
    const [errors, setErrors] = useState<FormErrors>({})
    const validateForm = () => {
        const newErrors: FormErrors = {}

        if (!name.trim()) {
            newErrors.name = 'Service name is required.'
        }

        if (!version.trim()) {
            newErrors.version = 'Version is required.'
        }
        if (!healthUrl.trim()) {
            newErrors.healthUrl =
              'Health URL is required.'
          } else if (
            !/^https?:\/\/.+/.test(
              healthUrl.trim(),
            )
          ) {
            newErrors.healthUrl =
              'Enter a valid HTTP or HTTPS URL.'
          }

        setErrors(newErrors)

        return Object.keys(newErrors).length === 0
    }
    const handleSubmit = async ( event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault()

        const isValid = validateForm()

        if (!isValid) {
          return
        }

        try {
          await onSubmit({
            name: name.trim(),
            environment,
            version: version.trim(),
            healthUrl: healthUrl.trim() || null,
          })

          setName('')
          setEnvironment('DEV')
          setVersion('')
          setHealthUrl('')
          setErrors({})
        } catch {
          // Parent handles the API error.
        }
      }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div>
        <h2 className="text-lg font-semibold text-slate-900">
          Register Service
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Add a service to the AutoOps registry.
        </p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div>
          <label
            htmlFor="service-name"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Service name
          </label>

          <input
            id="service-name"
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
            placeholder="payment-api"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={
                errors.name
                ? 'service-name-error'
                : undefined
            }
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
            />

            {errors.name && (
            <p
                id="service-name-error"
                className="mt-1 text-sm text-red-600"
            >
                {errors.name}
            </p>
            )}
        </div>

        <div>
          <label
            htmlFor="service-environment"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Environment
          </label>

          <select
            id="service-environment"
            value={environment}
            onChange={(event) =>
              setEnvironment(
                event.target.value as Environment,
              )
            }
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
          >
            <option value="DEV">Development</option>
            <option value="STAGING">Staging</option>
            <option value="PROD">Production</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="service-version"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Version
          </label>

          <input
            id="service-version"
            type="text"
            value={version}
            aria-invalid={Boolean(errors.version)}
            aria-describedby={
            errors.version
                ? 'service-version-error'
                : undefined
            }
            onChange={(event) => {
                setVersion(event.target.value)

                if (errors.version) {
                    setErrors((currentErrors) => ({
                    ...currentErrors,
                    version: undefined,
                    }))
                }
                }}
            placeholder="1.0.0"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
          />
          {errors.version && (
             <p
                id="service-version-error"
                className="mt-1 text-sm text-red-600"
            >
                {errors.version}
            </p>
            )}
        </div>
        <div>
          <label
            htmlFor="service-health-url"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Health URL
          </label>

          <input
            id="service-health-url"
            type="url"
            value={healthUrl}
            onChange={(event) => {
              setHealthUrl(event.target.value)

              if (errors.healthUrl) {
                setErrors((currentErrors) => ({
                  ...currentErrors,
                  healthUrl: undefined,
                }))
              }
            }}
            placeholder="http://localhost:8080/actuator/health"
            aria-invalid={
              Boolean(errors.healthUrl)
            }
            aria-describedby={
              errors.healthUrl
                ? 'service-health-url-error'
                : undefined
            }
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
          />

          {errors.healthUrl && (
            <p
              id="service-health-url-error"
              className="mt-1 text-sm text-red-600"
            >
              {errors.healthUrl}
            </p>
          )}
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting
            ? 'Registering...'
            : 'Register Service'}
        </button>
      </div>
    </form>
  )
}

export default RegisterServiceForm