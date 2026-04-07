<template>
  <div class="oe-min-h-screen oe-bg-gray-50 oe-transition-colors oe-duration-300">
    <div class="oe-p-6 oe-mx-auto max-w-7xl">
      <!-- Header -->
      <div class="oe-flex oe-justify-between oe-items-start mb-8">
        <div>
          <h1 class="oe-text-3xl oe-font-semibold oe-text-gray-900">Task Queue</h1>
          <p class="oe-text-gray-500">All pending actions across onboarding & exit workflows</p>
        </div>
      </div>

      <!-- Tabs -->
      <div class="oe-flex oe-gap-2 oe-mb-8 flex-wrap">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          @click="activeTab = tab.key"
          :class="[
            'oe-px-5 oe-py-2.5 oe-text-sm oe-font-medium oe-rounded-2xl oe-transition-all',
            activeTab === tab.key
              ? 'oe-bg-blue-600 oe-text-white shadow-md'
              : 'oe-bg-white oe-border oe-border-gray-200 oe-text-gray-600 hover:oe-bg-gray-50'
          ]"
        >
          {{ tab.label }}
          <!-- <span v-if="tab.count" class="oe-ml-2 oe-text-xs oe-bg-white/30 oe-px-2 oe-py-0.5 oe-rounded-full">
            {{ tab.count }}
          </span> -->
        </button>
      </div>

      <!-- Search & Filter -->
      <div class="oe-flex oe-gap-4 oe-mb-8">
        <div class="oe-flex-1 oe-relative">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search tasks or employees..."
            class="oe-w-1/4 oe-bg-white oe-border oe-border-gray-200 oe-rounded-2xl oe-pl-12 oe-py-3.5 oe-text-sm focus:oe-outline-none focus:oe-border-blue-500"
          />
          <div class="oe-absolute oe-left-5 oe-top-1/4 -translate-y-1/2 text-gray-400">🔍</div>
        </div>
        <button
          @click="isFilterDrawerOpen = true"
          class="oe-flex oe-items-center oe-gap-2 oe-bg-white oe-border oe-border-gray-200 oe-px-6 oe-rounded-2xl hover:oe-bg-gray-50"
        >
          <span>🔽</span>
          <span class="oe-font-medium">Filter</span>
        </button>
      </div>

      <FilterDrawer
        v-model:is-open="isFilterDrawerOpen"
        :initial-filters="currentFilters"
        @filter="handleFilter"
        @reset="handleReset"
      />

      <!-- Loading -->
      <div v-if="loading" class="oe-text-center oe-py-12 text-gray-500">
        Loading tasks...
      </div>

      <!-- Task List - Phase Wise -->
      <div v-else class="oe-space-y-10">
        <!-- Group by Phase -->
        <div v-for="(phaseGroup, phaseName) in groupedTasks" :key="phaseName" class="oe-space-y-4">
          <div class="oe-flex oe-items-center oe-gap-3">
            <h2 class="oe-text-lg oe-font-semibold oe-text-gray-800">{{ phaseName }}</h2>
            <span class="oe-bg-gray-100 oe-text-gray-600 oe-px-3 oe-py-1 oe-text-xs oe-rounded-full">
              {{ phaseGroup.length }} tasks
            </span>
          </div>

          <div class="oe-space-y-4">
            <div
              v-for="task in phaseGroup"
              :key="task.id"
              class="oe-bg-white oe-rounded-3xl oe-overflow-hidden oe-border oe-border-gray-100 hover:oe-shadow-md transition-all"
            >
              <div class="oe-flex oe-justify-between oe-items-center oe-px-6 oe-py-5">
                <!-- Left Info -->
                <div class="oe-flex oe-items-center oe-gap-4">
                  <div class="oe-flex-shrink-0">
                    <div class="oe-w-9 oe-h-9 oe-rounded-2xl oe-bg-blue-100 oe-flex oe-items-center oe-justify-center text-xl">
                      📋
                    </div>
                  </div>
                  <div>
                    <p class="oe-font-semibold oe-text-gray-900">{{ task.task_name }}</p>
                    <p class="oe-text-sm oe-text-gray-500 mt-1">
                      {{ task.phase?.process?.employee?.first_name }} {{ task.phase?.process?.employee?.last_name }}
                      • {{ task.phase?.phase_name }}
                    </p>
                  </div>
                </div>

                <!-- Right Side -->
                <div class="oe-flex oe-items-center oe-gap-6">
                  <span class="oe-bg-blue-100 oe-text-blue-700 oe-px-4 oe-py-1.5 oe-text-xs oe-font-medium oe-rounded-2xl">
                    {{ task.assigned_role || 'SUPER_ADMIN' }}
                  </span>

                  <div class="oe-text-sm oe-text-gray-500">
                    {{ formatDate(task.created_at) }}
                  </div>

                  <span
                    :class="[
                      'oe-px-5 oe-py-2 oe-text-xs oe-font-medium oe-rounded-2xl',
                      task.status === 'inprogress' ? 'oe-bg-blue-100 oe-text-blue-700' :
                      task.status === 'done' ? 'oe-bg-green-100 oe-text-green-700' :
                      'oe-bg-gray-100 oe-text-gray-600'
                    ]"
                  >
                    {{ task.status === 'inprogress' ? 'In Progress' :
                       task.status === 'done' ? 'Completed' : 'Pending' }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="Object.keys(groupedTasks).length === 0" class="oe-bg-white oe-rounded-3xl oe-py-16 oe-text-center oe-text-gray-400">
          No tasks found matching your filters.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useTasksApi } from '@/apis/tasks'
