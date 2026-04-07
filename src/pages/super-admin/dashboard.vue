<template>
  <div class="oe-min-h-screen oe-bg-gray-50 oe-transition-colors oe-duration-300">
    <div class="oe-p-6 oe-mx-auto">
      <div class="oe-flex oe-justify-between oe-items-center oe-mb-8">
        <div>
          <h1 class="oe-text-3xl oe-font-semibold oe-text-gray-900">Super Admin Dashboard</h1>
          <p class="oe-text-gray-500">System-wide overview of employees and users</p>
        </div>
        <div class="oe-flex oe-gap-3">
          <button
            @click="isFilterDrawerOpen = true"
            class="oe-flex oe-items-center oe-gap-2 oe-bg-white oe-border oe-border-gray-200 oe-px-4 oe-py-2 oe-rounded-xl oe-text-sm hover:oe-bg-gray-50 transition-all"
          >
            <span>🔽</span>
            <span>Filter</span>
          </button>
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
        </div>
      </div>

      <FilterDrawer
        v-model:is-open="isFilterDrawerOpen"
        :initial-filters="currentFilters"
        @filter="handleFilter"
        @reset="handleReset"
      />

      <!-- OVERVIEW TAB -->
      <div v-if="activeTab === 'overview'">
        <div v-if="dashboardData">
          <!-- Process KPI Cards -->
          <div class="oe-grid oe-grid-cols-1 md:oe-grid-cols-2 lg:oe-grid-cols-4 oe-gap-6 oe-mb-6">
            <div v-for="(kpi, index) in processKpis" :key="`process-${index}`" class="oe-bg-white oe-rounded-2xl oe-p-6 oe-shadow-sm oe-border oe-border-gray-100">
              <div class="oe-flex oe-justify-between oe-items-start">
                <div>
                  <p class="oe-text-sm oe-text-gray-500">{{ kpi.label }}</p>
                  <p class="oe-text-4xl oe-font-semibold oe-text-gray-900 mt-2">{{ kpi.value }}</p>
                </div>
                <div :class="kpi.iconBg" class="oe-w-10 oe-h-10 oe-rounded-xl oe-flex oe-items-center oe-justify-center text-xl">{{ kpi.icon }}</div>
              </div>
            </div>
          </div>

          <!-- KPI Cards -->
          <div class="oe-grid oe-grid-cols-1 md:oe-grid-cols-2 lg:oe-grid-cols-5 oe-gap-6 oe-mb-10">
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

          <!-- Employee-wise Counts -->
          <div class="oe-bg-white oe-rounded-2xl oe-shadow-sm oe-border oe-border-gray-100 oe-overflow-hidden">
            <div class="oe-p-6 oe-border-b oe-border-gray-100">
              <h2 class="oe-text-lg oe-font-semibold oe-text-gray-900">Employee-wise Task Counts</h2>
            </div>
            <div v-if="employeeWiseCounts.length > 0" class="oe-overflow-x-auto">
              <table class="oe-min-w-full oe-text-sm">
                <thead class="oe-bg-gray-50 oe-text-gray-600">
                  <tr>
                    <th class="oe-text-left oe-px-6 oe-py-3">Employee</th>
                    <th class="oe-text-right oe-px-4 oe-py-3">Pending</th>
                    <th class="oe-text-right oe-px-4 oe-py-3">In Progress</th>
                    <th class="oe-text-right oe-px-4 oe-py-3">Hold</th>
                    <th class="oe-text-right oe-px-4 oe-py-3">Done</th>
                    <th class="oe-text-right oe-px-6 oe-py-3">Total</th>
                  </tr>
                </thead>
                <tbody class="oe-divide-y oe-divide-gray-100">
                  <tr v-for="row in employeeWiseCounts" :key="row.employee_id">
                    <td class="oe-px-6 oe-py-4 oe-font-medium oe-text-gray-900">{{ row.employee_name }}</td>
                    <td class="oe-px-4 oe-py-4 oe-text-right">{{ row.pending }}</td>
                    <td class="oe-px-4 oe-py-4 oe-text-right">{{ row.inprogress }}</td>
                    <td class="oe-px-4 oe-py-4 oe-text-right">{{ row.hold }}</td>
                    <td class="oe-px-4 oe-py-4 oe-text-right">{{ row.done }}</td>
                    <td class="oe-px-6 oe-py-4 oe-text-right oe-font-semibold">{{ row.total }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div v-else class="oe-p-6 oe-text-gray-500">No employee task data available.</div>
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
import FilterDrawer from '@/components/FilterDrawer.vue'

const { call } = useApi()
const loader = useLoaderStore()
const dashboardData = ref(null)
const loading = ref(true)
const activeTab = ref('overview')
const isFilterDrawerOpen = ref(false)
const currentFilters = ref({
  keyword: '',
  from_date: '',
  to_date: '',
  department: '',
  task_status: '',
  is_paginate: true,
  page: 1,
  page_size: 10
})

const getDashboardFilters = (filters) => {
  const payload = {
    ...filters
  }
  Object.keys(payload).forEach((key) => {
    const value = payload[key]
    if (value === '' || value === null || value === undefined) {
      delete payload[key]
    }
  })
  return payload
}

const normalizeDashboardPayload = (payload) => {
  const data = payload?.data && typeof payload.data === 'object' ? payload.data : payload
  if (!data || typeof data !== 'object') return null
  const employeeCounts = Array.isArray(data.employee_wise_counts)
    ? data.employee_wise_counts
    : Array.isArray(data.employee_wise_counts?.employees)
      ? data.employee_wise_counts.employees
      : []

  return {
    process_counts: {
      total_onboarding_process: Number(data.process_counts?.total_onboarding_process) || 0,
      total_exit_process: Number(data.process_counts?.total_exit_process) || 0,
      total_onboarding_done: Number(data.process_counts?.total_onboarding_done) || 0,
      total_exit_done: Number(data.process_counts?.total_exit_done) || 0
    },
    task_counts: {
      pending: Number(data.task_counts?.pending) || 0,
      inprogress: Number(data.task_counts?.inprogress) || 0,
      hold: Number(data.task_counts?.hold) || 0,
      done: Number(data.task_counts?.done) || 0,
      total: Number(data.task_counts?.total) || 0
    },
    employee_wise_counts: employeeCounts
  }
}

const processKpis = computed(() => {
  if (!dashboardData.value) return []
  return [
    { label: 'Onboarding Process', value: dashboardData.value.process_counts.total_onboarding_process, icon: '🧩', iconBg: 'oe-bg-indigo-100' },
    { label: 'Exit Process', value: dashboardData.value.process_counts.total_exit_process, icon: '🚪', iconBg: 'oe-bg-rose-100' },
    { label: 'Onboarding Done', value: dashboardData.value.process_counts.total_onboarding_done, icon: '✅', iconBg: 'oe-bg-emerald-100' },
    { label: 'Exit Done', value: dashboardData.value.process_counts.total_exit_done, icon: '🏁', iconBg: 'oe-bg-cyan-100' }
  ]
})

const kpis = computed(() => {
  if (!dashboardData.value) return []
  return [
    { label: 'Pending', value: dashboardData.value.task_counts.pending, icon: '⏳', iconBg: 'oe-bg-amber-100' },
    { label: 'In Progress', value: dashboardData.value.task_counts.inprogress, icon: '⚙️', iconBg: 'oe-bg-blue-100' },
    { label: 'On Hold', value: dashboardData.value.task_counts.hold, icon: '⏸️', iconBg: 'oe-bg-slate-100' },
    { label: 'Done', value: dashboardData.value.task_counts.done, icon: '✅', iconBg: 'oe-bg-emerald-100' },
    { label: 'Total', value: dashboardData.value.task_counts.total, icon: '📊', iconBg: 'oe-bg-violet-100' }
  ]
})

const employeeWiseCounts = computed(() => dashboardData.value?.employee_wise_counts || [])

const handleFilter = (filters) => {
  currentFilters.value = {
    ...currentFilters.value,
    ...filters
  }
  fetchDashboardData()
}

const handleReset = () => {
  currentFilters.value = {
    keyword: '',
    from_date: '',
    to_date: '',
    department: '',
    task_status: '',
    is_paginate: true,
    page: 1,
    page_size: 10
  }
  fetchDashboardData()
}

const fetchDashboardData = async () => {
  loader.show()
  loading.value = true
  try {
    const response = await call('/super-admin/dashboard', {
      params: getDashboardFilters(currentFilters.value)
    })
    if (response) dashboardData.value = normalizeDashboardPayload(response)
  } finally {
    loading.value = false
    loader.hide()
  }
}

onMounted(fetchDashboardData)
</script>
