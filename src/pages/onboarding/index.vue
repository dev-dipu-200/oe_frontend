<template>
  <div class="oe-min-h-screen oe-bg-gray-50 dark:oe-bg-gray-900 oe-transition-colors oe-duration-300">
    <div class="oe-p-2 oe-mx-auto">
      <!-- Header -->
      <div class="oe-flex oe-justify-between oe-items-start mb-8">
        <div>
          <h1 class="oe-text-3xl oe-font-semibold oe-text-gray-900 dark:oe-text-white">Onboarding</h1>
          <p class="oe-text-gray-500 dark:oe-text-gray-400">Manage new employee onboarding workflows</p>
        </div>
        <button class="oe-bg-blue-600 hover:oe-bg-blue-700 oe-text-white oe-px-6 oe-py-3 oe-rounded-xl oe-flex oe-items-center oe-gap-2 oe-font-medium transition-colors shadow-lg shadow-blue-500/20">
          <span class="text-xl">👤</span>
          New Onboarding
        </button>
      </div>

      <!-- Search & Filter -->
      <div class="oe-flex oe-gap-4 oe-mb-8">
        <div class="oe-flex-1 oe-relative">
          <input
            type="text"
            placeholder="Search employees..."
            class="oe-w-full oe-bg-white dark:oe-bg-gray-800 oe-border oe-border-gray-200 dark:oe-border-gray-700 oe-rounded-2xl oe-pl-12 oe-py-3 oe-text-sm focus:oe-outline-none focus:oe-border-blue-500 dark:oe-text-white oe-transition-colors"
          />
          <div class="oe-absolute oe-left-5 oe-top-1/2 -translate-y-1/2 text-gray-400">
            🔍
          </div>
        </div>
        <button class="oe-flex oe-items-center oe-gap-2 oe-bg-white dark:oe-bg-gray-800 oe-border oe-border-gray-200 dark:oe-border-gray-700 oe-px-6 oe-rounded-2xl hover:oe-bg-gray-50 dark:hover:oe-bg-gray-700 dark:oe-text-white oe-transition-colors">
          <span>🔽</span>
          <span class="oe-font-medium">Filter</span>
        </button>
      </div>

      <!-- Employees List -->
      <div class="oe-bg-white dark:oe-bg-gray-800 oe-rounded-3xl oe-shadow-sm oe-overflow-hidden oe-mb-10 oe-border dark:oe-border-gray-700 oe-transition-colors">
        <div v-for="employee in employees" :key="employee.id" 
             class="oe-px-8 oe-py-6 oe-flex oe-items-center oe-gap-6 hover:oe-bg-gray-50 dark:hover:oe-bg-gray-700/50 oe-border-b dark:oe-border-gray-700 last:oe-border-b-0 oe-transition-colors">
          <div class="oe-w-11 oe-h-11 oe-rounded-2xl oe-flex oe-items-center oe-justify-center oe-text-lg oe-font-semibold flex-shrink-0"
               :class="employee.avatarBg">
            {{ employee.initials }}
          </div>

          <div class="oe-flex-1">
            <div class="oe-flex oe-justify-between">
              <div>
                <p class="oe-font-semibold oe-text-gray-900 dark:oe-text-white">{{ employee.name }}</p>
                <p class="oe-text-sm oe-text-gray-500 dark:oe-text-gray-400">{{ employee.role }}</p>
              </div>

              <div class="oe-text-right">
                <div class="oe-flex oe-items-center oe-gap-2 oe-justify-end">
                  <span class="oe-text-gray-400 text-sm">📅</span>
                  <span class="oe-text-sm oe-text-gray-500 dark:oe-text-gray-400">{{ employee.date }}</span>
                </div>
                <div class="oe-mt-2">
                  <span :class="employee.statusClass" 
                        class="oe-px-4 oe-py-1 oe-text-xs oe-font-medium oe-rounded-full">
                    {{ employee.status }}
                  </span>
                </div>
                <p class="oe-text-xs oe-text-gray-400 mt-1">{{ employee.phase }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Workflow Section -->
      <div class="oe-bg-white dark:oe-bg-gray-800 oe-rounded-3xl oe-shadow-sm oe-p-8 oe-border dark:oe-border-gray-700 oe-transition-colors">
        <div class="oe-flex oe-justify-between oe-items-center oe-mb-6">
          <div class="oe-flex oe-items-center oe-gap-3">
            <span class="oe-bg-blue-100 dark:oe-bg-blue-900/40 oe-text-blue-700 dark:oe-text-blue-300 oe-px-4 oe-py-1.5 oe-rounded-lg oe-text-sm oe-font-medium">
              Workflow: Priya Sharma
            </span>
            <span class="oe-ml-2 oe-bg-blue-100 dark:oe-bg-blue-900/40 oe-text-blue-700 dark:oe-text-blue-300 oe-px-4 oe-py-1.5 oe-rounded-lg oe-text-sm oe-font-medium">
              Day 1
            </span>
          </div>
          <div class="oe-text-sm oe-text-gray-500 dark:oe-text-gray-400">
            <span class="oe-font-medium">7/33 tasks</span>
            <span class="oe-text-blue-600 dark:oe-text-blue-400 ml-2">1 in progress</span>
          </div>
        </div>

        <p class="oe-text-gray-600 dark:oe-text-gray-400 mb-10">Complete onboarding workflow from pre-joining to 15-day follow-up</p>

        <!-- Phases Grid - 6 columns each -->
        <div class="oe-grid oe-grid-cols-1 lg:oe-grid-cols-12 oe-gap-6">

          <!-- Phase 1 -->
          <div class="lg:oe-col-span-6">
            <div class="oe-border oe-border-gray-200 dark:oe-border-gray-700 oe-rounded-3xl overflow-hidden oe-transition-colors">
              <div 
                @click="togglePhase(1)"
                class="oe-flex oe-items-center oe-justify-between oe-px-6 oe-py-5 cursor-pointer hover:oe-bg-gray-50 dark:hover:oe-bg-gray-700/50">
                <div class="oe-flex oe-items-center oe-gap-4">
                  <div class="oe-w-8 oe-h-8 oe-bg-emerald-100 dark:oe-bg-emerald-900/40 oe-text-emerald-600 dark:oe-text-emerald-400 oe-rounded-2xl oe-flex oe-items-center oe-justify-center text-2xl">✅</div>
                  <div>
                    <p class="oe-font-semibold dark:oe-text-white">Phase 1: Pre-Onboarding</p>
                    <p class="oe-text-xs oe-text-gray-500 dark:oe-text-gray-400">Post offer acceptance — T-2 working days before joining</p>
                  </div>
                </div>
                <div class="oe-flex oe-items-center oe-gap-3">
                  <span class="oe-text-sm oe-font-medium text-gray-500 dark:oe-text-gray-400">5/5</span>
                  <span class="oe-text-2xl transition-transform duration-200 dark:oe-text-gray-400" :class="{ 'oe-rotate-180': openPhases[1] }">▼</span>
                </div>
              </div>

              <!-- Progress Bar -->
              <div class="oe-px-6">
                <div class="oe-h-2 oe-bg-gray-100 dark:oe-bg-gray-700 oe-rounded-full overflow-hidden">
                  <div class="oe-h-full oe-bg-green-500 oe-rounded-full" style="width: 100%"></div>
                </div>
              </div>

              <div v-if="openPhases[1]" class="oe-px-6 oe-pb-6 oe-space-y-3 mt-4">
                <div v-for="task in phase1Tasks" :key="task.id" 
                     class="oe-bg-gray-50 dark:oe-bg-gray-900/50 oe-px-5 oe-py-4 oe-rounded-2xl oe-flex oe-justify-between oe-items-center">
                  <div class="oe-flex oe-items-center oe-gap-3">
                    <span class="oe-text-emerald-500 text-xl oe-border-emerald-500 dark:oe-border-emerald-500/50 oe-border oe-rounded-full p-1">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" class="oe-w-4 oe-h-4">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                    </span>
                    <div>
                      <p class="oe-font-medium text-sm dark:oe-text-white">{{ task.title }}</p>
                      <p v-if="task.subtitle" class="oe-text-xs oe-text-gray-500 dark:oe-text-gray-400">{{ task.subtitle }}</p>
                    </div>
                  </div>
                  <div class="oe-flex oe-items-center oe-gap-3">
                    <span class="oe-text-xs oe-text-gray-500 dark:oe-text-gray-400">{{ task.assigned }}</span>
                    <span class="oe-bg-emerald-100 dark:oe-bg-emerald-900/40 oe-text-emerald-700 dark:oe-text-emerald-300 oe-px-3 oe-py-1 oe-text-xs oe-rounded-full">Done</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Phase 2 -->
          <div class="lg:oe-col-span-6">
            <div class="oe-border oe-border-gray-200 dark:oe-border-gray-700 oe-rounded-3xl overflow-hidden oe-transition-colors">
              <div 
                @click="togglePhase(2)"
                class="oe-flex oe-items-center oe-justify-between oe-px-6 oe-py-5 cursor-pointer hover:oe-bg-gray-50 dark:hover:oe-bg-gray-700/50">
                <div class="oe-flex oe-items-center oe-gap-4">
                  <div class="oe-w-8 oe-h-8 oe-bg-blue-600 oe-text-white oe-rounded-2xl oe-flex oe-items-center oe-justify-center text-xl font-semibold">2</div>
                  <div>
                    <p class="oe-font-semibold dark:oe-text-white">Phase 2: Day 1 – Onboarding Day</p>
                    <p class="oe-text-xs oe-text-gray-500 dark:oe-text-gray-400">Documentation, IT setup, and welcome activities</p>
                  </div>
                </div>
                <div class="oe-flex oe-items-center oe-gap-3">
                  <span class="oe-text-sm oe-font-medium text-gray-500 dark:oe-text-gray-400">2/17</span>
                  <span class="oe-text-2xl transition-transform duration-200 dark:oe-text-gray-400" :class="{ 'oe-rotate-180': openPhases[2] }">▼</span>
                </div>
              </div>

              <!-- Progress Bar -->
              <div class="oe-px-6">
                <div class="oe-h-2 oe-bg-gray-100 dark:oe-bg-gray-700 oe-rounded-full overflow-hidden">
                  <div class="oe-h-full oe-bg-emerald-500" style="width: 12%"></div>
                </div>
              </div>

              <div v-if="openPhases[2]" class="oe-px-6 oe-pb-6 oe-space-y-3 mt-4">
                <div v-for="task in phase2Tasks" :key="task.id" 
                     class="oe-bg-gray-50 dark:oe-bg-gray-900/50 oe-px-5 oe-py-4 oe-rounded-2xl oe-flex oe-justify-between oe-items-center">
                  <div class="oe-flex oe-items-center oe-gap-3">
                    <span :class="task.iconColor" class="text-xl">{{ task.icon }}</span>
                    <div>
                      <p class="oe-font-medium text-sm dark:oe-text-white">{{ task.title }}</p>
                      <p v-if="task.subtitle" class="oe-text-xs oe-text-gray-500 dark:oe-text-gray-400">{{ task.subtitle }}</p>
                    </div>
                  </div>
                  <div class="oe-flex oe-items-center oe-gap-3">
                    <span class="oe-text-xs oe-text-gray-500 dark:oe-text-gray-400">{{ task.assigned }}</span>
                    <span :class="task.statusClass" class="oe-px-3 oe-py-1 oe-text-xs oe-rounded-full">
                      {{ task.status }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- More phases follow similar pattern... -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const openPhases = ref({
  1: true,
  2: true,
  3: false,
  4: false
})

const togglePhase = (phase) => {
  openPhases.value[phase] = !openPhases.value[phase]
}

// Phase 1 Tasks
const phase1Tasks = [
  { id: 1, title: "Create pre-joining record in system", assigned: "System" },
  { id: 2, title: "Send Teams invite to stakeholders & management", subtitle: "Internal team notification for readiness", assigned: "HR" },
  { id: 3, title: "System preparation assigned", assigned: "Shivam" },
  { id: 4, title: "Seating arrangement, onboarding kit & forms printing", assigned: "Ankur" },
  { id: 5, title: "Send joining confirmation email to candidate", subtitle: "Includes: joining date, reporting time...", assigned: "HR" }
]

// Phase 2 Tasks
const phase2Tasks = [
  { id: 1, title: "Provide & collect joining forms", icon: "✅", iconColor: "oe-text-emerald-500", assigned: "HR", status: "Done", statusClass: "oe-bg-emerald-100 dark:oe-bg-emerald-900/40 oe-text-emerald-700 dark:oe-text-emerald-300" },
  { id: 2, title: "Provide Laptop Agreement form", icon: "✅", iconColor: "oe-text-emerald-500", assigned: "Server Team", status: "Done", statusClass: "oe-bg-emerald-100 dark:oe-bg-emerald-900/40 oe-text-emerald-700 dark:oe-text-emerald-300" },
  { id: 3, title: "Verify all submitted documents (hard copies, self-attested)", icon: "⏳", iconColor: "oe-text-blue-500", assigned: "HR", status: "In Progress", statusClass: "oe-bg-blue-100 dark:oe-bg-blue-900/40 oe-text-blue-700 dark:oe-text-blue-300" },
  { id: 4, title: "Send internal onboarding email", subtitle: "To: Network Team, Admin Team, Reporting Manager", icon: "○", iconColor: "oe-text-gray-400", assigned: "HR", status: "Pending", statusClass: "oe-bg-gray-100 dark:oe-bg-gray-700 oe-text-gray-600 dark:oe-text-gray-400" },
  { id: 5, title: "Email creation request (Outlook)", icon: "○", iconColor: "oe-text-gray-400", assigned: "HR ~ Neel Sir", status: "Pending", statusClass: "oe-bg-gray-100 dark:oe-bg-gray-700 oe-text-gray-600 dark:oe-text-gray-400" }
]

const employees = [
  {
    id: 1,
    initials: "PS",
    avatarBg: "oe-bg-blue-100 dark:oe-bg-blue-900/40 oe-text-blue-700 dark:oe-text-blue-300",
    name: "Priya Sharma",
    role: "Frontend Developer - Engineering",
    date: "Mar 25, 2026",
    status: "Active",
    statusClass: "oe-bg-blue-100 dark:oe-bg-blue-900/40 oe-text-blue-700 dark:oe-text-blue-300",
    phase: "Day 1 – Documentation & Setup"
  }
]
</script>
