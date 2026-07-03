<template>
  <div class="mx-auto mt-8 max-w-sm">
    <div class="mb-6 text-center">
      <h1 class="text-2xl font-semibold tracking-tight">Вход</h1>
      <p class="mt-1 text-sm text-gray-500">Введите email и пароль</p>
    </div>

    <form
      class="space-y-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
      @submit.prevent="onSubmit"
    >
      <UAlert v-if="generalError" color="error" :title="generalError" />

      <UFormField label="Email" name="email" :error="errors.email" required>
        <UInput
          v-model="form.email"
          type="email"
          autocomplete="email"
          placeholder="you@example.com"
          class="w-full"
          required
        />
      </UFormField>

      <UFormField
        label="Пароль"
        name="password"
        :error="errors.password"
        required
      >
        <UInput
          v-model="form.password"
          type="password"
          autocomplete="current-password"
          placeholder="••••••••"
          class="w-full"
          required
        />
      </UFormField>

      <UButton
        type="submit"
        block
        size="lg"
        :loading="isSubmitting"
        :disabled="isSubmitting"
      >
        Войти
      </UButton>
    </form>

    <p class="mt-4 text-center text-sm text-gray-500">
      Нет аккаунта?
      <NuxtLink
        to="/register"
        class="font-medium text-gray-900 no-underline hover:underline"
      >
        Зарегистрироваться
      </NuxtLink>
    </p>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "~/stores/auth";
import { parseValidationErrors } from "~/utils/validation";

const authStore = useAuthStore();

const form = reactive({
  email: "",
  password: "",
});

const errors = ref<Record<string, string>>({});
const generalError = ref("");
const isSubmitting = ref(false);

async function onSubmit() {
  errors.value = {};
  generalError.value = "";
  isSubmitting.value = true;

  try {
    await authStore.login(form);
    await navigateTo("/products");
  } catch (error) {
    const fieldErrors = parseValidationErrors(error);

    if (Object.keys(fieldErrors).length > 0) {
      errors.value = fieldErrors;
    } else {
      generalError.value = "Не удалось войти";
    }
  } finally {
    isSubmitting.value = false;
  }
}
</script>
