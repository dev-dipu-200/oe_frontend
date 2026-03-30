<template>
  <div class="oe-relative oe-inline-block">
    <!-- Status Badge (Clickable) -->
    <span
      @click.stop="toggleDropdown"
      :class="badgeClasses"
      class="oe-px-4 oe-py-1.5 oe-text-xs oe-font-medium oe-rounded-full oe-cursor-pointer hover:oe-shadow-md oe-transition-all oe-select-none oe-border oe-inline-flex oe-items-center oe-gap-2"
      :aria-expanded="isOpen"
      aria-haspopup="listbox"
      role="button"
    >
      <span>{{ currentStatus.label }}</span>
      <span class="oe-text-xs">▼</span>
    </span>

    <!-- Dropdown Menu -->
    <div
      v-if="isOpen"
      v-click-outside="closeDropdown"
      class="oe-absolute oe-right-0 oe-mt-2 oe-bg-white oe-border oe-border-gray-200 oe-rounded-2xl oe-shadow-2xl oe-z-50 oe-w-48 oe-py-1"
      role="listbox"
    >
      <div
        v-for="option in statusOptions"
        :key="option.value"
        @click.stop="selectStatus(option)"
        :class="optionClasses(option)"
        class="oe-px-4 oe-py-3 oe-text-sm hover:oe-bg-gray-50 oe-cursor-pointer oe-flex oe-items-center oe-gap-2"
        role="option"
        :aria-selected="option.value === modelValue"
      >
        <span class="oe-text-base">{{ option.icon }}</span>
        <span>{{ option.label }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

export interface StatusOption {
  value: string
  label: string
  icon: string
  bg: string
  text: string
}

export interface TaskStatusProps {
  modelValue: string
  statusOptions?: StatusOption[]
}

const props = withDefaults(defineProps<TaskStatusProps>(), {
  statusOptions: () => [
    { value: 'pending', label: 'Pending', icon: '⏳', bg: 'oe-bg-amber-100', text: 'oe-text-amber-700' },
    { value: 'in-progress', label: 'In Progress', icon: '🔄', bg: 'oe-bg-blue-100', text: 'oe-text-blue-700' },
    { value: 'done', label: 'Done', icon: '✅', bg: 'oe-bg-emerald-100', text: 'oe-text-emerald-700' },
    { value: 'hold', label: 'Hold', icon: '⏸️', bg: 'oe-bg-gray-100', text: 'oe-text-gray-600' }
  ]
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const isOpen = ref(false)

// Find current status from options
const currentStatus = computed(() => {
  const found = props.statusOptions.find(opt => opt.value === props.modelValue)
  return found || props.statusOptions[0]
})

const badgeClasses = computed(() => {
  const status = currentStatus.value
  return status ? `${status.bg} ${status.text}` : 'oe-bg-gray-100 oe-text-gray-600'
})

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const closeDropdown = () => {
  isOpen.value = false
}

const selectStatus = (option: StatusOption) => {
  emit('update:modelValue', option.value)
  isOpen.value = false
}

const optionClasses = (option: StatusOption) => {
  return option.value === props.modelValue ? 'oe-bg-gray-50 oe-font-medium' : ''
}

// Click outside handler
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  if (!target.closest('.oe-relative')) {
    closeDropdown()
  }
}

// Add/remove event listener
const setupClickOutside = () => {
  if (isOpen.value) {
    document.addEventListener('click', handleClickOutside)
  } else {
    document.removeEventListener('click', handleClickOutside)
  }
}
</script>

<style scoped>
/* Custom scrollbar for dropdown */
.oe-custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #9ca3af #f3f4f6;
}

.oe-custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.oe-custom-scrollbar::-webkit-scrollbar-track {
  background: #f3f4f6;
  border-radius: 3px;
}

.oe-custom-scrollbar::-webkit-scrollbar-thumb {
  background: #9ca3af;
  border-radius: 3px;
}
</style>