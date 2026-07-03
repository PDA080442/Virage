import { defineStore } from 'pinia'
import type { LoginCredentials, RegisterPayload } from '~/types/auth'
import type { User } from '~/types/user'
import {
  fetchUser as fetchUserRequest,
  login as loginRequest,
  logout as logoutRequest,
  register as registerRequest,
} from '~/utils/requests/auth'

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
      await logoutRequest()
      this.user = null
    },

    async fetchUser() {
      try {
        const user = await fetchUserRequest()
        this.user = user
        return user
      } catch {
        this.user = null
        return null
      }
    },
  },
})
