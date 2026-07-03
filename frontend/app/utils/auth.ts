import { api } from './api'
import { ensureCsrfCookie } from './sanctum'

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterPayload {
  name: string
  email: string
  password: string
  password_confirmation: string
}

export async function login(credentials: LoginCredentials) {
  await ensureCsrfCookie()
  const { data } = await api.post('/login', credentials)
  return data
}

export async function register(payload: RegisterPayload) {
  await ensureCsrfCookie()
  const { data } = await api.post('/register', payload)
  return data
}
