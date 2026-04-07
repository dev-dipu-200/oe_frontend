<template>
  <div
    class="oe-min-h-screen oe-bg-gray-50 oe-transition-colors oe-duration-300"
  >
    <div class="oe-p-2 oe-mx-auto">
      <!-- Header -->
      <div class="oe-flex oe-justify-between oe-items-start mb-8">
        <div>
          <h1 class="oe-text-3xl oe-font-semibold oe-text-gray-900">
            Exit Management
          </h1>
          <p class="oe-text-gray-500">
            Track resignation and exit workflows
          </p>
        </div>
      </div>

      <!-- Search & Filter -->
      <div class="oe-flex oe-gap-4 oe-mb-8">
        <div class="oe-flex-1 oe-relative">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search employees..."
            class="oe-w-1/4 oe-bg-white oe-border oe-border-gray-200 oe-rounded-2xl oe-pl-12 oe-py-3 oe-text-sm focus:oe-outline-none focus:oe-border-blue-500 oe-transition-colors"
          />
          <div
            class="oe-absolute oe-left-5 oe-top-1/4 -translate-y-1/2 oe-text-gray-400"
          >
            <svg
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              class="oe-w-5 oe-h-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
        <button
          @click="isFilterDrawerOpen = true"
          class="oe-flex oe-items-center oe-gap-2 oe-bg-white oe-border oe-border-gray-200 oe-px-6 oe-rounded-2xl hover:oe-bg-gray-50 oe-transition-colors"
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

      <!-- Employees List -->
      <div
        v-if="loadingEmployees"
        class="oe-text-center oe-py-10 oe-text-gray-500"
      >
        Loading exit records...
      </div>
      <div
        v-else-if="filteredEmployees.length === 0"
        class="oe-text-center oe-py-10 oe-text-gray-500"
      >
        No exit records found.
      </div>
      <div
        v-else
        v-for="employee in filteredEmployees"
        :key="employee.id"
        class="oe-w-full"
      >
        <div
          @click="selectEmployee(employee)"
          class="oe-bg-white oe-rounded-3xl oe-overflow-hidden oe-mb-4 oe-border oe-transition-all cursor-pointer hover:oe-shadow-md"
          :class="{
            'oe-border-blue-500 oe-ring-2 oe-ring-blue-100':
              selectedEmployee?.id === employee.id,
          }"
        >
          <div class="oe-flex oe-justify-between">
            <div class="oe-flex oe-items-center oe-gap-4 oe-px-4 oe-py-3">
              <div
                class="oe-w-11 oe-h-11 oe-rounded-2xl oe-flex oe-items-center oe-justify-center oe-text-lg oe-font-semibold flex-shrink-0"
                :class="employee.avatarBg || 'oe-bg-rose-100 oe-text-rose-700'"
              >
                {{ employee.initials }}
              </div>
              <div>
                <p class="oe-font-semibold oe-text-gray-900">
                  {{ employee.name }}
                </p>
                <p class="oe-text-sm oe-text-gray-500">{{ employee.role }}</p>
              </div>
            </div>
            <div class="oe-text-right oe-px-5 oe-py-3">
              <div class="oe-flex oe-items-center oe-gap-2 oe-justify-end">
                <span class="oe-text-gray-400 text-sm">📅</span>
                <span class="oe-text-sm oe-text-gray-500">{{
                  employee.date
                }}</span>
              </div>
              <div class="oe-mt-2">
                <span
                  :class="employee.statusClass"
                  class="oe-px-4 oe-py-1 oe-text-xs oe-font-medium oe-rounded-full"
                >
                  {{ employee.status }}
                </span>
              </div>
              <p class="oe-text-xs oe-text-gray-400 mt-1">
                {{ employee.phase }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Workflow Section -->
      <div
        v-if="selectedEmployee"
        class="oe-bg-white oe-rounded-3xl oe-shadow-sm oe-p-8 oe-border oe-transition-colors oe-mt-8"
      >
        <div
          v-if="loadingDetails"
          class="oe-flex oe-h-40 oe-items-center oe-justify-center oe-text-gray-400"
        >
          Loading workflow details...
        </div>
        <div v-else>
          <div class="oe-flex oe-justify-between oe-items-center oe-mb-6">
            <div class="oe-flex oe-items-center oe-gap-3">
              <span
                class="oe-bg-rose-100 oe-text-rose-700 oe-px-4 oe-py-1.5 oe-rounded-lg oe-text-sm oe-font-medium"
              >
                Workflow: {{ selectedEmployee.name }}
              </span>
              <span
                class="oe-ml-2 oe-bg-amber-100 oe-text-amber-700 oe-px-4 oe-py-1.5 oe-rounded-lg oe-text-sm oe-font-medium"
              >
                Overall Progress
              </span>
            </div>
            <div class="oe-text-sm oe-text-gray-500 oe-gap-2 oe-flex oe-items-center">
              <span class="oe-font-medium"
                >{{ totalCompletedTasks }}/{{ totalTasks }} tasks</span
              >
              <span class="oe-text-blue-600 ml-2"
                >{{ overallProgress.toFixed(0) }}% complete</span
              >
            </div>
          </div>

          <p class="oe-text-gray-600 oe-mb-2">
            Complete exit workflow from resignation to final closure
          </p>

          <!-- Phases Grid - 4 columns -->
          <div class="oe-grid oe-grid-cols-1 lg:oe-grid-cols-12 oe-gap-6">
            <!-- Phase 1 -->
            <div class="lg:oe-col-span-6">
              <div
                class="oe-border oe-border-gray-200 oe-rounded-3xl overflow-hidden oe-transition-colors"
                :class="{
                  'oe-border-emerald-200 oe-bg-emerald-50/10':
                    phase1Progress === 100,
                }"
              >
                <div
                  @click="togglePhase(1)"
                  class="oe-flex oe-items-center oe-justify-between oe-px-6 oe-py-5 cursor-pointer hover:oe-bg-gray-50"
                >
                  <div class="oe-flex oe-items-center oe-gap-4">
                    <div
                      class="oe-w-8 oe-h-8 oe-rounded-2xl oe-flex oe-items-center oe-justify-center text-xl font-semibold"
                      :class="
                        phase1Progress === 100
                          ? 'oe-bg-green-500 oe-text-white oe-size-8'
                          : 'oe-bg-rose-500 oe-text-white'
                      "
                    >
                      <span v-if="phase1Progress === 100">
                        <Icon icon="lucide:check" class="oe-w-5 oe-h-5 oe-text-white" />
                      </span>
                      <span v-else>1</span>
                    </div>
                    <div>
                      <p class="oe-font-semibold">
                        Phase 1: {{ phase1Name || "Resignation & Discussion" }}
                      </p>
                      <p class="oe-text-xs oe-text-gray-500">
                        {{
                          phase1Description ||
                          "Resignation submission and managerial review"
                        }}
                      </p>
                    </div>
                  </div>
                  <div class="oe-flex oe-items-center oe-gap-3">
                    <span class="oe-text-sm oe-font-medium text-gray-500"
                      >{{ phase1Completed }}/{{ phase1Tasks.length }}</span
                    >
                    <span
                      class="oe-text-2xl transition-transform duration-200"
                      :class="{ 'oe-rotate-180': openPhases[1] }"
                      >▼</span
                    >
                  </div>
                </div>

                <!-- Progress Bar -->
                <div class="oe-px-6 oe-mb-4">
                  <div
                    class="oe-h-2 oe-bg-gray-100 oe-rounded-full overflow-hidden"
                  >
                    <div
                      class="oe-h-full oe-bg-green-500 oe-transition-all oe-duration-500 oe-rounded-full"
                      :style="{ width: phase1Progress + '%' }"
                    ></div>
                  </div>
                </div>

                <div
                  v-if="openPhases[1]"
                  class="oe-px-6 oe-pb-6 oe-space-y-3 mt-4"
                >
                  <div
                    v-for="(task, index) in phase1Tasks"
                    :key="task.id"
                    @click="toggleTaskStatus(task)"
                    class="oe-bg-gray-50 oe-px-5 oe-py-4 oe-rounded-2xl oe-flex oe-justify-between oe-items-center cursor-pointer hover:oe-bg-gray-100 transition-colors"
                  >
                    <div class="oe-flex oe-items-center oe-gap-3">
                      <span
                        class="oe-flex oe-items-center oe-justify-center oe-w-4 oe-h-4 oe-border oe-rounded-full transition-colors"
                        :class="
                          task.status === 'Done'
                            ? 'oe-rounded-full oe-border-green-500 oe-text-green-500'
                            : 'oe-border-gray-300'
                        "
                      >
                        <svg
                          v-if="task.status === 'Done'"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          class="oe-w-4 oe-h-4"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </span>
                      <div>
                        <p
                          class="oe-font-medium text-sm"
                          :class="{
                            'oe-text-gray-400 oe-line-through':
                              task.status === 'Done',
                          }"
                        >
                          {{ task.title }}
                        </p>
                        <p
                          v-if="task.subtitle"
                          class="oe-text-xs oe-text-gray-500"
                        >
                          {{ task.subtitle }}
                        </p>
                      </div>
                    </div>
                    <div class="oe-flex oe-items-center oe-gap-3">
                      <span class="oe-text-xs oe-text-gray-500">{{
                        task.assigned
                      }}</span>
                      <TaskStatusBadge
                        :status="task.status"
                        @change="
                          (newStatus) =>
                            updateTaskStatus(phase1Tasks, index, newStatus)
                        "
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Phase 2 -->
            <div class="lg:oe-col-span-6">
              <div
                class="oe-border oe-border-gray-200 oe-rounded-3xl overflow-hidden oe-transition-colors"
                :class="{
                  'oe-border-emerald-200 oe-bg-emerald-50/10':
                    phase2Progress === 100,
                }"
              >
                <div
                  @click="togglePhase(2)"
                  class="oe-flex oe-items-center oe-justify-between oe-px-6 oe-py-5 cursor-pointer hover:oe-bg-gray-50"
                >
                  <div class="oe-flex oe-items-center oe-gap-4">
                    <div
                      class="oe-w-8 oe-h-8 oe-rounded-2xl oe-flex oe-items-center oe-justify-center text-xl font-semibold"
                      :class="
                        phase2Progress === 100
                          ? 'oe-bg-green-500 oe-text-white'
                          : 'oe-bg-blue-600 oe-text-white'
                      "
                    >
                      <span v-if="phase2Progress === 100">
                        <Icon icon="lucide:check" class="oe-w-5 oe-h-5 oe-text-white" />
                      </span>
                      <span v-else>2</span>
                    </div>
                    <div>
                      <p class="oe-font-semibold">
                        Phase 2: {{ phase2Name || "Exit Initiation" }}
                      </p>
                      <p class="oe-text-xs oe-text-gray-500">
                        {{
                          phase2Description ||
                          "HR workflow activation and policy checks"
                        }}
                      </p>
                    </div>
                  </div>
                  <div class="oe-flex oe-items-center oe-gap-3">
                    <span class="oe-text-sm oe-font-medium text-gray-500"
                      >{{ phase2Completed }}/{{ phase2Tasks.length }}</span
                    >
                    <span
                      class="oe-text-2xl transition-transform duration-200"
                      :class="{ 'oe-rotate-180': openPhases[2] }"
                      >▼</span
                    >
                  </div>
                </div>

                <!-- Progress Bar -->
                <div class="oe-px-6 oe-mb-4">
                  <div
                    class="oe-h-2 oe-bg-gray-100 oe-rounded-full overflow-hidden"
                  >
                    <div
                      class="oe-h-full oe-bg-green-500 oe-transition-all oe-duration-500 oe-rounded-full"
                      :style="{ width: phase2Progress + '%' }"
                    ></div>
                  </div>
                </div>

                <div
                  v-if="openPhases[2]"
                  class="oe-px-6 oe-pb-6 oe-space-y-3 mt-4"
                >
                  <div
                    v-for="(task, index) in phase2Tasks"
                    :key="task.id"
                    @click="toggleTaskStatus(task)"
                    class="oe-bg-gray-50 oe-px-5 oe-py-4 oe-rounded-2xl oe-flex oe-justify-between oe-items-center cursor-pointer hover:oe-bg-gray-100 transition-colors"
                  >
                    <div class="oe-flex oe-items-center oe-gap-3">
                      <span
                        class="oe-flex oe-items-center oe-justify-center oe-w-4 oe-h-4 oe-border oe-rounded-full transition-colors"
                        :class="
                          task.status === 'Done'
                            ? 'oe-rounded-full oe-border-green-500 oe-text-green-500'
                            : 'oe-border-gray-300'
                        "
                      >
                        <svg
                          v-if="task.status === 'Done'"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          class="oe-w-4 oe-h-4"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </span>
                      <div>
                        <p
                          class="oe-font-medium text-sm"
                          :class="{
                            'oe-text-gray-400 oe-line-through':
                              task.status === 'Done',
                          }"
                        >
                          {{ task.title }}
                        </p>
                        <p
                          v-if="task.subtitle"
                          class="oe-text-xs oe-text-gray-500"
                        >
                          {{ task.subtitle }}
                        </p>
                      </div>
                    </div>
                    <div class="oe-flex oe-items-center oe-gap-3">
                      <span class="oe-text-xs oe-text-gray-500">{{
                        task.assigned
                      }}</span>
                      <TaskStatusBadge
                        :status="task.status"
                        @change="
                          (newStatus) =>
                            updateTaskStatus(phase2Tasks, index, newStatus)
                        "
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Phase 3 -->
            <div class="lg:oe-col-span-6">
              <div
                class="oe-border oe-border-gray-200 oe-rounded-3xl overflow-hidden oe-transition-colors"
                :class="{
                  'oe-border-emerald-200 oe-bg-emerald-50/10':
                    phase3Progress === 100,
                }"
              >
                <div
                  @click="togglePhase(3)"
                  class="oe-flex oe-items-center oe-justify-between oe-px-6 oe-py-5 cursor-pointer hover:oe-bg-gray-50"
                >
                  <div class="oe-flex oe-items-center oe-gap-4">
                    <div
                      class="oe-w-8 oe-h-8 oe-rounded-2xl oe-flex oe-items-center oe-justify-center text-xl font-semibold"
                      :class="
                        phase3Progress === 100
                          ? 'oe-bg-green-500 oe-text-white'
                          : 'oe-bg-purple-600 oe-text-white'
                      "
                    >
                      <span v-if="phase3Progress === 100">
                        <Icon icon="lucide:check" class="oe-w-5 oe-h-5 oe-text-white" />
                      </span>
                      <span v-else>3</span>
                    </div>
                    <div>
                      <p class="oe-font-semibold">
                        Phase 3: {{ phase3Name || "Knowledge Transfer" }}
                      </p>
                      <p class="oe-text-xs oe-text-gray-500">
                        {{
                          phase3Description ||
                          "Project handover and access transitions"
                        }}
                      </p>
                    </div>
                  </div>
                  <div class="oe-flex oe-items-center oe-gap-3">
                    <span class="oe-text-sm oe-font-medium text-gray-500"
                      >{{ phase3Completed }}/{{ phase3Tasks.length }}</span
                    >
                    <span
                      class="oe-text-2xl transition-transform duration-200"
                      :class="{ 'oe-rotate-180': openPhases[3] }"
                      >▼</span
                    >
                  </div>
                </div>

                <!-- Progress Bar -->
                <div class="oe-px-6 oe-mb-4">
                  <div
                    class="oe-h-2 oe-bg-gray-100 oe-rounded-full overflow-hidden"
                  >
                    <div
                      class="oe-h-full oe-bg-green-500 oe-transition-all oe-duration-500 oe-rounded-full"
                      :style="{ width: phase3Progress + '%' }"
                    ></div>
                  </div>
                </div>

                <div
                  v-if="openPhases[3]"
                  class="oe-px-6 oe-pb-6 oe-space-y-3 mt-4"
                >
                  <div
                    v-for="(task, index) in phase3Tasks"
                    :key="task.id"
                    @click="toggleTaskStatus(task)"
                    class="oe-bg-gray-50 oe-px-5 oe-py-4 oe-rounded-2xl oe-flex oe-justify-between oe-items-center cursor-pointer hover:oe-bg-gray-100 transition-colors"
                  >
                    <div class="oe-flex oe-items-center oe-gap-3">
                      <span
                        class="oe-flex oe-items-center oe-justify-center oe-w-4 oe-h-4 oe-border oe-rounded-full transition-colors"
                        :class="
                          task.status === 'Done'
                            ? 'oe-rounded-full oe-border-green-500 oe-text-green-500'
                            : 'oe-border-gray-300'
                        "
                      >
                        <svg
                          v-if="task.status === 'Done'"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          class="oe-w-4 oe-h-4"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </span>
                      <div>
                        <p
                          class="oe-font-medium text-sm"
                          :class="{
                            'oe-text-gray-400 oe-line-through':
                              task.status === 'Done',
                          }"
                        >
                          {{ task.title }}
                        </p>
                        <p
                          v-if="task.subtitle"
                          class="oe-text-xs oe-text-gray-500"
                        >
                          {{ task.subtitle }}
                        </p>
                      </div>
                    </div>
                    <div class="oe-flex oe-items-center oe-gap-3">
                      <span class="oe-text-xs oe-text-gray-500">{{
                        task.assigned
                      }}</span>
                      <TaskStatusBadge
                        :status="task.status"
                        @change="
                          (newStatus) =>
                            updateTaskStatus(phase3Tasks, index, newStatus)
                        "
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Phase 4 -->
            <div class="lg:oe-col-span-6">
              <div
                class="oe-border oe-border-gray-200 oe-rounded-3xl overflow-hidden oe-transition-colors"
                :class="{
                  'oe-border-emerald-200 oe-bg-emerald-50/10':
                    phase4Progress === 100,
                }"
              >
                <div
                  @click="togglePhase(4)"
                  class="oe-flex oe-items-center oe-justify-between oe-px-6 oe-py-5 cursor-pointer hover:oe-bg-gray-50"
                >
                  <div class="oe-flex oe-items-center oe-gap-4">
                    <div
                      class="oe-w-8 oe-h-8 oe-rounded-2xl oe-flex oe-items-center oe-justify-center text-xl font-semibold"
                      :class="
                        phase4Progress === 100
                          ? 'oe-bg-green-500 oe-text-white'
                          : 'oe-bg-amber-600 oe-text-white'
                      "
                    >
                      <span v-if="phase4Progress === 100">
                        <Icon icon="lucide:check" class="oe-w-5 oe-h-5 oe-text-white" />
                      </span>
                      <span v-else>4</span>
                    </div>
                    <div>
                      <p class="oe-font-semibold">
                        Phase 4: {{ phase4Name || "Final Clearance" }}
                      </p>
                      <p class="oe-text-xs oe-text-gray-500">
                        {{
                          phase4Description ||
                          "Asset return, finance closure, and archival"
                        }}
                      </p>
                    </div>
                  </div>
                  <div class="oe-flex oe-items-center oe-gap-3">
                    <span class="oe-text-sm oe-font-medium text-gray-500"
                      >{{ phase4Completed }}/{{ phase4Tasks.length }}</span
                    >
                    <span
                      class="oe-text-2xl transition-transform duration-200"
                      :class="{ 'oe-rotate-180': openPhases[4] }"
                      >▼</span
                    >
                  </div>
                </div>

                <!-- Progress Bar -->
                <div class="oe-px-6 oe-mb-4">
                  <div
                    class="oe-h-2 oe-bg-gray-100 oe-rounded-full overflow-hidden"
                  >
                    <div
                      class="oe-h-full oe-bg-green-500 oe-transition-all oe-duration-500 oe-rounded-full"
                      :style="{ width: phase4Progress + '%' }"
                    ></div>
                  </div>
                </div>

                <div
                  v-if="openPhases[4]"
                  class="oe-px-6 oe-pb-6 oe-space-y-3 mt-4"
                >
                  <div
                    v-for="(task, index) in phase4Tasks"
                    :key="task.id"
                    @click="toggleTaskStatus(task)"
                    class="oe-bg-gray-50 oe-px-5 oe-py-4 oe-rounded-2xl oe-flex oe-justify-between oe-items-center cursor-pointer hover:oe-bg-gray-100 transition-colors"
                  >
                    <div class="oe-flex oe-items-center oe-gap-3">
                      <span
                        class="oe-flex oe-items-center oe-justify-center oe-w-4 oe-h-4 oe-border oe-rounded-full transition-colors"
                        :class="
                          task.status === 'Done'
                            ? 'oe-rounded-full oe-border-green-500 oe-text-green-500'
                            : 'oe-border-gray-300'
                        "
                      >
                        <svg
                          v-if="task.status === 'Done'"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          class="oe-w-4 oe-h-4"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </span>
                      <div>
                        <p
                          class="oe-font-medium text-sm"
                          :class="{
                            'oe-text-gray-400 oe-line-through':
                              task.status === 'Done',
                          }"
                        >
                          {{ task.title }}
                        </p>
                        <p
                          v-if="task.subtitle"
                          class="oe-text-xs oe-text-gray-500"
                        >
                          {{ task.subtitle }}
                        </p>
                      </div>
                    </div>
                    <div class="oe-flex oe-items-center oe-gap-3">
                      <span class="oe-text-xs oe-text-gray-500">{{
                        task.assigned
                      }}</span>
                      <TaskStatusBadge
                        :status="task.status"
                        @change="
                          (newStatus) =>
                            updateTaskStatus(phase4Tasks, index, newStatus)
                        "
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Dialog
      v-model="statusUpdateDialogOpen"
      title="Update Task Status"
      max-width="md"
    >
      <div class="oe-space-y-4">
        <label class="oe-block oe-space-y-2">
          <span class="oe-text-sm oe-font-medium oe-text-slate-700">Reason</span>
          <input
            v-model="statusUpdateReason"
            type="text"
            placeholder="Enter reason"
            class="oe-w-full oe-rounded-2xl oe-border oe-border-slate-200 oe-px-4 oe-py-3 oe-text-sm focus:oe-border-blue-500 focus:oe-outline-none"
          />
        </label>

        <label class="oe-block oe-space-y-2">
          <span class="oe-text-sm oe-font-medium oe-text-slate-700">Comments</span>
          <textarea
            v-model="statusUpdateComments"
            rows="3"
            placeholder="Enter comments"
            class="oe-w-full oe-rounded-2xl oe-border oe-border-slate-200 oe-px-4 oe-py-3 oe-text-sm focus:oe-border-blue-500 focus:oe-outline-none"
          ></textarea>
        </label>

        <p v-if="statusUpdateError" class="oe-text-sm oe-text-red-600">
          {{ statusUpdateError }}
        </p>
      </div>

      <template #footer>
        <button
          @click="closeStatusUpdateDialog"
          type="button"
          class="oe-rounded-2xl oe-border oe-border-slate-200 oe-bg-white oe-px-4 oe-py-2 oe-text-sm oe-font-medium oe-text-slate-700 hover:oe-bg-slate-50"
        >
          Cancel
        </button>
        <button
          @click="submitStatusUpdate"
          :disabled="statusUpdateSubmitting"
          type="button"
          class="oe-rounded-2xl oe-bg-blue-600 oe-px-4 oe-py-2 oe-text-sm oe-font-medium oe-text-white hover:oe-bg-blue-700 disabled:oe-cursor-not-allowed disabled:oe-opacity-60"
        >
          {{ statusUpdateSubmitting ? "Saving..." : "Update" }}
        </button>
      </template>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { Icon } from "@iconify/vue";
