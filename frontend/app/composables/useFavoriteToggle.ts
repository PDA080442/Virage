import { useFavoritesStore } from '~/stores/favorites'
import { redirectToLoginIfUnauthorized } from '~/utils/http'

export function useFavoriteToggle(errorMessage: string) {
  const favoritesStore = useFavoritesStore()
  const toggleError = ref('')
  const togglingId = ref<number | null>(null)

  async function toggle(productId: number) {
    toggleError.value = ''
    togglingId.value = productId

    try {
      await favoritesStore.toggle(productId)
    } catch (error) {
      if (await redirectToLoginIfUnauthorized(error)) {
        return
      }

      toggleError.value = errorMessage
    } finally {
      togglingId.value = null
    }
  }

  return {
    toggleError,
    togglingId,
    toggle,
  }
}
