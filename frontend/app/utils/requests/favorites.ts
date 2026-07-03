import type { Product } from '~/types/product'
import { api } from '~/utils/api'
import { ensureCsrfCookie } from '~/utils/sanctum'

export async function fetchFavorites() {
  const { data } = await api.get<Product[]>('/me/favorites')
  return data
}

export async function addFavorite(productId: number) {
  await ensureCsrfCookie()
  const { data } = await api.post<Product>(`/favorites/${productId}`)
  return data
}

export async function removeFavorite(productId: number) {
  await ensureCsrfCookie()
  await api.delete(`/favorites/${productId}`)
}
