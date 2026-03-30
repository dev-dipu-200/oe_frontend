<template>
  <span
    :class="badgeClasses"
    class="oe-px-3 oe-py-1 oe-text-xs oe-font-medium oe-rounded-full oe-inline-flex oe-items-center oe-gap-1"
  >
    <span v-if="showIcon" :class="iconClasses">{{ statusIcon }}</span>
    <span>{{ label || status }}</span>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export interface StatusBadgeProps {
  status: 'pending' | 'in-progress' | 'done' | 'hold' | 'active' | 'completed' | 'cancelled' | string
  label?: string
  showIcon?: boolean
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<StatusBadgeProps>(), {
  showIcon: true,
  size: 'md'
})

const statusConfig = computed(() => {
  const statusMap: Record<string, {
    bg: string
    text: string
    icon: string
    label: string
  }> = {
    'pending': {
      bg: 'oe-bg-amber-100',
      text: 'oe-text-amber-700',
      icon: '⏳',
      label: 'Pending'
    },
    'in-progress': {
      bg: 'oe-bg-blue-100',
      text: 'oe-text-blue-700',
      icon: '🔄',
      label: 'In Progress'
    },
    'done': {
      bg: 'oe-bg-emerald-100',
      text: 'oe-text-emerald-700',
      icon: '✅',
      label: 'Done'
    },
    'hold': {
      bg: 'oe-bg-gray-100',
      text: 'oe-text-gray-600',
      icon: '⏸️',
      label: 'Hold'
    },
    'active': {
      bg: 'oe-bg-green-100',
      text: 'oe-text-green-700',
      icon: '🟢',
      label: 'Active'
    },
    'completed': {
      bg: 'oe-bg-emerald-100',
      text: 'oe-text-emerald-700',
      icon: '✅',
      label: 'Completed'
    },
    'cancelled': {
      bg: 'oe-bg-red-100',
      text: 'oe-text-red-700',
      icon: '❌',
      label: 'Cancelled'
    }
  }

  // Default for unknown status
  return statusMap[props.status.toLowerCase()] || {
    bg: 'oe-bg-gray-100',
    text: 'oe-text-gray-600',
    icon: '❓',
    label: props.status
  }
})

const badgeClasses = computed(() => {
  const sizeClasses = {
    'sm': 'oe-px-2 oe-py-0.5 oe-text-xs',
    'md': 'oe-px-3 oe-py-1 oe-text-xs',
    'lg': 'oe-px-4 oe-py-1.5 oe-text-sm'
  }
  
  return `${statusConfig.value.bg} ${statusConfig.value.text} ${sizeClasses[props.size]}`
})

const iconClasses = computed(() => {
  const sizeClasses = {
    'sm': 'oe-text-xs',
    'md': 'oe-text-sm',
    'lg': 'oe-text-base'
  }
  return sizeClasses[props.size]
})

const statusIcon = computed(() => statusConfig.value.icon)
</script>