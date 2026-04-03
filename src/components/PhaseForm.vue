<template>
  <div class="oe-min-h-screen oe-bg-gray-50">
    <div class="oe-mx-auto oe-space-y-8 oe-p-6">
      <!-- HEADER -->
      <div class="oe-flex oe-items-center oe-justify-between">
        <div>
          <h1 class="oe-text-2xl oe-font-bold oe-text-slate-900">Manage Phases & Tasks</h1>
          <p class="oe-text-slate-500">Configure workflow stages and specific requirements.</p>
        </div>
        <div class="oe-flex oe-gap-3">
          <div class="oe-flex oe-bg-white oe-p-1 oe-rounded-2xl oe-border oe-border-slate-200">
            <button
              @click="activeProcessType = 'onboarding'"
              class="oe-px-4 oe-py-2 oe-text-sm oe-font-medium oe-rounded-xl oe-transition-all"
              :class="activeProcessType === 'onboarding' ? 'oe-bg-blue-600 oe-text-white' : 'oe-text-slate-600 hover:oe-bg-slate-50'"
            >
              Onboarding
            </button>
            <button
              @click="activeProcessType = 'exit'"
              class="oe-px-4 oe-py-2 oe-text-sm oe-font-medium oe-rounded-xl oe-transition-all"
              :class="activeProcessType === 'exit' ? 'oe-bg-blue-600 oe-text-white' : 'oe-text-slate-600 hover:oe-bg-slate-50'"
            >
              Exit
            </button>
          </div>
          <button
            @click="openCreateForm"
            class="oe-rounded-2xl oe-bg-blue-600 oe-px-6 oe-py-3 oe-text-sm oe-font-medium oe-text-white hover:oe-bg-blue-700 oe-transition-colors"
          >
            Add Phase
          </button>
        </div>
      </div>

      <!-- PHASES LIST -->
      <section class="oe-grid oe-grid-cols-1 oe-gap-6">
        <div v-if="loading" class="oe-p-12 oe-text-center">
          <div class="oe-animate-spin oe-inline-block oe-w-8 oe-h-8 oe-border-4 oe-border-blue-600 oe-border-t-transparent oe-rounded-full"></div>
          <p class="oe-mt-4 oe-text-slate-500">Loading phases...</p>
        </div>

        <div v-else-if="phases.length === 0" class="oe-bg-white oe-p-12 oe-text-center oe-rounded-[2rem] oe-border oe-border-slate-100">
          <p class="oe-text-slate-500">No {{ activeProcessType }} phases found. Create one to get started.</p>
        </div>

        <div v-else class="oe-space-y-6">
          <div
            v-for="phase in phases"
            :key="phase.id"
            class="oe-bg-white oe-rounded-[2rem] oe-border oe-border-slate-100 oe-shadow-sm oe-overflow-hidden"
          >
            <!-- Phase Header -->
            <div class="oe-p-6 oe-border-b oe-border-slate-50 oe-flex oe-items-center oe-justify-between oe-bg-slate-50/30">
              <div class="oe-flex oe-items-center oe-gap-4">
                <div class="oe-flex oe-h-12 oe-w-12 oe-items-center oe-justify-center oe-rounded-2xl oe-bg-blue-100 oe-text-blue-600 oe-font-bold">
                  {{ phase.phase_number }}
                </div>
                <div>
                  <h3 class="oe-text-lg oe-font-semibold oe-text-slate-900">{{ phase.phase_name }}</h3>
                  <p class="oe-text-sm oe-text-slate-500">{{ phase.description }}</p>
                </div>
              </div>
              <div class="oe-flex oe-items-center oe-gap-2">
                <button
                  @click="openAddTaskDialog(phase)"
                  class="oe-px-4 oe-py-2 oe-text-sm oe-font-medium oe-text-blue-600 hover:oe-bg-blue-50 oe-rounded-xl oe-transition-colors"
                >
                  + Add Task
                </button>
                <button
                  @click="openEditForm(phase)"
                  class="oe-p-2 oe-text-slate-400 hover:oe-text-slate-600 oe-rounded-xl"
                >
                  <svg class="oe-w-5 oe-h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Tasks for this phase -->
            <div class="oe-p-6">
               <div v-if="phase.tasks && phase.tasks.length > 0" class="oe-space-y-3">
                  <div
                    v-for="task in phase.tasks"
                    :key="task.id"
                    class="oe-flex oe-items-center oe-justify-between oe-p-4 oe-rounded-2xl oe-bg-slate-50/50 oe-border oe-border-slate-100"
                  >
                    <div class="oe-flex oe-items-center oe-gap-4">
                      <div class="oe-text-xs oe-font-bold oe-text-slate-400 oe-w-6">#{{ task.task_order }}</div>
                      <div>
                        <div class="oe-text-sm oe-font-semibold oe-text-slate-800">{{ task.task_name }}</div>
                        <div class="oe-text-xs oe-text-slate-500">{{ task.description }}</div>
                      </div>
                    </div>
                    <div class="oe-flex oe-items-center oe-gap-3">
                      <span class="oe-px-2 oe-py-1 oe-bg-blue-100 oe-text-blue-700 oe-rounded-lg oe-text-[10px] oe-font-bold">
                        {{ task.assigned_role }}
                      </span>
                    </div>
                  </div>
               </div>
               <div v-else class="oe-text-center oe-py-6 oe-bg-slate-50/30 oe-rounded-2xl oe-border oe-border-dashed oe-border-slate-200">
                 <p class="oe-text-xs oe-text-slate-400">No tasks assigned to this phase yet.</p>
                 <button @click="openAddTaskDialog(phase)" class="oe-mt-2 oe-text-xs oe-text-blue-600 oe-font-medium hover:oe-underline">
                   Create the first task
                 </button>
               </div>
            </div>
          </div>
        </div>
      </section>

      <!-- PHASE DIALOG -->
      <Dialog
        v-model="showPhaseDialog"
        :title="isEditing ? 'Update Phase' : 'Create New Phase'"
        maxWidth="lg"
      >
        <form @submit.prevent="handlePhaseSubmit" class="oe-space-y-5">
          <div class="oe-space-y-2">
            <label class="oe-text-sm oe-font-medium oe-text-slate-700">Process Type</label>
            <select
              v-model="phaseForm.process_type"
              required
              class="oe-w-full oe-rounded-2xl oe-border oe-border-slate-200 oe-px-4 oe-py-3 oe-text-sm focus:oe-border-blue-500 focus:oe-outline-none"
            >
              <option value="onboarding">Onboarding</option>
              <option value="offboarding">Offboarding</option>
            </select>
          </div>

          <div class="oe-grid oe-grid-cols-2 oe-gap-4">
            <div class="oe-space-y-2">
              <label class="oe-text-sm oe-font-medium oe-text-slate-700">Phase Number</label>
              <input
                v-model.number="phaseForm.phase_number"
                type="number"
                min="1"
                required
                class="oe-w-full oe-rounded-2xl oe-border oe-border-slate-200 oe-px-4 oe-py-3 oe-text-sm focus:oe-border-blue-500 focus:oe-outline-none"
              />
            </div>
            <div class="oe-space-y-2">
              <label class="oe-text-sm oe-font-medium oe-text-slate-700">Phase Name</label>
              <input
                v-model="phaseForm.phase_name"
                required
                placeholder="e.g. IT Setup"
                class="oe-w-full oe-rounded-2xl oe-border oe-border-slate-200 oe-px-4 oe-py-3 oe-text-sm focus:oe-border-blue-500 focus:oe-outline-none"
              />
            </div>
          </div>

          <div class="oe-space-y-2">
            <label class="oe-text-sm oe-font-medium oe-text-slate-700">Description</label>
            <textarea
              v-model="phaseForm.description"
              placeholder="What happens in this phase?"
              rows="3"
              class="oe-w-full oe-rounded-2xl oe-border oe-border-slate-200 oe-px-4 oe-py-3 oe-text-sm focus:oe-border-blue-500 focus:oe-outline-none"
            ></textarea>
          </div>

          <div class="oe-flex oe-justify-end oe-gap-3 oe-pt-4">
            <button
              type="button"
              @click="showPhaseDialog = false"
              class="oe-px-6 oe-py-3 oe-text-sm oe-font-medium oe-text-slate-600 hover:oe-bg-slate-100 oe-rounded-2xl oe-transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="submitting"
              class="oe-px-8 oe-py-3 oe-bg-blue-600 oe-text-white oe-text-sm oe-font-medium oe-rounded-2xl hover:oe-bg-blue-700 disabled:oe-opacity-50 oe-transition-colors"
            >
              {{ submitting ? 'Saving...' : (isEditing ? 'Update Phase' : 'Create Phase') }}
            </button>
          </div>
        </form>
      </Dialog>

      <!-- TASK DIALOG -->
      <Dialog
        v-model="showTaskDialog"
        :title="'Add Task to ' + selectedPhase?.phase_name"
        maxWidth="lg"
      >
        <form @submit.prevent="handleTaskSubmit" class="oe-space-y-5">
          <div class="oe-grid oe-grid-cols-2 oe-gap-4">
            <div class="oe-space-y-2">
              <label class="oe-text-sm oe-font-medium oe-text-slate-700">Task Order</label>
              <input
                v-model.number="taskForm.task_order"
                type="number"
                min="0"
                required
                class="oe-w-full oe-rounded-2xl oe-border oe-border-slate-200 oe-px-4 oe-py-3 oe-text-sm focus:oe-border-blue-500 focus:oe-outline-none"
              />
            </div>
            <div class="oe-space-y-2">
              <label class="oe-text-sm oe-font-medium oe-text-slate-700">Assigned Role</label>
              <select
                v-model="taskForm.assigned_role"
                required
                class="oe-w-full oe-rounded-2xl oe-border oe-border-slate-200 oe-px-4 oe-py-3 oe-text-sm focus:oe-border-blue-500 focus:oe-outline-none"
              >
                <option value="SUPER_ADMIN">Super Admin</option>
                <option value="HR">HR</option>
                <option value="IT">IT</option>
                <option value="EMPLOYEE">Employee</option>
                <option value="MANAGER">Manager</option>
              </select>
            </div>
          </div>

          <div class="oe-space-y-2">
            <label class="oe-text-sm oe-font-medium oe-text-slate-700">Task Name</label>
            <input
              v-model="taskForm.task_name"
              required
              placeholder="e.g. Identity Card Creation"
              class="oe-w-full oe-rounded-2xl oe-border oe-border-slate-200 oe-px-4 oe-py-3 oe-text-sm focus:oe-border-blue-500 focus:oe-outline-none"
            />
          </div>

          <div class="oe-space-y-2">
            <label class="oe-text-sm oe-font-medium oe-text-slate-700">Description</label>
            <textarea
              v-model="taskForm.description"
              placeholder="Details about this specific task..."
              rows="3"
              class="oe-w-full oe-rounded-2xl oe-border oe-border-slate-200 oe-px-4 oe-py-3 oe-text-sm focus:oe-border-blue-500 focus:oe-outline-none"
            ></textarea>
          </div>

          <div class="oe-flex oe-justify-end oe-gap-3 oe-pt-4">
            <button
              type="button"
              @click="showTaskDialog = false"
              class="oe-px-6 oe-py-3 oe-text-sm oe-font-medium oe-text-slate-600 hover:oe-bg-slate-100 oe-rounded-2xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="submitting"
              class="oe-px-8 oe-py-3 oe-bg-blue-600 oe-text-white oe-text-sm oe-font-medium oe-rounded-2xl hover:oe-bg-blue-700 disabled:oe-opacity-50"
            >
              {{ submitting ? 'Adding...' : 'Create Task' }}
            </button>
          </div>
        </form>
      </Dialog>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, watch } from "vue";
