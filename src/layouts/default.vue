<template>
  <div class="oe-min-h-screen oe-flex oe-flex-col lg:oe-flex-row oe-bg-gray-50 oe-transition-colors oe-duration-300">
    <Sidebar :isOpen="isSidebarOpen" @close="isSidebarOpen = false" />
    
    <div class="oe-flex-1 oe-flex oe-flex-col">
      <Topbar @toggleSidebar="isSidebarOpen = !isSidebarOpen" />
      
      <main class="oe-p-6 oe-flex-1">
        <slot />
      </main>
    </div>

    <!-- Global Components -->
    <Loader />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import Loader from '@/components/Loader.vue'

const isSidebarOpen = ref(false)

const route = useRoute()
watch(() => route.path, () => {
  isSidebarOpen.value = false
})
</script>