import { useEmployeesApi } from "@/apis/employees";
import { useAuthStore } from "@/stores/auth";
import { useApi } from "@/composables/useApi";
import { useWebsocket } from "@/composables/useWebsocket";
import FilterDrawer from "@/components/FilterDrawer.vue";

const { listEmployees, getEmployee } = useEmployeesApi();
const authStore = useAuthStore();
const { onMessageReceived } = useWebsocket();

let unsubscribeWS = null;

const loadingEmployees = ref(true);
const loadingDetails = ref(false);
const searchQuery = ref("");
const allEmployees = ref([]);
const selectedEmployee = ref(null);

const isFilterDrawerOpen = ref(false);
const currentFilters = ref({
  keyword: "",
  from_date: "",
  to_date: "",
  is_paginate: true,
  page: 1,
  page_size: 10,
});

const getCleanFilters = (filters) => {
  const payload = {};

  if (filters.keyword?.trim()) {
    payload.keyword = filters.keyword.trim();
  }

  if (filters.from_date) {
    payload.from_date = filters.from_date;
  }
  if (filters.to_date) {
    payload.to_date = filters.to_date;
  }

  payload.is_paginate = Boolean(filters.is_paginate);

  if (payload.is_paginate) {
    payload.page = Number(filters.page) || 1;
    payload.page_size = Number(filters.page_size) || 10;
  }

  return payload;
};

