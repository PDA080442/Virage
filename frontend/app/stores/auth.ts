import { defineStore } from 'pinia'
import { api } from '~/utils/api'
import {
  login as loginRequest,
  register as registerRequest,
  type LoginCredentials,
  type RegisterPayload,
} from '~/utils/auth'
import { ensureCsrfCookie } from '~/utils/sanctum'

export interface User {
  id: number
  name: string
  email: string
  email_verified_at: string | null
  created_at: string
  updated_at: string
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
  }),

  getters: {
    isAuthenticated: (state) => state.user !== null,
  },

  actions: {
    async register(payload: RegisterPayload) {
      this.user = await registerRequest(payload)
      return this.user
    },

    async login(credentials: LoginCredentials) {
      this.user = await loginRequest(credentials)
      return this.user
    },

    async logout() {
      await ensureCsrfCookie()
      await api.post('/logout')
      this.user = null
    },

    async fetchUser() {
      try {
        const { data } = await api.get<User>('/user')
        this.user = data
        return data
      } catch {
        this.user = null
        return null
      }
    },
  },
})
