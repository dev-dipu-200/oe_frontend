<template>
  <div class="oe-min-h-screen oe-bg-gray-50 oe-transition-colors oe-duration-300">
    <div class="oe-p-2 oe-mx-auto">
      <!-- Header -->
      <div class="oe-flex oe-justify-between oe-items-start mb-8">
        <div>
          <h1 class="oe-text-3xl oe-font-semibold oe-text-gray-900">Onboarding</h1>
          <p class="oe-text-gray-500">Manage new employee onboarding workflows</p>
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
            class="oe-w-full oe-bg-white oe-border oe-border-gray-200 oe-rounded-2xl oe-pl-12 oe-py-3 oe-text-sm focus:oe-outline-none focus:oe-border-blue-500 oe-transition-colors"
          />
          <div class="oe-absolute oe-left-5 oe-top-1/2 -translate-y-1/2 text-gray-400">
            🔍
          </div>
        </div>
        <button class="oe-flex oe-items-center oe-gap-2 oe-bg-white oe-border oe-border-gray-200 oe-px-6 oe-rounded-2xl hover:oe-bg-gray-50 oe-transition-colors">
          <span>🔽</span>
          <span class="oe-font-medium">Filter</span>
        </button>
      </div>

      <!-- Employees List -->
      <div class="oe-bg-white oe-rounded-3xl oe-shadow-sm oe-overflow-hidden oe-mb-10 oe-border oe-transition-colors">
        <div v-for="employee in employees" :key="employee.id" 
             class="oe-px-8 oe-py-6 oe-flex oe-items-center oe-gap-6 hover:oe-bg-gray-50 oe-border-b last:oe-border-b-0 oe-transition-colors">
          <div class="oe-w-11 oe-h-11 oe-rounded-2xl oe-flex oe-items-center oe-justify-center oe-text-lg oe-font-semibold flex-shrink-0"
               :class="employee.avatarBg">
            {{ employee.initials }}
          </div>

          <div class="oe-flex-1">
            <div class="oe-flex oe-justify-between">
              <div>
                <p class="oe-font-semibold oe-text-gray-900">{{ employee.name }}</p>
                <p class="oe-text-sm oe-text-gray-500">{{ employee.role }}</p>
              </div>

              <div class="oe-text-right">
                <div class="oe-flex oe-items-center oe-gap-2 oe-justify-end">
                  <span class="oe-text-gray-400 text-sm">📅</span>
                  <span class="oe-text-sm oe-text-gray-500">{{ employee.date }}</span>
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
      <div class="oe-bg-white oe-rounded-3xl oe-shadow-sm oe-p-8 oe-border oe-transition-colors">
        <div class="oe-flex oe-justify-between oe-items-center oe-mb-6">
          <div class="oe-flex oe-items-center oe-gap-3">
            <span class="oe-bg-blue-100 oe-text-blue-700 oe-px-4 oe-py-1.5 oe-rounded-lg oe-text-sm oe-font-medium">
              Workflow: Priya Sharma
            </span>
            <span class="oe-ml-2 oe-bg-blue-100 oe-text-blue-700 oe-px-4 oe-py-1.5 oe-rounded-lg oe-text-sm oe-font-medium">
              Overall Progress
            </span>
          </div>
          <div class="oe-text-sm oe-text-gray-500">
            <span class="oe-font-medium">{{ totalCompletedTasks }}/{{ totalTasks }} tasks</span>
            <span class="oe-text-blue-600 ml-2">{{ overallProgress.toFixed(0) }}% complete</span>
          </div>
        </div>

        <p class="oe-text-gray-600 mb-10">Complete onboarding workflow from pre-joining to 15-day follow-up</p>

        <!-- Phases Grid - 6 columns each -->
        <div class="oe-grid oe-grid-cols-1 lg:oe-grid-cols-12 oe-gap-6">

          <!-- Phase 1 -->
          <div class="lg:oe-col-span-6">
            <div class="oe-border oe-border-gray-200 oe-rounded-3xl overflow-hidden oe-transition-colors" :class="{'oe-border-emerald-200 oe-bg-emerald-50/10': phase1Progress === 100}">
              <div 
                @click="togglePhase(1)"
                class="oe-flex oe-items-center oe-justify-between oe-px-6 oe-py-5 cursor-pointer hover:oe-bg-gray-50">
                <div class="oe-flex oe-items-center oe-gap-4">
                  <div class="oe-w-8 oe-h-8 oe-rounded-2xl oe-flex oe-items-center oe-justify-center text-xl font-semibold"
                       :class="phase1Progress === 100 ? 'oe-bg-green-400 oe-text-white oe-size-8' : 'oe-bg-gray-100 oe-text-gray-600'">
                    <!-- {{ phase1Progress === 100 ? '' : '1' }} -->
                      <span v-if="phase1Progress === 100">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" class="oe-w-5 oe-h-5">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                  </div>
                  <div>
                    <p class="oe-font-semibold">Phase 1: Pre-Onboarding</p>
                    <p class="oe-text-xs oe-text-gray-500">Post offer acceptance — T-2 working days before joining</p>
                  </div>
                </div>
                <div class="oe-flex oe-items-center oe-gap-3">
                  <span class="oe-text-sm oe-font-medium text-gray-500">{{ phase1Completed }}/{{ phase1Tasks.length }}</span>
                  <span class="oe-text-2xl transition-transform duration-200" :class="{ 'oe-rotate-180': openPhases[1] }">▼</span>
                </div>
              </div>

              <!-- Progress Bar -->
              <div class="oe-px-6 oe-mb-4">
                <div class="oe-h-2 oe-bg-gray-100 oe-rounded-full overflow-hidden">
                  <div class="oe-h-full oe-bg-green-500 oe-transition-all oe-duration-500 oe-rounded-full" :style="{ width: phase1Progress + '%' }"></div>
                </div>
              </div>

              <div v-if="openPhases[1]" class="oe-px-6 oe-pb-6 oe-space-y-3 mt-4">
                <div v-for="task in phase1Tasks" :key="task.id" 
                     @click="toggleTaskStatus(task)"
                     class="oe-bg-gray-50 oe-px-5 oe-py-4 oe-rounded-2xl oe-flex oe-justify-between oe-items-center cursor-pointer hover:oe-bg-gray-100 transition-colors">
                  <div class="oe-flex oe-items-center oe-gap-3">
                    <span class="oe-flex oe-items-center oe-justify-center oe-w-6 oe-h-6 oe-border oe-rounded-full transition-colors"
                          :class="task.status === 'Done' ? 'oe-bg-emerald-500 oe-border-emerald-500 oe-text-white' : 'oe-border-gray-300'">
                        <svg v-if="task.status === 'Done'" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="oe-w-4 oe-h-4">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                    </span>
                    <div>
                      <p class="oe-font-medium text-sm" :class="{'oe-text-gray-400 oe-line-through': task.status === 'Done'}">{{ task.title }}</p>
                      <p v-if="task.subtitle" class="oe-text-xs oe-text-gray-500">{{ task.subtitle }}</p>
                    </div>
                  </div>
                  <div class="oe-flex oe-items-center oe-gap-3">
                    <span class="oe-text-xs oe-text-gray-500">{{ task.assigned }}</span>
                    <span :class="task.status === 'Done' ? 'oe-bg-emerald-100 oe-text-emerald-700' : 'oe-bg-gray-200 oe-text-gray-600'" 
                          class="oe-px-3 oe-py-1 oe-text-xs oe-rounded-full">
                      {{ task.status }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Phase 2 -->
          <div class="lg:oe-col-span-6">
            <div class="oe-border oe-border-gray-200 oe-rounded-3xl overflow-hidden oe-transition-colors" :class="{'oe-border-emerald-200 oe-bg-emerald-50/10': phase2Progress === 100}">
              <div 
                @click="togglePhase(2)"
                class="oe-flex oe-items-center oe-justify-between oe-px-6 oe-py-5 cursor-pointer hover:oe-bg-gray-50">
                <div class="oe-flex oe-items-center oe-gap-4">
                  <div class="oe-w-8 oe-h-8 oe-rounded-2xl oe-flex oe-items-center oe-justify-center text-xl font-semibold"
                       :class="phase2Progress === 100 ? 'oe-bg-emerald-100 oe-text-emerald-600' : 'oe-bg-blue-600 oe-text-white'">
                    {{ phase2Progress === 100 ? '✅' : '2' }}
                  </div>
                  <div>
                    <p class="oe-font-semibold">Phase 2: Day 1 – Onboarding Day</p>
                    <p class="oe-text-xs oe-text-gray-500">Documentation, IT setup, and welcome activities</p>
                  </div>
                </div>
                <div class="oe-flex oe-items-center oe-gap-3">
                  <span class="oe-text-sm oe-font-medium text-gray-500">{{ phase2Completed }}/{{ phase2Tasks.length }}</span>
                  <span class="oe-text-2xl transition-transform duration-200" :class="{ 'oe-rotate-180': openPhases[2] }">▼</span>
                </div>
              </div>

              <!-- Progress Bar -->
              <div class="oe-px-6 oe-mb-4">
                <div class="oe-h-2 oe-bg-gray-100 oe-rounded-full overflow-hidden">
                  <div class="oe-h-full oe-bg-emerald-500 oe-transition-all oe-duration-500" :style="{ width: phase2Progress + '%' }"></div>
                </div>
              </div>

              <div v-if="openPhases[2]" class="oe-px-6 oe-pb-6 oe-space-y-3 mt-4">
                <div v-for="task in phase2Tasks" :key="task.id" 
                     @click="toggleTaskStatus(task)"
                     class="oe-bg-gray-50 oe-px-5 oe-py-4 oe-rounded-2xl oe-flex oe-justify-between oe-items-center cursor-pointer hover:oe-bg-gray-100 transition-colors">
                  <div class="oe-flex oe-items-center oe-gap-3">
                    <span class="oe-flex oe-items-center oe-justify-center oe-w-6 oe-h-6 oe-border oe-rounded-full transition-colors"
                          :class="task.status === 'Done' ? 'oe-bg-emerald-500 oe-border-emerald-500 oe-text-white' : 'oe-border-gray-300'">
                        <svg v-if="task.status === 'Done'" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="oe-w-4 oe-h-4">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                    </span>
                    <div>
                      <p class="oe-font-medium text-sm" :class="{'oe-text-gray-400 oe-line-through': task.status === 'Done'}">{{ task.title }}</p>
                      <p v-if="task.subtitle" class="oe-text-xs oe-text-gray-500">{{ task.subtitle }}</p>
                    </div>
                  </div>
                  <div class="oe-flex oe-items-center oe-gap-3">
                    <span class="oe-text-xs oe-text-gray-500">{{ task.assigned }}</span>
                    <span :class="getStatusClass(task)" class="oe-px-3 oe-py-1 oe-text-xs oe-rounded-full">
                      {{ task.status }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Phase 3 -->
          <div class="lg:oe-col-span-6">
            <div class="oe-border oe-border-gray-200 oe-rounded-3xl overflow-hidden oe-transition-colors" :class="{'oe-border-emerald-200 oe-bg-emerald-50/10': phase3Progress === 100}">
              <div 
                @click="togglePhase(3)"
                class="oe-flex oe-items-center oe-justify-between oe-px-6 oe-py-5 cursor-pointer hover:oe-bg-gray-50">
                <div class="oe-flex oe-items-center oe-gap-4">
                  <div class="oe-w-8 oe-h-8 oe-rounded-2xl oe-flex oe-items-center oe-justify-center text-xl font-semibold"
                       :class="phase3Progress === 100 ? 'oe-bg-emerald-100 oe-text-emerald-600' : 'oe-bg-purple-600 oe-text-white'">
                    {{ phase3Progress === 100 ? '✅' : '3' }}
                  </div>
                  <div>
                    <p class="oe-font-semibold">Phase 3: Knowledge Transfer</p>
                    <p class="oe-text-xs oe-text-gray-500">Project handover and team introduction</p>
                  </div>
                </div>
                <div class="oe-flex oe-items-center oe-gap-3">
                  <span class="oe-text-sm oe-font-medium text-gray-500">{{ phase3Completed }}/{{ phase3Tasks.length }}</span>
                  <span class="oe-text-2xl transition-transform duration-200" :class="{ 'oe-rotate-180': openPhases[3] }">▼</span>
                </div>
              </div>

              <!-- Progress Bar -->
              <div class="oe-px-6 oe-mb-4">
                <div class="oe-h-2 oe-bg-gray-100 oe-rounded-full overflow-hidden">
                  <div class="oe-h-full oe-bg-emerald-500 oe-transition-all oe-duration-500" :style="{ width: phase3Progress + '%' }"></div>
                </div>
              </div>

              <div v-if="openPhases[3]" class="oe-px-6 oe-pb-6 oe-space-y-3 mt-4">
                <div v-for="task in phase3Tasks" :key="task.id" 
                     @click="toggleTaskStatus(task)"
                     class="oe-bg-gray-50 oe-px-5 oe-py-4 oe-rounded-2xl oe-flex oe-justify-between oe-items-center cursor-pointer hover:oe-bg-gray-100 transition-colors">
                  <div class="oe-flex oe-items-center oe-gap-3">
                    <span class="oe-flex oe-items-center oe-justify-center oe-w-6 oe-h-6 oe-border oe-rounded-full transition-colors"
                          :class="task.status === 'Done' ? 'oe-bg-emerald-500 oe-border-emerald-500 oe-text-white' : 'oe-border-gray-300'">
                        <svg v-if="task.status === 'Done'" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="oe-w-4 oe-h-4">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                    </span>
                    <div>
                      <p class="oe-font-medium text-sm" :class="{'oe-text-gray-400 oe-line-through': task.status === 'Done'}">{{ task.title }}</p>
                    </div>
                  </div>
                  <div class="oe-flex oe-items-center oe-gap-3">
                    <span class="oe-text-xs oe-text-gray-500">{{ task.assigned }}</span>
                    <span :class="getStatusClass(task)" class="oe-px-3 oe-py-1 oe-text-xs oe-rounded-full">
                      {{ task.status }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Phase 4 -->
          <div class="lg:oe-col-span-6">
            <div class="oe-border oe-border-gray-200 oe-rounded-3xl overflow-hidden oe-transition-colors" :class="{'oe-border-emerald-200 oe-bg-emerald-50/10': phase4Progress === 100}">
              <div 
                @click="togglePhase(4)"
                class="oe-flex oe-items-center oe-justify-between oe-px-6 oe-py-5 cursor-pointer hover:oe-bg-gray-50">
                <div class="oe-flex oe-items-center oe-gap-4">
                  <div class="oe-w-8 oe-h-8 oe-rounded-2xl oe-flex oe-items-center oe-justify-center text-xl font-semibold"
                       :class="phase4Progress === 100 ? 'oe-bg-emerald-100 oe-text-emerald-600' : 'oe-bg-amber-600 oe-text-white'">
                    {{ phase4Progress === 100 ? '✅' : '4' }}
                  </div>
                  <div>
                    <p class="oe-font-semibold">Phase 4: 15-Day Follow-up</p>
                    <p class="oe-text-xs oe-text-gray-500">Feedback and integration checks</p>
                  </div>
                </div>
                <div class="oe-flex oe-items-center oe-gap-3">
                  <span class="oe-text-sm oe-font-medium text-gray-500">{{ phase4Completed }}/{{ phase4Tasks.length }}</span>
                  <span class="oe-text-2xl transition-transform duration-200" :class="{ 'oe-rotate-180': openPhases[4] }">▼</span>
                </div>
              </div>

              <!-- Progress Bar -->
              <div class="oe-px-6 oe-mb-4">
                <div class="oe-h-2 oe-bg-gray-100 oe-rounded-full overflow-hidden">
                  <div class="oe-h-full oe-bg-emerald-500 oe-transition-all oe-duration-500" :style="{ width: phase4Progress + '%' }"></div>
                </div>
              </div>

              <div v-if="openPhases[4]" class="oe-px-6 oe-pb-6 oe-space-y-3 mt-4">
                <div v-for="task in phase4Tasks" :key="task.id" 
                     @click="toggleTaskStatus(task)"
                     class="oe-bg-gray-50 oe-px-5 oe-py-4 oe-rounded-2xl oe-flex oe-justify-between oe-items-center cursor-pointer hover:oe-bg-gray-100 transition-colors">
                  <div class="oe-flex oe-items-center oe-gap-3">
                    <span class="oe-flex oe-items-center oe-justify-center oe-w-6 oe-h-6 oe-border oe-rounded-full transition-colors"
                          :class="task.status === 'Done' ? 'oe-bg-emerald-500 oe-border-emerald-500 oe-text-white' : 'oe-border-gray-300'">
                        <svg v-if="task.status === 'Done'" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="oe-w-4 oe-h-4">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                    </span>
                    <div>
                      <p class="oe-font-medium text-sm" :class="{'oe-text-gray-400 oe-line-through': task.status === 'Done'}">{{ task.title }}</p>
                    </div>
                  </div>
                  <div class="oe-flex oe-items-center oe-gap-3">
                    <span class="oe-text-xs oe-text-gray-500">{{ task.assigned }}</span>
                    <span :class="getStatusClass(task)" class="oe-px-3 oe-py-1 oe-text-xs oe-rounded-full">
                      {{ task.status }}
                    </span>
                  </div>
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
import { ref, computed } from 'vue'

const openPhases = ref({
  1: true,
  2: true,
  3: true,
  4: true
})

const togglePhase = (phase) => {
  openPhases.value[phase] = !openPhases.value[phase]
}

// Phase 1 Tasks
const phase1Tasks = ref([
  { id: 1, title: "Create pre-joining record in system", assigned: "System", status: "Done" },
  { id: 2, title: "Send Teams invite to stakeholders & management", subtitle: "Internal team notification for readiness", assigned: "HR", status: "Done" },
  { id: 3, title: "System preparation assigned", assigned: "Shivam", status: "Done" },
  { id: 4, title: "Seating arrangement, onboarding kit & forms printing", assigned: "Ankur", status: "Done" },
  { id: 5, title: "Send joining confirmation email to candidate", subtitle: "Includes: joining date, reporting time...", assigned: "HR", status: "Done" }
])

// Phase 2 Tasks
const phase2Tasks = ref([
  { id: 1, title: "Provide & collect joining forms", assigned: "HR", status: "Done" },
  { id: 2, title: "Provide Laptop Agreement form", assigned: "Server Team", status: "Done" },
  { id: 3, title: "Verify all submitted documents (hard copies, self-attested)", assigned: "HR", status: "In Progress" },
  { id: 4, title: "Send internal onboarding email (Name, Position, ID, Email)", subtitle: "To: Network Team, Admin Team, Reporting Manager", assigned: "HR", status: "Pending" },
  { id: 5, title: "Email creation request (Outlook)", assigned: "HR → Neel Sir", status: "Pending" },
  { id: 6, title: "Email creation approval", assigned: "Neel Sir", status: "Pending" },
  { id: 7, title: "System setup", assigned: "Network Team", status: "Pending" },
  { id: 8, title: "Email configuration", assigned: "Network Team", status: "Pending" },
  { id: 9, title: "Sophos installation", assigned: "Network Team", status: "Pending" },
  { id: 10, title: "Microsoft Teams access", assigned: "Network Team", status: "Pending" },
  { id: 11, title: "Biometric & iClock setup", assigned: "Ankur", status: "Pending" },
  { id: 12, title: "Collect formal photograph (for ID card & LinkedIn post)", assigned: "HR", status: "Pending" },
  { id: 13, title: "Share employee details & photo with UI/UX Team", assigned: "HR", status: "Pending" },
  { id: 14, title: "Design LinkedIn welcome post", assigned: "UI/UX Team", status: "Pending" },
  { id: 15, title: "Design Keka welcome post", assigned: "UI/UX Team", status: "Pending" },
  { id: 16, title: "Design ID card", assigned: "UI/UX Team", status: "Pending" },
  { id: 17, title: "BGV initiation (skipped)", subtitle: "Background verification — currently skipped as per policy", assigned: "Third Party", status: "Pending" }
])

// Phase 3 Tasks
const phase3Tasks = ref([
  { id: 1, title: "Create Keka account (Day 3)", assigned: "HR", status: "Pending" },
  { id: 2, title: "Create Self-Assessment account (Day 3)", assigned: "HR", status: "Pending" },
  { id: 3, title: "Share login credentials via email", assigned: "HR", status: "Pending" },
  { id: 4, title: "Email Neel Sir to enable timesheet", subtitle: "After Keka account creation", assigned: "HR", status: "Pending" },
  { id: 5, title: "Assign tasks in timesheet system", assigned: "Delivery Manager", status: "Pending" },
  { id: 6, title: "Schedule & conduct policy briefing (Day 3)", assigned: "HR", status: "Pending" },
  { id: 7, title: "Publish Keka welcome post (Day 3)", assigned: "HR / UI/UX", status: "Pending" },
  { id: 8, title: "Publish LinkedIn welcome post (after 1 week)", assigned: "HR / UI/UX", status: "Pending" }
])

// Phase 4 Tasks
const phase4Tasks = ref([
  { id: 1, title: "Send feedback email to Reporting Manager (Day 15)", subtitle: "Focus: Performance, Behaviour, Overall integration", assigned: "HR", status: "Pending" },
  { id: 2, title: "Collect & review feedback", assigned: "HR", status: "Pending" },
  { id: 3, title: "Store feedback in employee record", assigned: "System", status: "Pending" }
])

// Status Toggling
const toggleTaskStatus = (task) => {
  const statuses = ["Pending", "In Progress", "Done", "Hold"]
  const currentIndex = statuses.indexOf(task.status)
  const nextIndex = (currentIndex + 1) % statuses.length
  task.status = statuses[nextIndex]
}

const getStatusClass = (task) => {
  if (task.status === "Done") return "oe-bg-emerald-100 oe-text-emerald-700"
  if (task.status === "In Progress") return "oe-bg-blue-100 oe-text-blue-700"
  if (task.status === "Hold") return "oe-bg-amber-100 oe-text-amber-700"
  return "oe-bg-gray-100 oe-text-gray-600"
}

// Progress Computations
const phase1Completed = computed(() => phase1Tasks.value.filter(t => t.status === 'Done').length)
const phase1Progress = computed(() => (phase1Completed.value / phase1Tasks.value.length) * 100)

const phase2Completed = computed(() => phase2Tasks.value.filter(t => t.status === 'Done').length)
const phase2Progress = computed(() => (phase2Completed.value / phase2Tasks.value.length) * 100)

const phase3Completed = computed(() => phase3Tasks.value.filter(t => t.status === 'Done').length)
const phase3Progress = computed(() => (phase3Completed.value / phase3Tasks.value.length) * 100)

const phase4Completed = computed(() => phase4Tasks.value.filter(t => t.status === 'Done').length)
const phase4Progress = computed(() => (phase4Completed.value / phase4Tasks.value.length) * 100)

const totalTasks = computed(() => phase1Tasks.value.length + phase2Tasks.value.length + phase3Tasks.value.length + phase4Tasks.value.length)
const totalCompletedTasks = computed(() => phase1Completed.value + phase2Completed.value + phase3Completed.value + phase4Completed.value)
const overallProgress = computed(() => (totalCompletedTasks.value / totalTasks.value) * 100)

const employees = [
  {
    id: 1,
    initials: "PS",
    avatarBg: "oe-bg-blue-100 oe-text-blue-700",
    name: "Priya Sharma",
    role: "Frontend Developer - Engineering",
    date: "Mar 25, 2026",
    status: "Active",
    statusClass: "oe-bg-blue-100 oe-text-blue-700",
    phase: "Day 1 – Documentation & Setup"
  }
]
</script>
