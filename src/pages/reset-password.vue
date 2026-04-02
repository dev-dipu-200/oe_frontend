<template>
  <div class="oe-grid oe-grid-cols-12 oe-w-full oe-max-w-7xl oe-items-center oe-gap-8">
    <!-- Left side content (8 columns) -->
    <div class="oe-col-span-8 oe-hidden md:oe-block oe-text-white">
      <h1 class="oe-text-6xl oe-font-extrabold oe-mb-4 oe-drop-shadow-2xl">
        Create New <br />
        <span class="oe-text-blue-200">Password</span>
      </h1>
      <p class="oe-text-2xl oe-text-gray-100 oe-max-w-2xl oe-drop-shadow-lg">
        Your new password must be different from previous used passwords.
      </p>
    </div>

    <!-- Right side form (4 columns) -->
    <div class="oe-col-span-12 md:oe-col-span-4">
      <div class="oe-flex oe-flex-col oe-items-center oe-justify-center oe-w-full oe-p-8 oe-rounded-3xl oe-bg-transparent oe-backdrop-blur-sm oe-shadow-2xl oe-shadow-black/30 oe-space-y-8 oe-transform oe-transition-all oe-duration-300 hover:oe-shadow-black/50">
        <div class="oe-w-full oe-space-y-8">
          <div>
            <h2 class="oe-mt-6 oe-text-center oe-text-4xl oe-font-extrabold oe-text-white oe-drop-shadow-lg">
              Reset Password
            </h2>
            <p class="oe-mt-2 oe-text-center oe-text-lg oe-text-gray-200">
              Set your new account password
            </p>
          </div>
          <form class="oe-mt-8 oe-space-y-6" @submit.prevent="handleResetPassword">
            <div class="oe-rounded-md oe-space-y-4">
              <div>
                <label for="password" class="oe-sr-only">New Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  class="oe-appearance-none oe-relative oe-block oe-w-full oe-px-4 oe-py-3 oe-border oe-border-white/30 oe-bg-white/10 oe-placeholder-gray-200 oe-text-white oe-rounded-lg focus:oe-outline-none focus:oe-ring-2 focus:oe-ring-blue-300 focus:oe-border-blue-300 sm:oe-text-sm oe-transition-all oe-duration-200"
                  placeholder="New Password"
                  v-model="password"
                />
              </div>
              <div>
                <label for="password_confirmation" class="oe-sr-only">Confirm Password</label>
                <input
                  id="password_confirmation"
                  name="password_confirmation"
                  type="password"
                  required
                  class="oe-appearance-none oe-relative oe-block oe-w-full oe-px-4 oe-py-3 oe-border oe-border-white/30 oe-bg-white/10 oe-placeholder-gray-200 oe-text-white oe-rounded-lg focus:oe-outline-none focus:oe-ring-2 focus:oe-ring-blue-300 focus:oe-border-blue-300 sm:oe-text-sm oe-transition-all oe-duration-200"
                  placeholder="Confirm Password"
                  v-model="password_confirmation"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                class="oe-group oe-relative oe-w-full oe-flex oe-justify-center oe-py-3 oe-px-4 oe-border oe-border-transparent oe-text-sm oe-font-medium oe-rounded-lg oe-text-white oe-bg-blue-600 hover:oe-bg-blue-700 focus:oe-outline-none focus:oe-ring-2 focus:oe-ring-offset-2 focus:oe-ring-blue-500 oe-transition-all oe-duration-200"
                :disabled="loading"
              >
                <span class="oe-absolute oe-left-0 oe-inset-y-0 oe-flex oe-items-center oe-pl-3" v-if="loading">
                  <svg class="oe-h-5 oe-w-5 oe-text-blue-300 group-hover:oe-text-blue-200 oe-animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="oe-opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="oe-opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </span>
                Reset Password
              </button>
            </div>
          </form>

          <div class="oe-text-center oe-text-sm oe-text-gray-200 oe-mt-5">
            Remember your password?
            <NuxtLink to="/login" class="oe-font-medium oe-text-blue-200 hover:oe-text-blue-100 oe-transition-colors oe-duration-200">
              Sign In
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRoute, useRouter } from 'vue-router'
import { useToastStore } from '@/stores/toast'

definePageMeta({
  layout: 'auth'
})

const authStore = useAuthStore()
const toastStore = useToastStore()
const route = useRoute()
const router = useRouter()

const password = ref('')
const password_confirmation = ref('')
const loading = ref(false)

const handleResetPassword = async () => {
  if (password.value !== password_confirmation.value) {
    toastStore.addToast({
      message: 'Passwords do not match.',
      type: 'error',
    })
    return
  }

  loading.value = true
  const success = await authStore.resetPassword({
    token: route.query.token,
    email: route.query.email,
    password: password.value,
    password_confirmation: password_confirmation.value,
  })
  
  if (success) {
    router.push('/login')
  }
  loading.value = false
}
</script>
