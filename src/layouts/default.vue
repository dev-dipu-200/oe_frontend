<template>
  <div class="oe-min-h-screen oe-flex oe-flex-col oe-bg-gray-50 dark:oe-bg-gray-900 oe-transition-colors oe-duration-300">
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
import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Loader from '@/components/Loader.vue'
import { useThemeStore } from '@/stores/theme'

const isSidebarOpen = ref(false)
const themeStore = useThemeStore()

const route = useRoute()
watch(() => route.path, () => {
  isSidebarOpen.value = false
})

// Standard Tailwind dark mode implementation targets the document element
const updateDocumentTheme = () => {
  if (themeStore.theme === 'dark') {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

watch(() => themeStore.theme, updateDocumentTheme)

onMounted(() => {
  updateDocumentTheme()
})
</script>
