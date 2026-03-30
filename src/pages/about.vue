<template>
  <div class="oe-p-8">
    <h1 class="oe-text-2xl oe-font-bold">About Us</h1>
    <p class="oe-mt-4">This is the about page.</p>
    <NuxtLink to="/" class="oe-text-blue-600 oe-underline oe-mt-4 oe-block">Back to Home</NuxtLink>
    <div class="oe-max-w-2xl oe-mx-auto oe-bg-white oe-shadow-lg oe-rounded-lg oe-p-6">
      <h1 class="oe-text-3xl oe-font-bold oe-text-gray-800 oe-mb-4">Pinia Persistence Test</h1>
      <div class="oe-space-y-4">
        <p class="oe-text-lg">
          <span class="oe-font-semibold">Count:</span>
          <span class="oe-ml-2 oe-px-3 oe-py-1 oe-bg-blue-100 oe-text-blue-800 oe-rounded-full">{{ counter.count }}</span>
        </p>
        <p class="oe-text-lg">
          <span class="oe-font-semibold">Name:</span>
          <span class="oe-ml-2 oe-text-gray-700">{{ counter.name }}</span>
        </p>
        <div class="oe-flex oe-gap-4 oe-mt-6">
          <button
            @click="counter.increment"
            class="oe-px-6 oe-py-3 oe-bg-green-600 hover:oe-bg-green-700 oe-text-white oe-font-medium oe-rounded-lg oe-transition-colors"
          >
            Increment
          </button>
          <button
            @click="counter.reset"
            class="oe-px-6 oe-py-3 oe-bg-red-600 hover:oe-bg-red-700 oe-text-white oe-font-medium oe-rounded-lg oe-transition-colors"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const counter = useCounterStore()
</script>
