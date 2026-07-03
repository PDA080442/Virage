<template>
  <NuxtRouteAnnouncer />
  <NuxtLayout :key="layoutKey">
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
const route = useRoute()

const layoutKey = computed(() => String(route.meta.layout ?? 'default'))
</script>
