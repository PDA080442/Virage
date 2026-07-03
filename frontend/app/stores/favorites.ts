import { defineStore } from 'pinia'
import type { Product } from '~/types/product'
import {
  addFavorite,
  fetchFavorites,
  removeFavorite,
} from '~/utils/requests/favorites'

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
      this.items = await fetchFavorites()
      return this.items
    },

    async toggle(productId: number) {
      if (this.isFavorite(productId)) {
        await removeFavorite(productId)
        this.items = this.items.filter((item) => item.id !== productId)
        return
      }

      const product = await addFavorite(productId)
      this.items.push(product)
    },
  },
})
