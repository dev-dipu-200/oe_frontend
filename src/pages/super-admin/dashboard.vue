<template>
  <div class="oe-min-h-screen oe-bg-gray-50 oe-transition-colors oe-duration-300">
    <div class="oe-p-6 oe-mx-auto">
      <div class="oe-flex oe-justify-between oe-items-center oe-mb-8">
        <div>
          <h1 class="oe-text-3xl oe-font-semibold oe-text-gray-900">Super Admin Dashboard</h1>
          <p class="oe-text-gray-500">System-wide overview of employees and users</p>
        </div>
        <div class="oe-flex oe-gap-3">
          <div class="oe-flex oe-bg-white oe-p-1 oe-rounded-2xl oe-border oe-border-slate-200">
            <button
              @click="activeTab = 'overview'"
              class="oe-px-6 oe-py-2 oe-text-sm oe-font-medium oe-rounded-xl oe-transition-all"
              :class="activeTab === 'overview' ? 'oe-bg-slate-900 oe-text-white' : 'oe-text-slate-600 hover:oe-bg-slate-50'"
            >
              Overview
            </button>
            <button
              @click="activeTab = 'phases'"
              class="oe-px-6 oe-py-2 oe-text-sm oe-font-medium oe-rounded-xl oe-transition-all"
              :class="activeTab === 'phases' ? 'oe-bg-slate-900 oe-text-white' : 'oe-text-slate-600 hover:oe-bg-slate-50'"
            >
              Manage Phases
            </button>
          </div>
          <button v-if="activeTab === 'overview'" @click="fetchDashboardData" class="oe-bg-blue-600 oe-text-white oe-px-4 oe-py-2 oe-rounded-xl oe-text-sm hover:oe-bg-blue-700 transition-all">Refresh Data</button>
        </div>
      </div>

      <!-- OVERVIEW TAB -->
      <div v-if="activeTab === 'overview'">
        <div v-if="dashboardData">
          <!-- KPI Cards -->
          <div class="oe-grid oe-grid-cols-1 md:oe-grid-cols-2 lg:oe-grid-cols-4 oe-gap-6 oe-mb-10">
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

          <!-- Main Lists -->
          <div class="oe-grid oe-grid-cols-1 lg:oe-grid-cols-12 oe-gap-6">
            <div class="lg:oe-col-span-8">
              <div v-if="dashboardData.active_onboardings && dashboardData.active_onboardings.length > 0" class="oe-mb-8">
                 <h2 class="oe-text-xl oe-font-semibold oe-text-gray-900 oe-mb-4">Active Onboarding</h2>
                 <div class="oe-grid oe-grid-cols-1 md:oe-grid-cols-2 oe-gap-4">
                    <div v-for="emp in dashboardData.active_onboardings" :key="emp.id" class="oe-bg-white oe-rounded-2xl oe-p-5 oe-flex oe-items-center oe-gap-4 oe-shadow-sm oe-border oe-border-gray-100">
                       <div class="oe-w-12 oe-h-12 oe-rounded-2xl oe-bg-blue-100 oe-text-blue-700 oe-flex oe-items-center oe-justify-center oe-font-bold">{{ emp.first_name[0] }}</div>
                       <div class="oe-flex-1">
                          <p class="oe-font-semibold oe-text-gray-900">{{ emp.first_name }} {{ emp.last_name }}</p>
                          <p class="oe-text-sm oe-text-gray-500">{{ emp.department }} | {{ emp.designation }}</p>
                       </div>
                    </div>
                 </div>
              </div>
              <div v-else class="oe-bg-white oe-rounded-[2rem] oe-p-12 oe-text-center oe-border oe-border-dashed oe-border-slate-200">
                <p class="oe-text-slate-400">No active onboardings at the moment.</p>
              </div>
            </div>
          </div>
        </div>
        <div v-else-if="loading" class="oe-flex oe-items-center oe-justify-center oe-h-64">
          <div class="oe-animate-spin oe-w-8 oe-h-8 oe-border-4 oe-border-blue-600 oe-border-t-transparent oe-rounded-full"></div>
          <span class="oe-ml-3 oe-text-gray-500">Loading super admin dashboard...</span>
        </div>
      </div>

      <!-- PHASES TAB -->
      <div v-if="activeTab === 'phases'">
        <PhaseForm basePath="super-admin" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useApi } from '@/composables/useApi'
import { useLoaderStore } from '@/stores/loader'
import PhaseForm from '@/components/PhaseForm.vue'

const { call } = useApi()
const loader = useLoaderStore()
const dashboardData = ref(null)
const loading = ref(true)
const activeTab = ref('overview')

const kpis = computed(() => {
  if (!dashboardData.value) return []
  return [
    { label: 'Total Employees', value: dashboardData.value.total_employees || 0, icon: '👥', iconBg: 'oe-bg-blue-100' },
    { label: 'Active Onboardings', value: dashboardData.value.active_onboardings?.length || 0, icon: '👤', iconBg: 'oe-bg-emerald-100' },
    { label: 'Active Exits', value: dashboardData.value.active_exits?.length || 0, icon: '🚪', iconBg: 'oe-bg-rose-100' },
    { label: 'Total Users', value: dashboardData.value.total_users || 0, icon: '🔐', iconBg: 'oe-bg-purple-100' }
  ]
})

const fetchDashboardData = async () => {
  loader.show()
  loading.value = true
  try {
    const response = await call('/super-admin/dashboard')
    if (response) dashboardData.value = response
  } finally {
    loading.value = false
    loader.hide()
  }
}

onMounted(fetchDashboardData)
</script>
