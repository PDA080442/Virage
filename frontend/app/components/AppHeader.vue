<template>
  <header class="sticky top-0 z-10 border-b border-gray-200 bg-white/80 backdrop-blur">
    <nav class="mx-auto flex h-14 max-w-5xl items-center gap-8 px-4">
      <NuxtLink
        to="/products"
        class="text-lg font-semibold tracking-tight text-gray-900 no-underline"
      >
        Virage
      </NuxtLink>

      <div class="flex items-center gap-6 text-sm">
        <NuxtLink
          to="/products"
          class="no-underline transition-colors"
          :class="linkClass('/products')"
        >
          Товары
        </NuxtLink>
        <NuxtLink
          to="/favorites"
          class="no-underline transition-colors"
          :class="linkClass('/favorites')"
        >
          Избранное
        </NuxtLink>
      </div>

      <div class="ml-auto flex items-center gap-4 text-sm">
        <template v-if="authStore.isAuthenticated">
          <span
            v-if="authStore.user"
            class="text-gray-500"
          >
            {{ authStore.user.name }}
          </span>
          <UButton
            color="neutral"
            variant="ghost"
            size="sm"
            @click="handleLogout"
          >
            Выйти
          </UButton>
        </template>
        <template v-else>
          <NuxtLink
            to="/login"
            class="no-underline transition-colors"
            :class="linkClass('/login')"
          >
            Войти
          </NuxtLink>
          <UButton
            to="/register"
            size="sm"
          >
            Регистрация
          </UButton>
        </template>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
import { useFavoritesStore } from '~/stores/favorites'

const route = useRoute()
const authStore = useAuthStore()
const favoritesStore = useFavoritesStore()

function linkClass(path: string) {
  return route.path === path
    ? 'text-gray-900 font-medium'
    : 'text-gray-500 hover:text-gray-900'
}

async function handleLogout() {
  await authStore.logout()
  favoritesStore.$reset()
  await navigateTo('/login')
}
</script>
