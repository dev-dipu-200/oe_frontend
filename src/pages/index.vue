<template>
  <div class="oe-min-h-screen oe-bg-gray-50 oe-transition-colors oe-duration-300">
    <!-- Main Content -->
    <div class="oe-p-2 oe-mx-auto">
      <!-- Header -->
      <div class="oe-flex oe-justify-between oe-items-center oe-mb-8">
        <div>
          <h1 class="oe-text-3xl oe-font-semibold oe-text-gray-900">
            Dashboard
          </h1>
          <p class="oe-text-gray-500">
            Overview of onboarding & exit workflows
          </p>
        </div>
        <div class="oe-flex oe-gap-2">
          <button @click="testLoader" class="oe-bg-gray-800 oe-text-white oe-px-4 oe-py-2 oe-rounded-xl oe-text-sm hover:oe-opacity-90 transition-all">Test Loader</button>
          <button @click="testToasts" class="oe-bg-blue-600 oe-text-white oe-px-4 oe-py-2 oe-rounded-xl oe-text-sm hover:oe-bg-blue-700 transition-all">Test Toasts</button>
        </div>
      </div>

      <!-- KPI Cards -->
      <div
        class="oe-grid oe-grid-cols-1 md:oe-grid-cols-2 lg:oe-grid-cols-4 oe-gap-6 oe-mb-10"
      >
        <!-- Active Onboarding -->
        <div
          class="oe-bg-white oe-rounded-2xl oe-p-6 oe-shadow-sm oe-border oe-border-gray-100 oe-transition-colors"
        >
          <div class="oe-flex oe-justify-between oe-items-start">
            <div>
              <p class="oe-text-sm oe-text-gray-500">Active Onboarding</p>
              <p class="oe-text-4xl oe-font-semibold oe-text-gray-900 mt-2">
                4
              </p>
              <p class="oe-text-xs oe-text-emerald-600 mt-1">
                ↑ 12% vs last month
              </p>
            </div>
            <div
              class="oe-w-10 oe-h-10 oe-bg-blue-100 oe-rounded-xl oe-flex oe-items-center oe-justify-center text-xl"
            >
              👤
            </div>
          </div>
          <p class="oe-text-xs oe-text-gray-500 mt-4">
            2 in Day 1, 1 pre-onboarding
          </p>
        </div>

        <!-- Active Exits -->
        <div
          class="oe-bg-white oe-rounded-2xl oe-p-6 oe-shadow-sm oe-border oe-border-gray-100 oe-transition-colors"
        >
          <div class="oe-flex oe-justify-between oe-items-start">
            <div>
              <p class="oe-text-sm oe-text-gray-500">Active Exits</p>
              <p class="oe-text-4xl oe-font-semibold oe-text-gray-900 mt-2">
                2
              </p>
              <p class="oe-text-xs oe-text-amber-600 mt-1">
                1 in KT, 1 pending approval
              </p>
            </div>
            <div
              class="oe-w-10 oe-h-10 oe-bg-orange-100 oe-rounded-xl oe-flex oe-items-center oe-justify-center text-xl"
            >
              🚪
            </div>
          </div>
        </div>

        <!-- Pending Tasks -->
        <div
          class="oe-bg-white oe-rounded-2xl oe-p-6 oe-shadow-sm oe-border oe-border-gray-100 oe-transition-colors"
        >
          <div class="oe-flex oe-justify-between oe-items-start">
            <div>
              <p class="oe-text-sm oe-text-gray-500">Pending Tasks</p>
              <p class="oe-text-4xl oe-font-semibold oe-text-gray-900 mt-2">
                19
              </p>
              <p class="oe-text-xs oe-text-red-600 mt-1">9 due today</p>
            </div>
            <div
              class="oe-w-10 oe-h-10 oe-bg-red-100 oe-rounded-xl oe-flex oe-items-center oe-justify-center text-xl"
            >
              ⏰
            </div>
          </div>
        </div>

        <!-- Completed This Month -->
        <div
          class="oe-bg-white oe-rounded-2xl oe-p-6 oe-shadow-sm oe-border oe-border-gray-100 oe-transition-colors"
        >
          <div class="oe-flex oe-justify-between oe-items-start">
            <div>
              <p class="oe-text-sm oe-text-gray-500">Completed This Month</p>
              <p class="oe-text-4xl oe-font-semibold oe-text-gray-900 mt-2">
                12
              </p>
              <p class="oe-text-xs oe-text-emerald-600 mt-1">
                ↑ 8% improvement
              </p>
            </div>
            <div
              class="oe-w-10 oe-h-10 oe-bg-emerald-100 oe-rounded-xl oe-flex oe-items-center oe-justify-center text-xl"
            >
              ✅
            </div>
          </div>
          <p class="oe-text-xs oe-text-emerald-600 mt-4">On track</p>
        </div>
      </div>

      <!-- Main Dashboard Grid: 12 columns -->
      <div class="oe-grid oe-grid-cols-1 lg:oe-grid-cols-12 oe-gap-6">
        <!-- Active Onboarding - 8 columns -->
        <div class="lg:oe-col-span-8">
          <div class="oe-flex oe-justify-between oe-items-center oe-mb-4">
            <h2 class="oe-text-xl oe-font-semibold oe-text-gray-900">
              Active Onboarding
            </h2>
            <span
              class="oe-bg-blue-100 oe-text-blue-700 oe-px-3 oe-py-1 oe-rounded-full oe-text-xs oe-font-medium"
            >
              4 employees
            </span>
          </div>

          <div class="oe-space-y-4">
            <div
              v-for="employee in activeOnboarding"
              :key="employee.id"
              class="oe-bg-white oe-rounded-2xl oe-p-5 oe-flex oe-items-center oe-gap-4 oe-shadow-sm oe-border oe-border-gray-100 hover:oe-border-blue-200 transition-all"
            >
              <div
                class="oe-w-12 oe-h-12 oe-rounded-2xl oe-flex oe-items-center oe-justify-center oe-text-lg oe-font-semibold"
                :class="employee.bgColor"
              >
                {{ employee.initials }}
              </div>
              <div class="oe-flex-1 min-w-0">
                <div class="oe-flex oe-justify-between oe-items-start">
                  <div>
                    <p class="oe-font-semibold oe-text-gray-900">
                      {{ employee.name }}
                    </p>
                    <p class="oe-text-sm oe-text-gray-500">
                      {{ employee.role }}
                    </p>
                  </div>
                  <div class="oe-text-right oe-shrink-0">
                    <p class="oe-text-xs oe-text-gray-400">
                      {{ employee.startDate }}
                    </p>
                    <span
                      :class="employee.statusClass"
                      class="oe-inline-block oe-px-3 oe-py-1 oe-text-xs oe-font-medium oe-rounded-full mt-1"
                    >
                      {{ employee.status }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Active Exits Section -->
          <div class="lg:oe-col-span-8 oe-mt-8">
            <div class="oe-flex oe-justify-between oe-items-center oe-mb-4">
              <h2 class="oe-text-xl oe-font-semibold oe-text-gray-900">
                Active Exits
              </h2>
              <span
                class="oe-bg-amber-100 oe-text-amber-700 oe-px-3 oe-py-1 oe-rounded-full oe-text-xs oe-font-medium"
              >
                2 employees
              </span>
            </div>

            <div class="oe-grid oe-grid-cols-1 md:oe-grid-cols-2 oe-gap-6">
              <div
                v-for="exit in activeExits"
                :key="exit.id"
                class="oe-bg-white oe-rounded-2xl oe-p-6 oe-shadow-sm oe-border oe-border-gray-100 oe-transition-colors"
              >
                <div class="oe-flex oe-items-center oe-gap-4">
                  <div
                    class="oe-w-12 oe-h-12 oe-rounded-2xl oe-flex oe-items-center oe-justify-center oe-text-lg oe-font-semibold oe-bg-rose-100 oe-text-rose-700"
                  >
                    {{ exit.initials }}
                  </div>
                  <div class="oe-flex-1">
                    <p class="oe-font-semibold oe-text-gray-900">
                      {{ exit.name }}
                    </p>
                    <p class="oe-text-sm oe-text-gray-500">{{ exit.role }}</p>
                  </div>
                  <div class="oe-text-right">
                    <p class="oe-text-xs oe-text-gray-400">{{ exit.date }}</p>
                    <span
                      class="oe-inline-block oe-bg-teal-100 oe-text-teal-700 oe-px-3 oe-py-1 oe-text-xs oe-rounded-full mt-2"
                    >
                      {{ exit.phase }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Pending Tasks - 4 columns -->
        <div class="lg:oe-col-span-4">
          <div class="oe-flex oe-justify-between oe-items-center oe-mb-4">
            <h2 class="oe-text-xl oe-font-semibold oe-text-gray-900">
              Pending Tasks
            </h2>
          </div>

          <div
            class="oe-bg-white oe-rounded-2xl oe-shadow-sm oe-border oe-border-gray-100 oe-divide-y oe-overflow-hidden oe-transition-colors"
          >
            <div
              v-for="task in pendingTasks"
              :key="task.id"
              class="oe-p-5 hover:oe-bg-gray-50 transition-colors"
            >
              <div class="oe-flex oe-justify-between oe-items-start">
                <div class="oe-flex-1 pr-4">
                  <p class="oe-font-medium oe-text-gray-900 leading-tight">
                    {{ task.title }}
                  </p>
                  <p class="oe-text-sm oe-text-gray-500 mt-1">
                    {{ task.assignedTo }}
                  </p>
                </div>
                <div class="oe-text-right oe-shrink-0">
                  <span
                    :class="task.priorityClass"
                    class="oe-px-3 oe-py-1 oe-text-xs oe-font-medium oe-rounded-full"
                  >
                    {{ task.priority }}
                  </span>
                  <p class="oe-text-xs oe-text-gray-400 mt-3">{{ task.due }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useLoaderStore } from '@/stores/loader'
import { useToastStore } from '@/stores/toast'

const loader = useLoaderStore()
const toast = useToastStore()

const testLoader = () => {
  loader.show('Loading data...')
  setTimeout(() => {
    loader.hide()
    toast.success('Data loaded successfully!')
  }, 2000)
}

const testToasts = () => {
  toast.info('This is an info message')
  setTimeout(() => toast.warning('Careful! This is a warning'), 500)
  setTimeout(() => toast.error('Oops! Something went wrong'), 1000)
}

const activeOnboarding = [
  {
    id: 1,
    initials: "PS",
    name: "Priya Sharma",
    role: "Frontend Developer - Engineering",
    startDate: "Mar 25, 2026",
    status: "Active",
    bgColor: "oe-bg-blue-100 oe-text-blue-700",
    statusClass: "oe-bg-emerald-100 oe-text-emerald-700",
  },
  {
    id: 2,
    initials: "RV",
    name: "Rahul Verma",
    role: "Product Designer - Design",
    startDate: "Mar 24, 2026",
    status: "Active",
    bgColor: "oe-bg-purple-100 oe-text-purple-700",
    statusClass: "oe-bg-emerald-100 oe-text-emerald-700",
  },
  {
    id: 3,
    initials: "KM",
    name: "Karan Mehta",
    role: "Data Analyst - Analytics",
    startDate: "Mar 28, 2026",
    status: "Pending",
    bgColor: "oe-bg-amber-100 oe-text-amber-700",
    statusClass: "oe-bg-yellow-100 oe-text-yellow-700",
  },
  {
    id: 4,
    initials: "AG",
    name: "Ananya Gupta",
    role: "QA Engineer - Engineering",
    startDate: "Mar 20, 2026",
    status: "Completed",
    bgColor: "oe-bg-emerald-100 oe-text-emerald-700",
    statusClass: "oe-bg-emerald-100 oe-text-emerald-700",
  },
];

const pendingTasks = [
  {
    id: 1,
    title: "System setup – Priya Sharma",
    assignedTo: "Assigned to Network Team",
    priority: "high",
    priorityClass: "oe-bg-red-100 oe-text-red-700",
    due: "Today",
  },
  {
    id: 2,
    title: "Email creation approval – Priya Sharma",
    assignedTo: "Assigned to Neel Sir",
    priority: "high",
    priorityClass: "oe-bg-red-100 oe-text-red-700",
    due: "Today",
  },
  {
    id: 3,
    title: "Biometric & iClock setup – Priya Sharma",
    assignedTo: "Assigned to Ankur",
    priority: "high",
    priorityClass: "oe-bg-red-100 oe-text-red-700",
    due: "Today",
  },
  {
    id: 4,
    title: "Keka account creation – Rahul Verma",
    assignedTo: "Assigned to HR",
    priority: "medium",
    priorityClass: "oe-bg-yellow-100 oe-text-yellow-700",
    due: "Tomorrow",
  },
];

const activeExits = [
  {
    id: 1,
    initials: "VS",
    name: "Vikram Singh",
    role: "Backend Developer - Engineering",
    date: "Apr 15, 2026",
    phase: "Phase 3 – Knowledge Transfer",
  },
  {
    id: 2,
    initials: "MP",
    name: "Meera Patel",
    role: "HR Executive",
    date: "Apr 20, 2026",
    phase: "Pending",
  },
];
</script>
