import type { Product } from '~/types/product'
import { api } from '~/utils/api'

export async function fetchProducts() {
  const { data } = await api.get<Product[]>('/products')
  return data
}