const handleFilter = (filters) => {
  currentFilters.value = { ...filters };
  fetchEmployees();
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
  fetchEmployees();
};

const fetchEmployees = async () => {
  loadingEmployees.value = true;

  try {
    const userRole = authStore.user?.role;
    let endpoint = "/hr/employees";
    if (userRole === "SUPER_ADMIN") endpoint = "/super-admin/employees";

    const cleanPayload = getCleanFilters(currentFilters.value);

    const result = await listEmployees(endpoint, cleanPayload);

    if (result.ok) {
      allEmployees.value = result.data
        .map((e) => {
          const exitProcess = e.processes?.find((p) => p.process_type === "exit");
          if (!exitProcess) return null;

          return {
            ...e,
            initials:
              (e.first_name?.charAt(0) || "") + (e.last_name?.charAt(0) || ""),
            name: `${e.first_name || ""} ${e.last_name || ""}`.trim(),
            role: e.designation || "No Designation",
            date: formatDate(e.last_working_date || e.date_of_joining),
            status: exitProcess.overall_status?.toUpperCase() || "PENDING",
            statusClass:
              exitProcess.overall_status === "completed"
                ? "oe-bg-green-100 oe-text-green-700"
                : "oe-bg-rose-100 oe-text-rose-700",
            phase:
              exitProcess.phases?.find((p) => p.status === "started")?.phase_name ||
              exitProcess.phases?.[0]?.phase_name ||
              "Not Started",
            avatarBg: "oe-bg-rose-100 oe-text-rose-700",
          };
        })
        .filter(Boolean);

      if (allEmployees.value.length > 0) {
        selectEmployee(allEmployees.value[0]);
      } else {
        selectedEmployee.value = null;
      }
    }
  } catch (error) {
    console.error("Error fetching employees:", error);
  } finally {
    loadingEmployees.value = false;
  }
};

