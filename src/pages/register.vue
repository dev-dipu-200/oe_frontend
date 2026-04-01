<template>
  <div class="oe-grid oe-grid-cols-12 oe-w-full oe-max-w-7xl oe-items-center oe-gap-8">
    <!-- Left side content (8 columns) -->
    <div class="oe-col-span-8 oe-hidden md:oe-block oe-text-white">
      <h1 class="oe-text-6xl oe-font-extrabold oe-mb-4 oe-drop-shadow-2xl">
        Join the <br />
        <span class="oe-text-blue-200">WorkflowHR</span> Team
      </h1>
      <p class="oe-text-2xl oe-text-gray-100 oe-max-w-2xl oe-drop-shadow-lg">
        Create your account today and experience the next generation of HR management tools designed for modern teams.
      </p>
    </div>

    <!-- Right side form (4 columns) -->
    <div class="oe-col-span-12 md:oe-col-span-4">
      <div class="oe-flex oe-flex-col oe-items-center oe-justify-center oe-w-full oe-p-8 oe-rounded-3xl oe-bg-transparent oe-backdrop-blur-sm oe-shadow-2xl oe-shadow-black/30 oe-space-y-8 oe-transform oe-transition-all oe-duration-300 hover:oe-shadow-black/50">
        <div class="oe-w-full oe-space-y-8">
          <div>
            <h2 class="oe-mt-6 oe-text-center oe-text-4xl oe-font-extrabold oe-text-white oe-drop-shadow-lg">
              Join WorkflowHR Today!
            </h2>
            <p class="oe-mt-2 oe-text-center oe-text-lg oe-text-gray-200">
              Create your account to start managing your HR workflows efficiently.
            </p>
          </div>
          <form class="oe-mt-8 oe-space-y-6" @submit.prevent="handleRegister">
            <div class="oe-rounded-md oe-space-y-4">
              <div>
                <label for="name" class="oe-sr-only">Full Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autocomplete="name"
                  required
                  class="oe-appearance-none oe-relative oe-block oe-w-full oe-px-4 oe-py-3 oe-border oe-border-white/30 oe-bg-white/10 oe-placeholder-gray-200 oe-text-white oe-rounded-lg focus:oe-outline-none focus:oe-ring-2 focus:oe-ring-blue-300 focus:oe-border-blue-300 sm:oe-text-sm oe-transition-all oe-duration-200"
                  placeholder="Full Name"
                  v-model="name"
                />
              </div>
              <div>
                <label for="email-address" class="oe-sr-only">Email address</label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autocomplete="email"
                  required
                  class="oe-appearance-none oe-relative oe-block oe-w-full oe-px-4 oe-py-3 oe-border oe-border-white/30 oe-bg-white/10 oe-placeholder-gray-200 oe-text-white oe-rounded-lg focus:oe-outline-none focus:oe-ring-2 focus:oe-ring-blue-300 focus:oe-border-blue-300 sm:oe-text-sm oe-transition-all oe-duration-200"
                  placeholder="Email address"
                  v-model="email"
                />
              </div>
              <div>
                <label for="password" class="oe-sr-only">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autocomplete="new-password"
                  required
                  class="oe-appearance-none oe-relative oe-block oe-w-full oe-px-4 oe-py-3 oe-border oe-border-white/30 oe-bg-white/10 oe-placeholder-gray-200 oe-text-white oe-rounded-lg focus:oe-outline-none focus:oe-ring-2 focus:oe-ring-blue-300 focus:oe-border-blue-300 sm:oe-text-sm oe-transition-all oe-duration-200"
                  placeholder="Password"
                  v-model="password"
                />
              </div>
              <div>
                <label for="confirm-password" class="oe-sr-only">Confirm Password</label>
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  autocomplete="new-password"
                  required
                  class="oe-appearance-none oe-relative oe-block oe-w-full oe-px-4 oe-py-3 oe-border oe-border-white/30 oe-bg-white/10 oe-placeholder-gray-200 oe-text-white oe-rounded-lg focus:oe-outline-none focus:oe-ring-2 focus:oe-ring-blue-300 focus:oe-border-blue-300 sm:oe-text-sm oe-transition-all oe-duration-200"
                  placeholder="Confirm Password"
                  v-model="confirm_password"
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
                Register
              </button>
            </div>
          </form>

          <div class="oe-text-center oe-text-sm oe-text-gray-200 oe-mt-5">
            Already a member?
            <NuxtLink to="/login" class="oe-font-medium oe-text-blue-200 hover:oe-text-blue-100 oe-transition-colors oe-duration-200">
              Sign in
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
import { useRouter } from 'vue-router'
import { useToastStore } from '@/stores/toast'

definePageMeta({
  layout: 'auth'
})

const authStore = useAuthStore()
const router = useRouter()
const toastStore = useToastStore()

const name = ref('')
const email = ref('')
const password = ref('')
const confirm_password = ref('')
const loading = ref(false)

const handleRegister = async () => {
  if (password.value !== confirm_password.value) {
    toastStore.addToast({
      message: 'Passwords do not match.',
      type: 'error',
    })
    return
  }

  loading.value = true
  const success = await authStore.register({
    name: name.value,
    email: email.value,
    password: password.value,
    confirm_password: confirm_password.value,
  })
  if (success) {
    router.push('/') // Redirect to dashboard or home page after successful registration and login
  }
  loading.value = false
}
</script>