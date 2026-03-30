<template>
  <div v-if="loaderStore.isLoading" class="oe-fixed oe-inset-0 oe-z-[9999] oe-flex oe-items-center oe-justify-center oe-bg-white/60 oe-backdrop-blur-sm">
    <div class="oe-flex oe-flex-col oe-items-center">
      <div class="oe-relative oe-w-16 oe-h-16">
        <div class="oe-absolute oe-inset-0 oe-border-4 oe-border-blue-100 oe-rounded-full"></div>
        <div class="oe-absolute oe-inset-0 oe-border-4 oe-border-blue-600 oe-border-t-transparent oe-rounded-full oe-animate-spin"></div>
      </div>
      
      <p v-if="loaderStore.message" class="oe-mt-4 oe-text-gray-900 oe-font-medium">
        {{ loaderStore.message }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { useLoaderStore } from '@/stores/loader'
const loaderStore = useLoaderStore()
</script>
