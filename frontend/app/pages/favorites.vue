<template>
  <div>
    <div class="mb-6">
      <h1 class="text-2xl font-semibold tracking-tight">
        Избранное
      </h1>
      <p class="mt-1 text-sm text-gray-500">
        Товары, которые вы сохранили
      </p>
    </div>

    <div
      v-if="isLoading"
      class="rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm"
    >
      <p class="text-sm text-gray-500">
        Загрузка избранного...
      </p>
    </div>

    <UAlert
      v-else-if="error"
      color="error"
      :title="error"
      class="mb-4"
    >
      <template #actions>
        <UButton
          color="neutral"
          variant="outline"
          size="sm"
          @click="loadFavorites"
        >
          Повторить
        </UButton>
      </template>
    </UAlert>

    <UAlert
      v-if="toggleError"
      color="error"
      :title="toggleError"
      class="mb-4"
    />

    <div
      v-if="!isLoading && !error && favoritesStore.items.length > 0"
      class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
    >
      <article
        v-for="product in favoritesStore.items"
        :key="product.id"
        class="flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
      >
        <div class="relative">
          <img
            :src="product.image_url"
            :alt="product.name"
            class="h-40 w-full object-cover"
          >

          <button
            type="button"
            class="absolute top-2 right-2 flex size-9 cursor-pointer items-center justify-center rounded-full bg-white/90 shadow-sm transition hover:bg-white disabled:opacity-60"
            :disabled="togglingId === product.id"
            aria-label="Убрать из избранного"
            @click="handleRemove(product.id)"
          >
            <ArrowPathIcon
              v-if="togglingId === product.id"
              class="size-5 animate-spin text-gray-600"
            />
            <HeartSolidIcon
              v-else
              class="size-5 text-red-500"
            />
          </button>
        </div>

        <div class="flex flex-1 flex-col p-4">
          <h2 class="font-semibold text-gray-900">
            {{ product.name }}
          </h2>
          <p class="mt-1 line-clamp-2 flex-1 text-sm text-gray-500">
            {{ product.description }}
          </p>

          <div class="mt-4">
            <span class="font-medium text-gray-900">
              {{ formatPrice(product.price) }}
            </span>
          </div>
        </div>
      </article>
    </div>

    <div
      v-if="!isLoading && !error && favoritesStore.items.length === 0"
      class="rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm"
    >
      <HeartIcon class="mx-auto size-10 text-gray-300" />
      <p class="mt-4 font-medium text-gray-900">
        Избранное пусто
      </p>
      <p class="mt-1 text-sm text-gray-500">
        Добавляйте товары на странице каталога
      </p>
      <UButton
        to="/products"
        class="mt-6"
      >
        Перейти к товарам
      </UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowPathIcon, HeartIcon } from '@heroicons/vue/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/vue/24/solid'
import { isAxiosError } from 'axios'
import { useFavoritesStore } from '~/stores/favorites'

definePageMeta({
  middleware: 'auth',
})

const favoritesStore = useFavoritesStore()

const isLoading = ref(true)
const error = ref('')
const toggleError = ref('')
const togglingId = ref<number | null>(null)

function formatPrice(price: string) {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
  }).format(Number(price))
}

async function loadFavorites() {
  isLoading.value = true
  error.value = ''

  try {
    await favoritesStore.fetchFavorites()
  } catch (err) {
    if (isAxiosError(err) && err.response?.status === 401) {
      await navigateTo('/login')
      return
    }

    error.value = 'Не удалось загрузить избранное'
  } finally {
    isLoading.value = false
  }
}

async function handleRemove(productId: number) {
  toggleError.value = ''
  togglingId.value = productId

  try {
    await favoritesStore.toggle(productId)
  } catch (err) {
    if (isAxiosError(err) && err.response?.status === 401) {
      await navigateTo('/login')
      return
    }

    toggleError.value = 'Не удалось убрать из избранного'
  } finally {
    togglingId.value = null
  }
}

onMounted(() => {
  loadFavorites()
})
</script>