const openPhases = ref({
  1: true,
  2: true,
  3: true,
  4: true,
});

const togglePhase = (phase) => {
  openPhases.value[phase] = !openPhases.value[phase];
};

const phase1Name = ref("");
const phase1Description = ref("");
const phase1Tasks = ref([]);

const phase2Name = ref("");
const phase2Description = ref("");
const phase2Tasks = ref([]);

const phase3Name = ref("");
const phase3Description = ref("");
const phase3Tasks = ref([]);

const phase4Name = ref("");
const phase4Description = ref("");
const phase4Tasks = ref([]);
const statusUpdateDialogOpen = ref(false);
const statusUpdateReason = ref("");
const statusUpdateComments = ref("");
const statusUpdateError = ref("");
const statusUpdateSubmitting = ref(false);
const pendingStatusUpdate = ref(null);

const mapStatusToUI = (status) => {
  if (!status) return "Pending";
  const mapping = {
    pending: "Pending",
    inprogress: "In Process",
    started: "In Process",
    done: "Done",
    cancelled: "Cancelled",
    hold: "Hold",
  };
  return mapping[status.toLowerCase()] || "Pending";
};

const mapApiTasks = (apiTasks, phaseId) => {
  if (!apiTasks) return [];
  return apiTasks.map((t) => ({
    id: t.id,
    phase_id: phaseId,
    title: t.task_name,
    subtitle: t.description,
    assigned: t.assigned_role,
    status: mapStatusToUI(t.status),
  }));
};

