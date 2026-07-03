import { isAxiosError } from 'axios'

export async function redirectToLoginIfUnauthorized(error: unknown) {
  if (isAxiosError(error) && error.response?.status === 401) {
    await navigateTo('/login')
    return true
  }

  return false
}