import { useToastStore } from '@/stores/toast'
import FilterDrawer from "@/components/FilterDrawer.vue";

const activeTab = ref('all')
const searchQuery = ref('')
const tasks = ref([])
const loading = ref(false)

const isFilterDrawerOpen = ref(false);

const currentFilters = ref({
  keyword: "",
  from_date: "",
  to_date: "",
  is_paginate: true,
  page: 1,
  page_size: 10,
});

// ====================== CLEAN FILTERS (Fix for 422) ======================
const getCleanFilters = (filters) => {
  const payload = {};
  if (filters.keyword?.trim()) payload.keyword = filters.keyword.trim();
  if (filters.from_date) payload.from_date = filters.from_date;
  if (filters.to_date) payload.to_date = filters.to_date;

  payload.is_paginate = Boolean(filters.is_paginate);
  if (payload.is_paginate) {
    payload.page = Number(filters.page) || 1;
    payload.page_size = Number(filters.page_size) || 10;
  }
  return payload;
};

const handleFilter = (filters) => {
  currentFilters.value = { ...filters };
  fetchTasks();
};

const handleReset = () => {
  currentFilters.value = {
    keyword: "",
    from_date: "",
    to_date: "",
    is_paginate: true,
    page: 1,
    page_size: 10,
  };
  fetchTasks();
};

// ====================== FETCH TASKS ======================
const fetchTasks = async () => {
  loading.value = true;
  const toastStore = useToastStore();
  const { fetchTasks } = useTasksApi();

  try {
    const cleanFilters = getCleanFilters(currentFilters.value);

    const params = {
      ...cleanFilters,
      status: activeTab.value === 'all' ? undefined : activeTab.value,
      q: searchQuery.value?.trim() || undefined,
    };

    Object.keys(params).forEach(key => {
      if (params[key] === undefined) delete params[key];
    });

    const response = await fetchTasks(params);
    
    tasks.value = response?.data?.tasks || [];
  } catch (error) {
    console.error('Error fetching tasks:', error);
    toastStore.addToast({
      message: 'Failed to fetch tasks.',
      type: 'error',
    });
    tasks.value = [];
  } finally {
    loading.value = false;
  }
};

const groupedTasks = computed(() => {
  const grouped = {};
  
  tasks.value.forEach(task => {
    const phaseName = task.phase?.phase_name || 'Uncategorized';
    if (!grouped[phaseName]) grouped[phaseName] = [];
    grouped[phaseName].push(task);
  });
  return grouped;
});

// ====================== TABS (Fixed) ======================
const tabs = computed(() => {
  const allTasks = tasks.value || [];
  return [
    { key: 'all',       label: 'All',        count: allTasks.length },
    { key: 'inprogress', label: 'In Progress', count: allTasks.filter(t => t.status === 'inprogress').length },
    { key: 'pending',   label: 'Pending',    count: allTasks.filter(t => t.status === 'pending').length },
    { key: 'hold',      label: 'On Hold',    count: allTasks.filter(t => t.status === 'hold').length },
    { key: 'done',      label: 'Completed',  count: allTasks.filter(t => t.status === 'done').length },
  ];
});

const formatDate = (dateStr) => {
  if (!dateStr) return 'N/A';
  return new Intl.DateTimeFormat('en-IN', { 
    day: 'numeric', 
    month: 'short' 
  }).format(new Date(dateStr));
};

onMounted(() => fetchTasks());
watch([activeTab, searchQuery], fetchTasks);
</script>