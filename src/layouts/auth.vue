<template>
  <div
    class="oe-min-h-screen oe-flex oe-items-center oe-justify-center oe-bg-gradient-to-br oe-from-blue-600 oe-via-purple-500 oe-to-gray-900 oe-py-12 oe-px-4 sm:oe-px-6 lg:oe-px-8"
  >
    <main class="oe-w-full flex-1 oe-flex oe-items-center oe-justify-between oe-flex-col oe-gap-6 oe-p-8 oe-rounded-lg">
      <slot />
    </main>
    <Loader />
  </div>
</template>

<script setup>
import Loader from "@/components/Loader.vue";
// No need for sidebar/topbar related logic here
</script>
