import { isAxiosError } from 'axios'

export function parseValidationErrors(error: unknown): Record<string, string> {
  if (!isAxiosError(error) || error.response?.status !== 422) {
    return {}
  }

  const raw = error.response.data?.errors as Record<string, string[]> | undefined

  if (!raw) {
    return {}
  }

  return Object.fromEntries(
    Object.entries(raw).map(([field, messages]) => [field, messages[0] ?? '']),
  )
}