import { usePhaseApi, type PhasePayload, type TaskPayload } from "@/apis/phases";
import Dialog from "@/components/Dialog.vue";
import { useToastStore } from "@/stores/toast";

const props = defineProps({
  basePath: {
    type: String,
    default: "super-admin"
  }
});

const { listPhases, createPhase, updatePhase, createTask, listTasks } = usePhaseApi(props.basePath);
const toastStore = useToastStore();

/* STATE */
const phases = ref<any[]>([]);
const loading = ref(true);
const submitting = ref(false);
const activeProcessType = ref("onboarding");

// Phase Form State
const showPhaseDialog = ref(false);
const editingId = ref<number | null>(null);
const phaseForm = reactive<PhasePayload>({
  process_type: "onboarding",
  phase_number: 1,
  phase_name: "",
  description: "",
});

// Task Form State
const showTaskDialog = ref(false);
const selectedPhase = ref<any>(null);
const taskForm = reactive<TaskPayload>({
  task_order: 0,
  task_name: "",
  description: "",
  assigned_role: "SUPER_ADMIN",
});

const isEditing = computed(() => editingId.value !== null);

/* FETCH */
const fetchPhases = async () => {
  loading.value = true;
  try {
    const res = await listPhases(activeProcessType.value);
    if (res.ok) {
      // For each phase, also fetch its tasks
      const phasesWithTasks = await Promise.all(res.data.map(async (phase: any) => {
        const taskRes = await listTasks(phase.id);
        return { ...phase, tasks: taskRes.ok ? taskRes.data : [] };
      }));
      phases.value = phasesWithTasks;
    } else {
      toastStore.error(res.message || "Failed to fetch phases");
    }
  } catch (err: any) {
    toastStore.error("Something went wrong while fetching phases");
  } finally {
    loading.value = false;
  }
};

