<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
import { useFavoritesStore } from '~/stores/favorites'

const route = useRoute()
const authStore = useAuthStore()
const favoritesStore = useFavoritesStore()

function linkClass(path: string) {
  return route.path === path
    ? 'font-semibold text-gray-900'
    : 'text-gray-600 hover:text-gray-900'
}

async function handleLogout() {
  await authStore.logout()
  favoritesStore.$reset()
  await navigateTo('/products')
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <header class="border-b border-gray-200 bg-white">
      <nav class="container mx-auto flex items-center gap-6 px-4 py-4">
        <NuxtLink
          to="/products"
          class="no-underline"
          :class="linkClass('/products')"
        >
          Товары
        </NuxtLink>
        <NuxtLink
          to="/favorites"
          class="no-underline"
          :class="linkClass('/favorites')"
        >
          Избранное
        </NuxtLink>

        <div class="ml-auto flex items-center gap-4">
          <template v-if="authStore.isAuthenticated">
            <button
              type="button"
              class="cursor-pointer text-gray-600 hover:text-gray-900"
              @click="handleLogout"
            >
              Выйти
            </button>
          </template>
          <template v-else>
            <NuxtLink
              to="/login"
              class="no-underline"
              :class="linkClass('/login')"
            >
              Войти
            </NuxtLink>
            <NuxtLink
              to="/register"
              class="no-underline"
              :class="linkClass('/register')"
            >
              Регистрация
            </NuxtLink>
          </template>
        </div>
      </nav>
    </header>

    <main class="container mx-auto px-4 py-8">
      <slot />
    </main>
  </div>
</template>
