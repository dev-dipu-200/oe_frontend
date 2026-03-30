<template>
  <div class="oe-relative inline-block">
    <span 
      @click.stop="isOpen = !isOpen"
      :class="getStatusStyle(status)"
      class="oe-px-5 oe-py-1.5 oe-text-xs oe-font-medium oe-rounded-full oe-cursor-pointer hover:oe-shadow-md transition-all select-none border">
      {{ status }}
    </span>

    <!-- Dropdown -->
    <div v-if="isOpen" 
         class="oe-absolute oe-right-0 oe-mt-2 oe-bg-white oe-border oe-border-gray-200 oe-rounded-2xl oe-shadow-2xl oe-z-50 oe-w-40 oe-py-1">
      <div 
        v-for="option in statusOptions" 
        :key="option"
        @click.stop="emitStatusChange(option)"
        class="oe-px-4 oe-py-3 oe-text-sm hover:oe-bg-gray-50 cursor-pointer">
        {{ option }}
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(['status'])
const emit = defineEmits(['change'])

const statusOptions = ['Hold', 'Pending', 'In Process', 'Done']
const isOpen = ref(false)

const getStatusStyle = (s) => {
  switch (s) {
    case 'Done': return 'oe-bg-emerald-100 oe-text-emerald-700'
    case 'In Process': return 'oe-bg-blue-100 oe-text-blue-700'
    case 'Pending': return 'oe-bg-amber-100 oe-text-amber-700'
    case 'Hold': return 'oe-bg-gray-100 oe-text-gray-600'
    default: return 'oe-bg-gray-100 oe-text-gray-600'
  }
}

const emitStatusChange = (option) => {
  emit('change', option)
  isOpen.value = false
}

// Close dropdown when clicking outside
const closeDropdown = (e) => {
  if (isOpen.value) {
    isOpen.value = false
  }
}

onMounted(() => {
  window.addEventListener('click', closeDropdown)
})

onUnmounted(() => {
  window.removeEventListener('click', closeDropdown)
})
</script>
