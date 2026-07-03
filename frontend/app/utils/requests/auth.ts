import type { LoginCredentials, RegisterPayload } from '~/types/auth'
import type { User } from '~/types/user'
import { api } from '~/utils/api'
import { ensureCsrfCookie } from '~/utils/sanctum'

export async function login(credentials: LoginCredentials) {
  await ensureCsrfCookie()
  const { data } = await api.post<User>('/login', credentials)
  return data
}

export async function register(payload: RegisterPayload) {
  await ensureCsrfCookie()
  const { data } = await api.post<User>('/register', payload)
  return data
}

export async function fetchUser() {
  const { data } = await api.get<User>('/user')
  return data
}

export async function logout() {
  await ensureCsrfCookie()
  await api.post('/logout')
}
