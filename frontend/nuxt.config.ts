// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  css: ['~/assets/css/main.css'],

  modules: [
    '@nuxt/a11y',
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/hints',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils',
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