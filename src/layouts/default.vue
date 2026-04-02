<template>
  <div class="oe-min-h-screen oe-bg-gray-50 oe-transition-colors oe-duration-300">
    <div
      v-if="isLayoutReady"
      class="oe-min-h-screen oe-flex oe-flex-col lg:oe-flex-row"
    >
      <Sidebar :isOpen="isSidebarOpen" @close="isSidebarOpen = false" />

      <div class="oe-flex-1 oe-flex oe-flex-col">
        <Topbar @toggleSidebar="isSidebarOpen = !isSidebarOpen" />

        <main class="oe-flex-1 oe-p-6">
          <slot />
        </main>
      </div>
    </div>

    <div
      v-else
      class="oe-flex oe-min-h-screen oe-items-center oe-justify-center"
    >
      <div class="oe-text-gray-500">Loading your workspace...</div>
    </div>

    <ClientOnly>
      <Loader />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import Loader from '@/components/Loader.vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const isSidebarOpen = ref(false)

const route = useRoute()
const isLayoutReady = computed(() => authStore.isInitialized && !!authStore.user?.role)

watch(
  () => route.path,
  () => {
    isSidebarOpen.value = false
  },
)
</script>
