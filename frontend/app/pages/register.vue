<template>
  <div v-if="!isCheckingAuth" class="mt-8">
    <div class="mb-6 text-center">
      <h1 class="text-2xl font-semibold tracking-tight">Создать аккаунт</h1>
      <p class="mt-1 text-sm text-gray-500">
        Заполните форму, чтобы зарегистрироваться
      </p>
    </div>

    <form
      class="space-y-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
      @submit.prevent="onSubmit"
    >
      <UAlert v-if="generalError" color="error" :title="generalError" />

      <UFormField label="Имя" name="name" :error="errors.name" required>
        <UInput
          v-model="form.name"
          type="text"
          autocomplete="name"
          placeholder="Иван Иванов"
          class="w-full"
          required
        />
      </UFormField>

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
          autocomplete="new-password"
          placeholder="••••••••"
          class="w-full"
          required
        />
      </UFormField>

      <UFormField
        label="Подтверждение пароля"
        name="password_confirmation"
        :error="errors.password_confirmation"
        required
      >
        <UInput
          v-model="form.password_confirmation"
          type="password"
          autocomplete="new-password"
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
        Зарегистрироваться
      </UButton>
    </form>

    <p class="mt-4 text-center text-sm text-gray-500">
      Уже есть аккаунт?
      <NuxtLink
        to="/login"
        class="font-medium text-gray-900 no-underline hover:underline"
      >
        Войти
      </NuxtLink>
    </p>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "~/stores/auth";
import { parseValidationErrors } from "~/utils/validation";

definePageMeta({
  layout: 'auth',
  middleware: 'guest',
})

const authStore = useAuthStore();

const form = reactive({
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
});

const errors = ref<Record<string, string>>({});
const generalError = ref("");
const isCheckingAuth = ref(true);
const isSubmitting = ref(false);

onMounted(async () => {
  await authStore.fetchUser();

  if (authStore.isAuthenticated) {
    setPageLayout("default");
    await navigateTo("/products", { replace: true });
    return;
  }

  isCheckingAuth.value = false;
});

async function onSubmit() {
  errors.value = {};
  generalError.value = "";
  isSubmitting.value = true;

  try {
    await authStore.register(form);
    setPageLayout("default");
    await navigateTo("/products");
  } catch (error) {
    const fieldErrors = parseValidationErrors(error);

    if (Object.keys(fieldErrors).length > 0) {
      errors.value = fieldErrors;
    } else {
      generalError.value = "Не удалось зарегистрироваться";
    }
  } finally {
    isSubmitting.value = false;
  }
}
</script>
