<template>
  <div class="lg:oe-h-screen lg:oe-sticky lg:oe-top-0">
    <!-- Mobile Overlay -->
    <div
      v-if="isOpen"
      @click="$emit('close')"
      class="oe-fixed oe-inset-0 oe-bg-black/50 oe-z-40 lg:oe-hidden"
    ></div>

    <!-- Sidebar Content -->
    <aside
      class="oe-fixed oe-inset-y-0 oe-left-0 oe-w-64 oe-bg-gray-800 oe-text-white oe-transform oe-transition-transform oe-duration-300 oe-ease-in-out oe-z-50 lg:oe-static lg:oe-translate-x-0 oe-flex oe-flex-col oe-h-full lg:oe-h-[calc(100vh-0rem)] lg:oe-shadow-xl lg:oe-w-72"
      :class="isOpen ? 'oe-translate-x-0' : '-oe-translate-x-full'"
    >
      <!-- Header -->
      <div class="oe-p-6 oe-border-b oe-border-gray-700">
        <h1
          class="oe-text-xl oe-font-bold oe-text-white oe-tracking-tight oe-flex oe-items-center"
        >
          <div
            class="oe-w-8 oe-h-8 oe-bg-blue-600 oe-rounded-lg oe-mr-3 oe-flex oe-items-center oe-justify-center"
          >
            <span class="oe-text-sm">HR</span>
          </div>
          WorkflowHR
        </h1>
      </div>

      <!-- Navigation -->
      <nav class="oe-flex-1 oe-px-3 oe-py-4 oe-space-y-1">
        <NuxtLink
          to="/"
          class="oe-flex oe-items-center oe-px-3 oe-py-2.5 oe-rounded-xl hover:oe-bg-gray-700 oe-transition-colors"
          active-class="oe-bg-blue-600 hover:oe-bg-blue-600"
        >
          <svg
            class="oe-w-5 oe-h-5 oe-mr-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          <span class="oe-text-sm oe-font-medium">Dashboard</span>
        </NuxtLink>

        <NuxtLink
          to="/onboarding"
          class="oe-flex oe-items-center oe-px-3 oe-py-2.5 oe-rounded-xl hover:oe-bg-gray-700 oe-transition-colors"
          active-class="oe-bg-blue-600 hover:oe-bg-blue-600"
        >
          <svg
            class="oe-w-5 oe-h-5 oe-mr-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1"
            />
          </svg>
          <span class="oe-text-sm oe-font-medium">Onboarding</span>
        </NuxtLink>

        <NuxtLink
          to="/exit"
          class="oe-flex oe-items-center oe-px-3 oe-py-2.5 oe-rounded-xl hover:oe-bg-gray-700 oe-transition-colors"
          active-class="oe-bg-blue-600 hover:oe-bg-blue-600"
        >
          <svg
            class="oe-w-5 oe-h-5 oe-mr-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          <span class="oe-text-sm oe-font-medium">Exit</span>
        </NuxtLink>

        <NuxtLink
          to="/tasks"
          class="oe-flex oe-items-center oe-px-3 oe-py-2.5 oe-rounded-xl hover:oe-bg-gray-700 oe-transition-colors"
          active-class="oe-bg-blue-600 hover:oe-bg-blue-600"
        >
          <svg
            class="oe-w-5 oe-h-5 oe-mr-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
            />
          </svg>
          <span class="oe-text-sm oe-font-medium">My task</span>
        </NuxtLink>
      </nav>

      <!-- User Profile (Bottom) -->
      <div
        class="oe-p-4 oe-mt-auto oe-border-t oe-border-gray-700 oe-bg-gray-900/40 lg:oe-rounded-b-2xl"
      >
        <div class="oe-flex oe-flex-col oe-gap-1">
          <div class="oe-flex oe-items-center oe-gap-3 oe-mt-1">
            <div
              class="oe-w-8 oe-h-8 oe-rounded-full oe-bg-blue-500 oe-flex oe-items-center oe-justify-center oe-text-xs oe-font-bold"
            >
              {{ authStore.user.name.charAt(0) }}
            </div>
            <div class="oe-overflow-hidden">
              <p class="oe-text-lg oe-font-semibold oe-text-white oe-truncate">
                {{ authStore.user.role }}
              </p>
              <p class="oe-text-[15px] oe-text-gray-400 oe-truncate">
                {{ authStore.user.email }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  </div>
</template>

<script setup>
import { useAuthStore } from "~/stores/auth";

const authStore = useAuthStore();

defineProps({
  isOpen: Boolean,
});
defineEmits(["close"]);
</script>
