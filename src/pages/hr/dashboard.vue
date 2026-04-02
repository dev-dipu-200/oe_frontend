<template>
  <div class="oe-min-h-screen oe-bg-gray-50 oe-transition-colors oe-duration-300">
    <div class="oe-p-2 oe-mx-auto" v-if="dashboardData">
      <div class="oe-flex oe-justify-between oe-items-center oe-mb-8">
        <div>
          <h1 class="oe-text-3xl oe-font-semibold oe-text-gray-900">HR Dashboard</h1>
          <p class="oe-text-gray-500">Manage employee onboarding and exit processes</p>
        </div>
        <button @click="fetchDashboardData" class="oe-bg-blue-600 oe-text-white oe-px-4 oe-py-2 oe-rounded-xl oe-text-sm hover:oe-bg-blue-700 transition-all">Refresh Data</button>
      </div>

      <!-- KPI Cards -->
      <div class="oe-grid oe-grid-cols-1 md:oe-grid-cols-2 lg:oe-grid-cols-3 oe-gap-6 oe-mb-10">
        <div v-for="(kpi, index) in kpis" :key="index" class="oe-bg-white oe-rounded-2xl oe-p-6 oe-shadow-sm oe-border oe-border-gray-100">
          <div class="oe-flex oe-justify-between oe-items-start">
            <div>
              <p class="oe-text-sm oe-text-gray-500">{{ kpi.label }}</p>
              <p class="oe-text-4xl oe-font-semibold oe-text-gray-900 mt-2">{{ kpi.value }}</p>
            </div>
            <div :class="kpi.iconBg" class="oe-w-10 oe-h-10 oe-rounded-xl oe-flex oe-items-center oe-justify-center text-xl">{{ kpi.icon }}</div>
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="loading" class="oe-flex oe-items-center oe-justify-center oe-h-screen">
      <div class="oe-text-gray-400">Loading HR dashboard...</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useApi } from '@/composables/useApi'
import { useLoaderStore } from '@/stores/loader'

const { call } = useApi()
const loader = useLoaderStore()
const dashboardData = ref(null)
const loading = ref(true)

const kpis = computed(() => {
  if (!dashboardData.value) return []
  return [
    { label: 'Total Employees', value: dashboardData.value.total_employees || 0, icon: '👥', iconBg: 'oe-bg-blue-100' },
    { label: 'Active Onboarding', value: dashboardData.value.active_onboardings_count || 0, icon: '👤', iconBg: 'oe-bg-emerald-100' },
    { label: 'Active Exits', value: dashboardData.value.active_exits_count || 0, icon: '🚪', iconBg: 'oe-bg-rose-100' }
  ]
})

const fetchDashboardData = async () => {
  loader.show()
  loading.value = true
  try {
    const response = await call('/hr/dashboard')
    if (response) dashboardData.value = response
  } finally {
    loading.value = false
    loader.hide()
  }
}

onMounted(fetchDashboardData)
</script>
