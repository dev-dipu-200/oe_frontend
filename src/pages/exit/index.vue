<template>
  <div class="oe-min-h-screen oe-bg-gray-50 oe-transition-colors oe-duration-300">
    <div class="oe-p-2 oe-mx-auto">
      <!-- Header -->
      <div class="oe-flex oe-justify-between oe-items-start mb-8">
        <div>
          <h1 class="oe-text-3xl oe-font-semibold oe-text-gray-900">Exit Management</h1>
          <p class="oe-text-gray-500">Track resignation & offboarding workflows</p>
        </div>
        <button class="oe-bg-white oe-border oe-border-gray-300 oe-text-gray-700 hover:oe-bg-gray-50 oe-px-6 oe-py-3 oe-rounded-xl oe-flex oe-items-center oe-gap-2 oe-font-medium transition-colors shadow-lg shadow-gray-200">
          <span class="oe-text-xl">👤</span>
          Record Resignation
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
          <div class="oe-absolute oe-left-5 oe-top-1/2 -translate-y-1/2 oe-text-gray-400">🔍</div>
        </div>
        <button class="oe-flex oe-items-center oe-gap-2 oe-bg-white oe-border oe-border-gray-200 oe-px-6 oe-rounded-2xl hover:oe-bg-gray-50 oe-transition-colors">
          <span>🔽</span>
          <span class="oe-font-medium">Filter</span>
        </button>
      </div>

      <!-- Employees List -->
      <div class="oe-bg-white oe-rounded-3xl oe-shadow-sm oe-overflow-hidden oe-mb-10 oe-border oe-transition-colors">
        <div v-for="employee in exitEmployees" :key="employee.id" 
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
                  <span class="oe-text-gray-400 oe-text-sm">📅</span>
                  <span class="oe-text-sm oe-text-gray-500">{{ employee.date }}</span>
                </div>
                <div class="oe-mt-2">
                  <span :class="employee.statusClass" class="oe-px-4 oe-py-1 oe-text-xs oe-font-medium oe-rounded-full">
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
            <span class="oe-bg-rose-100 oe-text-rose-700 oe-px-4 oe-py-1.5 oe-rounded-lg oe-text-sm oe-font-medium">
              Workflow: Vikram Singh
            </span>
            <span class="oe-bg-amber-100 oe-text-amber-700 oe-px-4 oe-py-1.5 oe-rounded-lg oe-text-sm oe-font-medium">
              Notice Period (60 Days)
            </span>
          </div>
          <div class="oe-text-sm oe-text-gray-500">
            <span class="oe-font-medium">{{ totalCompleted }}/{{ totalTasks }} tasks</span>
            <span class="oe-text-blue-600 ml-2">{{ overallProgress.toFixed(0) }}% complete</span>
          </div>
        </div>

        <p class="oe-text-gray-600 mb-10">7-phase exit workflow from resignation to final closure & archiving</p>

        <!-- Phases Grid -->
        <div class="oe-grid oe-grid-cols-1 lg:oe-grid-cols-12 oe-gap-6">

          <!-- Phase 1 -->
          <div class="lg:oe-col-span-6">
            <div class="oe-border oe-border-gray-200 oe-rounded-3xl overflow-hidden oe-transition-colors" 
                 :class="{ 'oe-border-emerald-200 oe-bg-emerald-50/30': phase1Progress === 100 }">
              <div @click="togglePhase(1)" class="oe-flex oe-items-center oe-justify-between oe-px-6 oe-py-5 cursor-pointer hover:oe-bg-gray-50">
                <div class="oe-flex oe-items-center oe-gap-4">
                  <div class="oe-w-8 oe-h-8 oe-rounded-2xl oe-flex oe-items-center oe-justify-center text-xl font-semibold"
                       :class="phase1Progress === 100 ? 'oe-bg-emerald-500 oe-text-white' : 'oe-bg-rose-100 oe-text-rose-600'">
                    {{ phase1Progress === 100 ? '✅' : '1' }}
                  </div>
                  <div>
                    <p class="oe-font-semibold">Phase 1: Resignation & Discussion</p>
                    <p class="oe-text-xs oe-text-gray-500">Resignation submission and discussion</p>
                  </div>
                </div>
                <div class="oe-flex oe-items-center oe-gap-3">
                  <span class="oe-text-sm oe-font-medium oe-text-gray-500">{{ phase1Completed }}/{{ phase1Tasks.length }}</span>
                  <span class="oe-text-2xl transition-transform duration-200" :class="{ 'oe-rotate-180': openPhases[1] }">▼</span>
                </div>
              </div>

              <div class="oe-px-6 mb-4">
                <div class="oe-h-2 oe-bg-gray-100 oe-rounded-full overflow-hidden">
                  <div class="oe-h-full oe-bg-emerald-500 oe-transition-all" :style="{ width: phase1Progress + '%' }"></div>
                </div>
              </div>

              <div v-if="openPhases[1]" class="oe-px-6 oe-pb-6 oe-space-y-3">
                <div v-for="(task, i) in phase1Tasks" :key="i"
                     @click="toggleTaskStatus(task)"
                     class="oe-bg-gray-50 oe-px-5 oe-py-4 oe-rounded-2xl oe-flex oe-justify-between oe-items-center cursor-pointer hover:oe-bg-gray-100 transition-all">
                  <div class="oe-flex oe-items-center oe-gap-3 flex-1">
                    <span class="oe-w-6 oe-h-6 oe-flex oe-items-center oe-justify-center oe-border-2 oe-rounded-full transition-colors"
                          :class="task.status === 'Done' ? 'oe-bg-emerald-500 oe-border-emerald-500 oe-text-white' : 'oe-border-gray-300'">
                      <svg v-if="task.status === 'Done'" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="oe-w-4 oe-h-4">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <div>
                      <p class="oe-font-medium oe-text-sm" :class="{ 'oe-line-through oe-text-gray-400': task.status === 'Done' }">{{ task.title }}</p>
                    </div>
                  </div>
                  <TaskStatusBadge 
                    :status="task.status" 
                    @change="(newStatus) => updateTaskStatus(phase1Tasks, i, newStatus)" 
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Phase 2 -->
          <div class="lg:oe-col-span-6">
            <div class="oe-border oe-border-gray-200 oe-rounded-3xl overflow-hidden oe-transition-colors" 
                 :class="{ 'oe-border-emerald-200 oe-bg-emerald-50/30': phase2Progress === 100 }">
              <div @click="togglePhase(2)" class="oe-flex oe-items-center oe-justify-between oe-px-6 oe-py-5 cursor-pointer hover:oe-bg-gray-50">
                <div class="oe-flex oe-items-center oe-gap-4">
                  <div class="oe-w-8 oe-h-8 oe-rounded-2xl oe-flex oe-items-center oe-justify-center text-xl font-semibold"
                       :class="phase2Progress === 100 ? 'oe-bg-emerald-500 oe-text-white' : 'oe-bg-emerald-100 oe-text-emerald-600'">
                    {{ phase2Progress === 100 ? '✅' : '2' }}
                  </div>
                  <div>
                    <p class="oe-font-semibold">Phase 2: Exit Initiation</p>
                    <p class="oe-text-xs oe-text-gray-500">HRMS updates and initiation</p>
                  </div>
                </div>
                <div class="oe-flex oe-items-center oe-gap-3">
                  <span class="oe-text-sm oe-font-medium oe-text-gray-500">{{ phase2Completed }}/{{ phase2Tasks.length }}</span>
                  <span class="oe-text-2xl transition-transform duration-200" :class="{ 'oe-rotate-180': openPhases[2] }">▼</span>
                </div>
              </div>

              <div class="oe-px-6 mb-4">
                <div class="oe-h-2 oe-bg-gray-100 oe-rounded-full overflow-hidden">
                  <div class="oe-h-full oe-bg-emerald-500 oe-transition-all" :style="{ width: phase2Progress + '%' }"></div>
                </div>
              </div>

              <div v-if="openPhases[2]" class="oe-px-6 oe-pb-6 oe-space-y-3">
                <div v-for="(task, i) in phase2Tasks" :key="i"
                     @click="toggleTaskStatus(task)"
                     class="oe-bg-gray-50 oe-px-5 oe-py-4 oe-rounded-2xl oe-flex oe-justify-between oe-items-center cursor-pointer hover:oe-bg-gray-100 transition-all">
                  <div class="oe-flex oe-items-center oe-gap-3 flex-1">
                    <span class="oe-w-6 oe-h-6 oe-flex oe-items-center oe-justify-center oe-border-2 oe-rounded-full transition-colors"
                          :class="task.status === 'Done' ? 'oe-bg-emerald-500 oe-border-emerald-500 oe-text-white' : 'oe-border-gray-300'">
                      <svg v-if="task.status === 'Done'" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="oe-w-4 oe-h-4">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <div>
                      <p class="oe-font-medium oe-text-sm" :class="{ 'oe-line-through oe-text-gray-400': task.status === 'Done' }">{{ task.title }}</p>
                    </div>
                  </div>
                  <TaskStatusBadge 
                    :status="task.status" 
                    @change="(newStatus) => updateTaskStatus(phase2Tasks, i, newStatus)" 
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Phase 3 -->
          <div class="lg:oe-col-span-6">
            <div class="oe-border oe-border-gray-200 oe-rounded-3xl overflow-hidden oe-transition-colors" 
                 :class="{ 'oe-border-emerald-200 oe-bg-emerald-50/30': phase3Progress === 100 }">
              <div @click="togglePhase(3)" class="oe-flex oe-items-center oe-justify-between oe-px-6 oe-py-5 cursor-pointer hover:oe-bg-gray-50">
                <div class="oe-flex oe-items-center oe-gap-4">
                  <div class="oe-w-8 oe-h-8 oe-rounded-2xl oe-flex oe-items-center oe-justify-center text-xl font-semibold"
                       :class="phase3Progress === 100 ? 'oe-bg-emerald-500 oe-text-white' : 'oe-bg-purple-100 oe-text-purple-600'">
                    {{ phase3Progress === 100 ? '✅' : '3' }}
                  </div>
                  <div>
                    <p class="oe-font-semibold">Phase 3: Knowledge Transfer</p>
                    <p class="oe-text-xs oe-text-gray-500">Handover documentation and sessions</p>
                  </div>
                </div>
                <div class="oe-flex oe-items-center oe-gap-3">
                  <span class="oe-text-sm oe-font-medium oe-text-gray-500">{{ phase3Completed }}/{{ phase3Tasks.length }}</span>
                  <span class="oe-text-2xl transition-transform duration-200" :class="{ 'oe-rotate-180': openPhases[3] }">▼</span>
                </div>
              </div>

              <div class="oe-px-6 mb-4">
                <div class="oe-h-2 oe-bg-gray-100 oe-rounded-full overflow-hidden">
                  <div class="oe-h-full oe-bg-emerald-500 oe-transition-all" :style="{ width: phase3Progress + '%' }"></div>
                </div>
              </div>

              <div v-if="openPhases[3]" class="oe-px-6 oe-pb-6 oe-space-y-3">
                <div v-for="(task, i) in phase3Tasks" :key="i"
                     @click="toggleTaskStatus(task)"
                     class="oe-bg-gray-50 oe-px-5 oe-py-4 oe-rounded-2xl oe-flex oe-justify-between oe-items-center cursor-pointer hover:oe-bg-gray-100 transition-all">
                  <div class="oe-flex oe-items-center oe-gap-3 flex-1">
                    <span class="oe-w-6 oe-h-6 oe-flex oe-items-center oe-justify-center oe-border-2 oe-rounded-full transition-colors"
                          :class="task.status === 'Done' ? 'oe-bg-emerald-500 oe-border-emerald-500 oe-text-white' : 'oe-border-gray-300'">
                      <svg v-if="task.status === 'Done'" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="oe-w-4 oe-h-4">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <div>
                      <p class="oe-font-medium oe-text-sm" :class="{ 'oe-line-through oe-text-gray-400': task.status === 'Done' }">{{ task.title }}</p>
                    </div>
                  </div>
                  <TaskStatusBadge 
                    :status="task.status" 
                    @change="(newStatus) => updateTaskStatus(phase3Tasks, i, newStatus)" 
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Phase 4 -->
          <div class="lg:oe-col-span-6">
            <div class="oe-border oe-border-gray-200 oe-rounded-3xl overflow-hidden oe-transition-colors" 
                 :class="{ 'oe-border-emerald-200 oe-bg-emerald-50/30': phase4Progress === 100 }">
              <div @click="togglePhase(4)" class="oe-flex oe-items-center oe-justify-between oe-px-6 oe-py-5 cursor-pointer hover:oe-bg-gray-50">
                <div class="oe-flex oe-items-center oe-gap-4">
                  <div class="oe-w-8 oe-h-8 oe-rounded-2xl oe-flex oe-items-center oe-justify-center text-xl font-semibold"
                       :class="phase4Progress === 100 ? 'oe-bg-emerald-500 oe-text-white' : 'oe-bg-amber-100 oe-text-amber-600'">
                    {{ phase4Progress === 100 ? '✅' : '4' }}
                  </div>
                  <div>
                    <p class="oe-font-semibold">Phase 4: Last Working Day</p>
                    <p class="oe-text-xs oe-text-gray-500">LWD calculation and confirmation</p>
                  </div>
                </div>
                <div class="oe-flex oe-items-center oe-gap-3">
                  <span class="oe-text-sm oe-font-medium oe-text-gray-500">{{ phase4Completed }}/{{ phase4Tasks.length }}</span>
                  <span class="oe-text-2xl transition-transform duration-200" :class="{ 'oe-rotate-180': openPhases[4] }">▼</span>
                </div>
              </div>

              <div class="oe-px-6 mb-4">
                <div class="oe-h-2 oe-bg-gray-100 oe-rounded-full overflow-hidden">
                  <div class="oe-h-full oe-bg-emerald-500 oe-transition-all" :style="{ width: phase4Progress + '%' }"></div>
                </div>
              </div>

              <div v-if="openPhases[4]" class="oe-px-6 oe-pb-6 oe-space-y-3">
                <div v-for="(task, i) in phase4Tasks" :key="i"
                     @click="toggleTaskStatus(task)"
                     class="oe-bg-gray-50 oe-px-5 oe-py-4 oe-rounded-2xl oe-flex oe-justify-between oe-items-center cursor-pointer hover:oe-bg-gray-100 transition-all">
                  <div class="oe-flex oe-items-center oe-gap-3 flex-1">
                    <span class="oe-w-6 oe-h-6 oe-flex oe-items-center oe-justify-center oe-border-2 oe-rounded-full transition-colors"
                          :class="task.status === 'Done' ? 'oe-bg-emerald-500 oe-border-emerald-500 oe-text-white' : 'oe-border-gray-300'">
                      <svg v-if="task.status === 'Done'" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="oe-w-4 oe-h-4">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <div>
                      <p class="oe-font-medium oe-text-sm" :class="{ 'oe-line-through oe-text-gray-400': task.status === 'Done' }">{{ task.title }}</p>
                    </div>
                  </div>
                  <TaskStatusBadge 
                    :status="task.status" 
                    @change="(newStatus) => updateTaskStatus(phase4Tasks, i, newStatus)" 
                  />
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