const formatDate = (value) => {
  if (!value) return "Not set";
  const date = new Date(value);
  if (isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
};

const selectEmployee = async (employee) => {
  selectedEmployee.value = employee;
  loadingDetails.value = true;

  try {
    const userRole = authStore.user?.role;
    let endpoint = "/hr/employees";
    if (userRole === "SUPER_ADMIN") endpoint = "/super-admin/employees";

    const result = await getEmployee(endpoint, employee.id);
    if (result.ok) {
      const fullEmployee = result.data;
      const exitProcess = fullEmployee.processes?.find(
        (p) => p.process_type === "exit"
      );

      if (exitProcess && exitProcess.phases) {
        const phases = exitProcess.phases;

        const p1 = phases.find((p) => p.phase_number === 1);
        if (p1) {
          phase1Name.value = p1.phase_name;
          phase1Description.value = p1.description;
          phase1Tasks.value = mapApiTasks(p1.tasks, p1.id);
        } else {
          phase1Tasks.value = [];
        }

        const p2 = phases.find((p) => p.phase_number === 2);
        if (p2) {
          phase2Name.value = p2.phase_name;
          phase2Description.value = p2.description;
          phase2Tasks.value = mapApiTasks(p2.tasks, p2.id);
        } else {
          phase2Tasks.value = [];
        }

        const p3 = phases.find((p) => p.phase_number === 3);
        if (p3) {
          phase3Name.value = p3.phase_name;
          phase3Description.value = p3.description;
          phase3Tasks.value = mapApiTasks(p3.tasks, p3.id);
        } else {
          phase3Tasks.value = [];
        }

        const p4 = phases.find((p) => p.phase_number === 4);
        if (p4) {
          phase4Name.value = p4.phase_name;
          phase4Description.value = p4.description;
          phase4Tasks.value = mapApiTasks(p4.tasks, p4.id);
        } else {
          phase4Tasks.value = [];
        }
      }
    }
  } catch (error) {
    console.error("Error fetching employee details:", error);
  } finally {
    loadingDetails.value = false;
  }
};

const filteredEmployees = computed(() => {
  const query = searchQuery.value.trim().toLowerCase();
  if (!query) return allEmployees.value;

  return allEmployees.value.filter((emp) => {
    return (
      emp.name.toLowerCase().includes(query) ||
      emp.role.toLowerCase().includes(query) ||
      emp.employee_code?.toLowerCase().includes(query)
    );
  });
});

const mapUIToStatus = (uiStatus) => {
  const mapping = {
    Pending: "pending",
    "In Process": "inprogress",
    Done: "done",
    Hold: "hold",
  };
  return mapping[uiStatus] || "pending";
};

const toggleTaskStatus = async (task) => {
  const statuses = ["Pending", "In Process", "Done", "Hold"];
  const currentIndex = statuses.indexOf(task.status);
  const nextIndex = (currentIndex + 1) % statuses.length;
  const newStatus = statuses[nextIndex];
  updateTaskStatusDirectly(task, newStatus);
};

const updateTaskStatus = async (tasksArray, index, newStatus) => {
  const task = tasksArray[index];
  updateTaskStatusDirectly(task, newStatus);
};

const updateTaskStatusDirectly = (task, newStatus) => {
  const oldStatus = task.status;
  pendingStatusUpdate.value = { task, newStatus, oldStatus };
  statusUpdateReason.value = "";
  statusUpdateComments.value = "";
  statusUpdateError.value = "";
  statusUpdateDialogOpen.value = true;
};

const closeStatusUpdateDialog = () => {
  statusUpdateDialogOpen.value = false;
  statusUpdateError.value = "";
  pendingStatusUpdate.value = null;
};

const submitStatusUpdate = async () => {
  if (!pendingStatusUpdate.value) {
    return;
  }

  const reason = statusUpdateReason.value.trim();
  const comments = statusUpdateComments.value.trim();

  if (!reason || !comments) {
    statusUpdateError.value = "Reason and comments are required.";
    return;
  }

  statusUpdateError.value = "";
  statusUpdateSubmitting.value = true;
  const { task, newStatus, oldStatus } = pendingStatusUpdate.value;
  task.status = newStatus;

  try {
    const { call } = useApi();
    const endpoint = `/employee/employees/${selectedEmployee.value.id}/phases/${task.phase_id}/tasks/${task.id}/status`;

    const payload = {
      status: mapUIToStatus(newStatus),
      reason,
      comments,
    };

    const response = await call(endpoint, {
      method: "PATCH",
      body: payload,
    });

    if (!response) {
      task.status = oldStatus;
      console.error("Failed to update task status");
    }
  } catch (error) {
    task.status = oldStatus;
    console.error("Error updating task status:", error);
  } finally {
    statusUpdateSubmitting.value = false;
    closeStatusUpdateDialog();
  }
};

const phase1Completed = computed(
  () => phase1Tasks.value.filter((t) => t.status === "Done").length
);
const phase1Progress = computed(() =>
  phase1Tasks.value.length > 0
    ? (phase1Completed.value / phase1Tasks.value.length) * 100
    : 0
);

const phase2Completed = computed(
  () => phase2Tasks.value.filter((t) => t.status === "Done").length
);
const phase2Progress = computed(() =>
  phase2Tasks.value.length > 0
    ? (phase2Completed.value / phase2Tasks.value.length) * 100
    : 0
);

const phase3Completed = computed(
  () => phase3Tasks.value.filter((t) => t.status === "Done").length
);
const phase3Progress = computed(() =>
  phase3Tasks.value.length > 0
    ? (phase3Completed.value / phase3Tasks.value.length) * 100
    : 0
);

const phase4Completed = computed(
  () => phase4Tasks.value.filter((t) => t.status === "Done").length
);
const phase4Progress = computed(() =>
  phase4Tasks.value.length > 0
    ? (phase4Completed.value / phase4Tasks.value.length) * 100
    : 0
);

const totalTasks = computed(
  () =>
    phase1Tasks.value.length +
    phase2Tasks.value.length +
    phase3Tasks.value.length +
    phase4Tasks.value.length
);

const totalCompletedTasks = computed(
  () =>
    phase1Completed.value +
    phase2Completed.value +
    phase3Completed.value +
    phase4Completed.value
);

const overallProgress = computed(() =>
  totalTasks.value > 0 ? (totalCompletedTasks.value / totalTasks.value) * 100 : 0
);

const handleRealtimeTaskUpdate = (data) => {
  const { task_id, status, employee_id, overall_status } = data;

  const employee = allEmployees.value.find((e) => e.id === employee_id);
  if (employee) {
    if (overall_status) {
      employee.status = overall_status.toUpperCase();
      employee.statusClass =
        overall_status === "completed"
          ? "oe-bg-green-100 oe-text-green-700"
          : "oe-bg-rose-100 oe-text-rose-700";
    }
  }

  if (selectedEmployee.value && selectedEmployee.value.id === employee_id) {
    const allPhaseTasks = [
      phase1Tasks.value,
      phase2Tasks.value,
      phase3Tasks.value,
      phase4Tasks.value,
    ];
    for (const tasks of allPhaseTasks) {
      const task = tasks.find((t) => t.id === task_id);
      if (task) {
        task.status = mapStatusToUI(status);
        break;
      }
    }
  }
};

onMounted(() => {
  fetchEmployees();

  unsubscribeWS = onMessageReceived((message) => {
    if (message.type === "task_status_updated") {
      const updateData = message.data;
      handleRealtimeTaskUpdate(updateData);
    }
  });
});

onUnmounted(() => {
  if (unsubscribeWS) unsubscribeWS();
});
</script>
