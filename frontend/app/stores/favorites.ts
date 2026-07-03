import { defineStore } from 'pinia'
import { api } from '~/utils/api'
import { ensureCsrfCookie } from '~/utils/sanctum'

export interface Product {
  id: number
  name: string
  description: string
  price: string
  image_url: string
  created_at: string
  updated_at: string
}

export const useFavoritesStore = defineStore('favorites', {
  state: () => ({
    items: [] as Product[],
  }),

  getters: {
    isFavorite: (state) => (productId: number) =>
      state.items.some((item) => item.id === productId),
  },

  actions: {
    async fetchFavorites() {
      const { data } = await api.get<Product[]>('/me/favorites')
      this.items = data
      return data
    },

    async toggle(productId: number) {
      await ensureCsrfCookie()

      if (this.isFavorite(productId)) {
        await api.delete(`/favorites/${productId}`)
        this.items = this.items.filter((item) => item.id !== productId)
        return
      }

      const { data } = await api.post<Product>(`/favorites/${productId}`)
      this.items.push(data)
    },
  },
})
