<template>
  <div class="oe-min-h-screen oe-bg-gray-50 oe-transition-colors oe-duration-300">
    <div class="oe-p-6 oe-mx-auto max-w-7xl">
      <!-- Header -->
      <div class="oe-flex oe-justify-between oe-items-start mb-8">
        <div>
          <h1 class="oe-text-3xl oe-font-semibold oe-text-gray-900">
            Task Queue
          </h1>
          <p class="oe-text-gray-500">
            All pending actions across onboarding & exit workflows
          </p>
        </div>
      </div>

      <!-- Tabs -->
      <div class="oe-flex oe-gap-2 oe-mb-8 flex-wrap">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          @click="activeTab = tab.key"
          :class="[
            'oe-px-4 oe-py-2 oe-text-sm oe-font-medium oe-rounded-2xl oe-transition-all',
            activeTab === tab.key
              ? 'oe-bg-blue-600 oe-text-white shadow-md'
              : 'oe-bg-white oe-border oe-border-gray-200 oe-text-gray-600 hover:oe-bg-gray-50'
          ]"
        >
          {{ tab.label }}
          <span
            v-if="tab.count"
            class="oe-ml-2 oe-text-xs oe-bg-white/30 oe-px-2 oe-py-0.5 oe-rounded-full"
          >
            {{ tab.count }}
          </span>
        </button>
      </div>

      <!-- Search & Filter -->
      <div class="oe-flex oe-gap-4 oe-mb-8">
        <div class="oe-flex-1 oe-relative">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Search tasks or employees..."
            class="oe-w-full oe-bg-white oe-border oe-border-gray-200 oe-rounded-2xl oe-pl-12 oe-py-3.5 oe-text-sm focus:oe-outline-none focus:oe-border-blue-500 oe-transition-colors"
          />
          <div class="oe-absolute oe-left-5 oe-top-1/2 -translate-y-1/2 text-gray-400">
            🔍
          </div>
        </div>
        <button
          @click="handleFilterClick"
          class="oe-flex oe-items-center oe-gap-2 oe-bg-white oe-border oe-border-gray-200 oe-px-6 oe-rounded-2xl hover:oe-bg-gray-50 oe-transition-colors"
        >
          <span>🔽</span>
          <span class="oe-font-medium">Filter</span>
        </button>
      </div>

      <!-- Loading Indicator -->
      <div v-if="loading" class="oe-text-center oe-py-8">
        Loading tasks...
      </div>

      <!-- Task List -->
      <div v-else-if="tasks.length > 0" class="oe-space-y-4">
        <div
          v-for="(task, index) in tasks"
          :key="index"
          class="oe-bg-white oe-rounded-3xl oe-overflow-hidden oe-border oe-border-gray-100 oe-transition-all hover:oe-shadow-md"
        >
          <div class="oe-flex oe-justify-between oe-items-center oe-px-6 oe-py-5">
            <!-- Left: Icon + Info -->
            <div class="oe-flex oe-items-center oe-gap-4">
              <div class="oe-flex-shrink-0">
                <div
                  v-if="task.status === 'overdue'"
                  class="oe-w-5 oe-h-5 oe-rounded-full oe-bg-red-100 oe-flex oe-items-center oe-justify-center text-2xl"
                >
                  ⚠️
                </div>
                <div
                  v-else-if="task.status === 'in-progress'"
                  class="oe-w-5 oe-h-5 oe-rounded-full oe-bg-blue-100 oe-flex oe-items-center oe-justify-center text-2xl"
                >
                  ⏳
                </div>
                <div
                  v-else
                  class="oe-w-5 oe-h-5 oe-rounded-full oe-border-2 oe-border-gray-300 flex oe-items-center oe-justify-center"
                >
                  <span class="oe-text-gray-400 text-xl"></span>
                </div>
              </div>

              <div>
                <p class="oe-font-semibold oe-text-gray-900 oe-text-[17px]">
                  {{ task.title }}
                </p>
                <p class="oe-text-sm oe-text-gray-500 mt-1">
                  {{ task.employee }} • {{ task.day }}
                  <span class="oe-text-gray-400 mx-1">•</span>
                  Assigned to <span class="oe-font-medium oe-text-gray-700">{{ task.assignedTo }}</span>
                </p>
              </div>
            </div>

            <!-- Right: Tags + Status -->
            <div class="oe-flex oe-items-center oe-gap-6">
              <!-- Workflow -->
              <span
                class="oe-bg-blue-100 oe-text-blue-700 oe-px-5 oe-py-2 oe-text-xs oe-font-medium oe-rounded-2xl"
              >
                {{ task.workflow }}
              </span>

              <!-- Date -->
              <div class="oe-text-sm oe-text-gray-500 whitespace-nowrap">
                {{ task.date }}
              </div>

              <!-- Status Badge -->
              <span
                :class="[
                  'oe-px-5 oe-py-2 oe-text-xs oe-font-medium oe-rounded-2xl',
                  task.status === 'overdue' ? 'oe-bg-red-100 oe-text-red-700' :
                  task.status === 'in-progress' ? 'oe-bg-blue-100 oe-text-blue-700' :
                  'oe-bg-gray-100 oe-text-gray-600'
                ]"
              >
                {{ task.status === 'overdue' ? 'Overdue' :
                   task.status === 'in-progress' ? 'In Progress' :
                   'Pending' }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div
        v-else
        class="oe-bg-white oe-rounded-3xl oe-py-16 oe-text-center oe-text-gray-400"
      >
        No tasks found
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useTasksApi } from '@/apis/tasks' // Import the new tasks API composable
import { useToastStore } from '@/stores/toast'

const activeTab = ref('all')
const searchQuery = ref('')
const tasks = ref([])
const loading = ref(false)

const tabs = [
  { key: 'all', label: 'All', count: 0 },
  { key: 'overdue', label: 'Overdue', count: 0 },
  { key: 'in-progress', label: 'In Progress', count: 0 },
  { key: 'pending', label: 'Pending', count: 0 },
  { key: 'completed', label: 'Completed', count: 0 },
]

const fetchTasks = async () => {
  loading.value = true
  const toastStore = useToastStore()
  const { fetchTasks } = useTasksApi() // Initialize the tasks API composable

  try {
    const params = {
      status: activeTab.value === 'all' ? undefined : activeTab.value,
      q: searchQuery.value || undefined,
    }

    const response = await fetchTasks(params) // Use the fetchTasks from the composable

    if (response) {
      tasks.value = response
    } else {
      tasks.value = []
    }
  } catch (error) {
    console.error('Error fetching tasks in component:', error)
    toastStore.addToast({
        message: 'Failed to fetch tasks.',
        type: 'error',
    });
    tasks.value = []
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchTasks()
})

watch([activeTab, searchQuery], () => {
  fetchTasks()
})

const filteredTasks = computed(() => {
  return tasks.value
})

const handleFilterClick = () => {
  console.log('Filter button clicked. Implement more advanced filtering UI here.')
  useToastStore().addToast({
    message: 'Advanced filter options coming soon!',
    type: 'info',
  });
}
</script>