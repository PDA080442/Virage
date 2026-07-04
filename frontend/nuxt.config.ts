// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  colorMode: {
    preference: 'light',
    fallback: 'light',
  },

  css: ['~/assets/css/main.css'],

  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@pinia/nuxt',
  ],

  pinia: {
    storesDirs: ['app/stores/**'],
  },

  routeRules: {
    '/api/**': { proxy: 'http://127.0.0.1:8000/api/**' },
    '/sanctum/**': { proxy: 'http://127.0.0.1:8000/sanctum/**' },
  },
})