// Phase Toggle
const openPhases = ref({ 1: true, 2: true, 3: true, 4: true })
const togglePhase = (phase) => openPhases.value[phase] = !openPhases.value[phase]

// Task Status Toggle
const toggleTaskStatus = (task) => {
  const cycle = ['Pending', 'In Process', 'Done', 'Hold']
  const current = cycle.indexOf(task.status)
  task.status = cycle[(current + 1) % 4]
}

const updateTaskStatus = (tasksArray, index, newStatus) => {
  tasksArray[index].status = newStatus
}

// Tasks Data
const phase1Tasks = ref([
  { title: "Resignation submitted via email", assigned: "Employee → RM & HR", status: "Done" },
  { title: "Discussion scheduled (RM + HR + Employee)", assigned: "HR + Manager", status: "Done" },
  { title: "Decision taken based on discussion", assigned: "Manager", status: "Done" },
  { title: "Resignation approved via email (HR in CC)", assigned: "Manager", status: "Done" }
])

const phase2Tasks = ref([
  { title: "Mark employee as 'Resigned' in Keka", assigned: "HR", status: "Done" },
  { title: "Upload resignation documents in system", assigned: "HR", status: "Done" },
  { title: "Exit officially initiated", assigned: "HR", status: "Done" },
  { title: "Leave balances lapsed as per company policy", assigned: "System", status: "Done" }
])

