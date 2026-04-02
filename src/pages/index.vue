<template>
  <div class="oe-flex oe-items-center oe-justify-center oe-h-screen oe-bg-gray-50">
    <div class="oe-text-center">
      <div class="oe-inline-block oe-animate-spin oe-rounded-full oe-h-12 oe-w-12 oe-border-b-2 oe-border-blue-600 oe-mb-4"></div>
      <div class="oe-text-gray-500 oe-text-lg">Redirecting to your dashboard...</div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

onMounted(() => {
  const role = authStore.user?.role
  if (!role) {
    router.push('/login')
    return
  }

  switch (role) {
    case 'SUPER_ADMIN':
      router.push('/super-admin/dashboard')
      break
    case 'ADMIN':
      router.push('/admin/dashboard')
      break
    case 'HR':
      router.push('/hr/dashboard')
      break
    case 'NETWORK':
      router.push('/network/dashboard')
      break
    case 'EMPLOYEE':
      router.push('/employee/dashboard')
      break
    default:
      router.push('/hr/dashboard') 
  }
})
</script>
