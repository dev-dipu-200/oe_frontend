<template>
  <div class="oe-min-h-screen oe-flex oe-items-center oe-justify-center oe-bg-gradient-to-br oe-from-blue-400 oe-via-purple-500 oe-to-pink-500 oe-py-12 oe-px-4 sm:oe-px-6 lg:oe-px-8">
    <main class="oe-flex-1 oe-flex oe-items-center oe-justify-center">
      <slot />
    </main>

    <!-- Global Components (if applicable for auth pages) -->
    <Loader />
  </div>
</template>

<script setup>
import Loader from '@/components/Loader.vue'
// No need for sidebar/topbar related logic here
</script>