const phase3Tasks = ref([
  { title: "KT responsibilities assigned to employee", assigned: "Reporting Manager", status: "Done" },
  { title: "KT documents prepared", assigned: "Vikram", status: "In Process" },
  { title: "KT sessions conducted with assigned team members", assigned: "Vikram", status: "In Process" },
  { title: "KT reviewed & completion confirmed to HR via email", assigned: "Manager", status: "Pending" }
])

const phase4Tasks = ref([
  { title: "LWD calculated based on notice period + KT completion", assigned: "HR", status: "Pending" },
  { title: "Official LWD shared with employee via email", assigned: "HR", status: "Pending" }
])

// Progress Calculations
const phase1Completed = computed(() => phase1Tasks.value.filter(t => t.status === 'Done').length)
const phase1Progress = computed(() => Math.round((phase1Completed.value / phase1Tasks.value.length) * 100))

const phase2Completed = computed(() => phase2Tasks.value.filter(t => t.status === 'Done').length)
const phase2Progress = computed(() => Math.round((phase2Completed.value / phase2Tasks.value.length) * 100))

const phase3Completed = computed(() => phase3Tasks.value.filter(t => t.status === 'Done').length)
const phase3Progress = computed(() => Math.round((phase3Completed.value / phase3Tasks.value.length) * 100))

