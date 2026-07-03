import { useAuthStore } from '~/stores/auth'

export default defineNuxtRouteMiddleware(async () => {
  if (import.meta.server) {
    return
  }

  const authStore = useAuthStore()

  await authStore.fetchUser()

  if (authStore.isAuthenticated) {
    return navigateTo('/products', { replace: true })
  }
})
