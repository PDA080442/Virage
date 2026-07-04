<template>
  <header class="sticky top-0 z-10 border-b border-gray-200 bg-white/80 backdrop-blur">
    <nav class="mx-auto flex max-w-5xl flex-wrap items-center gap-x-3 gap-y-2 px-4 py-2 sm:h-14 sm:flex-nowrap sm:gap-8 sm:py-0">
      <NuxtLink
        to="/products"
        class="order-1 shrink-0 text-lg font-semibold tracking-tight text-gray-900 no-underline"
      >
        Virage
      </NuxtLink>

      <div class="order-2 ml-auto flex shrink-0 items-center gap-2 text-sm sm:order-3 sm:ml-0 sm:gap-4">
        <template v-if="authStore.isAuthenticated">
          <span
            v-if="authStore.user"
            class="hidden max-w-24 truncate text-gray-500 sm:inline sm:max-w-none"
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

      <div class="order-3 flex w-full basis-full items-center gap-4 text-sm sm:order-2 sm:w-auto sm:basis-auto sm:flex-1 sm:gap-6">
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