const phase4Completed = computed(() => phase4Tasks.value.filter(t => t.status === 'Done').length)
const phase4Progress = computed(() => Math.round((phase4Completed.value / phase4Tasks.value.length) * 100))

const totalTasks = computed(() => phase1Tasks.value.length + phase2Tasks.value.length + phase3Tasks.value.length + phase4Tasks.value.length)
const totalCompleted = computed(() => phase1Completed.value + phase2Completed.value + phase3Completed.value + phase4Completed.value)
const overallProgress = computed(() => totalTasks.value ? (totalCompleted.value / totalTasks.value) * 100 : 0)

const exitEmployees = [
  { id: 1, initials: "VS", avatarBg: "oe-bg-rose-100 oe-text-rose-700", name: "Vikram Singh", role: "Backend Developer - Engineering", date: "Apr 15, 2026", status: "Active", statusClass: "oe-bg-blue-100 oe-text-blue-700", phase: "Phase 3 – Knowledge Transfer" },
  { id: 2, initials: "MP", avatarBg: "oe-bg-pink-100 oe-text-pink-700", name: "Meera Patel", role: "HR Executive - HR", date: "Apr 20, 2026", status: "Pending", statusClass: "oe-bg-gray-100 oe-text-gray-600", phase: "Phase 1 – Pending Approval" }
]
</script>
