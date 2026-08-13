import { useState } from 'react'
import type {
  CreateServiceInput,
  Environment,
} from '../types'

interface RegisterServiceFormProps {
  onSubmit: (service: CreateServiceInput) => void
  onCancel: () => void
}

const RegisterServiceForm = ({
  onSubmit,
  onCancel,
}: RegisterServiceFormProps) => {
  const [name, setName] = useState('')
  const [environment, setEnvironment] =
    useState<Environment>('DEV')
  const [version, setVersion] = useState('')

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault()

    const trimmedName = name.trim()
    const trimmedVersion = version.trim()

    if (!trimmedName || !trimmedVersion) {
      return
    }

    onSubmit({
      name: trimmedName,
      environment,
      version: trimmedVersion,
    })

    setName('')
    setEnvironment('DEV')
    setVersion('')
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

      <div className="mt-6 grid gap-4 md:grid-cols-3">
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
            onChange={(event) =>
              setName(event.target.value)
            }
            placeholder="payment-api"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
          />
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
            onChange={(event) =>
              setVersion(event.target.value)
            }
            placeholder="1.0.0"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
          />
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
          className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
        >
          Register Service
        </button>
      </div>
    </form>
  )
}

export default RegisterServiceForm