watch(activeProcessType, fetchPhases);

/* PHASE ACTIONS */
const openCreateForm = () => {
  editingId.value = null;
  phaseForm.process_type = activeProcessType.value;
  phaseForm.phase_number = phases.value.length + 1;
  phaseForm.phase_name = "";
  phaseForm.description = "";
  showPhaseDialog.value = true;
};

const openEditForm = (phase: any) => {
  editingId.value = phase.id;
  phaseForm.process_type = phase.process_type;
  phaseForm.phase_number = phase.phase_number;
  phaseForm.phase_name = phase.phase_name;
  phaseForm.description = phase.description;
  showPhaseDialog.value = true;
};

const handlePhaseSubmit = async () => {
  submitting.value = true;
  try {
    const res = isEditing.value
      ? await updatePhase(editingId.value!, phaseForm)
      : await createPhase(phaseForm);

    if (res.ok) {
      toastStore.success(res.message || `Phase ${isEditing.value ? 'updated' : 'created'} successfully`);
      await fetchPhases();
      showPhaseDialog.value = false;
    } else {
      toastStore.error(res.message || "Failed to save phase");
    }
  } finally {
    submitting.value = false;
  }
};

/* TASK ACTIONS */
const openAddTaskDialog = (phase: any) => {
  selectedPhase.value = phase;
  taskForm.task_order = (phase.tasks?.length || 0);
  taskForm.task_name = "";
  taskForm.description = "";
  taskForm.assigned_role = props.basePath === 'hr' ? 'HR' : 'SUPER_ADMIN';
  showTaskDialog.value = true;
};

const handleTaskSubmit = async () => {
  if (!selectedPhase.value) return;
  submitting.value = true;
  try {
    const res = await createTask(selectedPhase.value.id, taskForm);
    if (res.ok) {
      toastStore.success(res.message || "Task added successfully");
      await fetchPhases();
      showTaskDialog.value = false;
    } else {
      toastStore.error(res.message || "Failed to add task");
    }
  } finally {
    submitting.value = false;
  }
};

onMounted(fetchPhases);
</script>
