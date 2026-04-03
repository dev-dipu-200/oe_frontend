<template>
  <div class="oe-min-h-screen oe-bg-gray-50">
    <div class="oe-mx-auto oe-space-y-8 oe-p-6">
      <!-- HEADER -->
      <div class="oe-flex oe-items-center oe-justify-between">
        <div>
          <h1 class="oe-text-2xl oe-font-bold oe-text-slate-900">Task Management</h1>
          <p class="oe-text-slate-500">Manage and assign tasks for employee phases.</p>
        </div>
        <button
          @click="openCreateForm"
          class="oe-rounded-2xl oe-bg-blue-600 oe-px-6 oe-py-3 oe-text-sm oe-font-medium oe-text-white hover:oe-bg-blue-700 oe-transition-colors"
        >
          Create Task
        </button>
      </div>

      <!-- LIST -->
      <section class="oe-bg-white oe-rounded-[2rem] oe-border oe-border-slate-100 oe-shadow-sm oe-overflow-hidden">
        <div class="oe-p-6 oe-border-b oe-border-slate-50">
          <h2 class="oe-text-lg oe-font-semibold oe-text-slate-800">Tasks</h2>
        </div>

        <div v-if="loading" class="oe-p-12 oe-text-center">
          <div class="oe-animate-spin oe-inline-block oe-w-8 oe-h-8 oe-border-4 oe-border-blue-600 oe-border-t-transparent oe-rounded-full"></div>
        </div>

        <div v-else-if="tasks.length === 0" class="oe-p-12 oe-text-center">
          <p class="oe-text-slate-500">No tasks found.</p>
        </div>

        <div v-else class="oe-divide-y oe-divide-slate-50">
          <div
            v-for="task in tasks"
            :key="task.id"
            class="oe-p-6 hover:oe-bg-slate-50/50 oe-transition-colors oe-flex oe-items-center oe-justify-between"
          >
            <div>
              <h3 class="oe-font-semibold oe-text-slate-900">{{ task.title }}</h3>
              <p class="oe-text-sm oe-text-slate-500">Assigned to: {{ task.assignedTo }}</p>
            </div>
            <button
              @click="openEditForm(task)"
              class="oe-text-blue-600 oe-text-sm oe-font-medium hover:oe-underline"
            >
              Edit
            </button>
          </div>
        </div>
      </section>

      <!-- DIALOG FORM -->
      <Dialog
        v-model="showDialog"
        :title="isEditing ? 'Edit Task' : 'Create Task'"
        maxWidth="lg"
      >
        <form @submit.prevent="handleSubmit" class="oe-space-y-5">
          <div class="oe-space-y-2">
            <label class="oe-text-sm oe-font-medium oe-text-slate-700">Task Title</label>
            <input
              v-model="form.title"
              required
              class="oe-w-full oe-rounded-2xl oe-border oe-border-slate-200 oe-px-4 oe-py-3 oe-text-sm focus:oe-border-blue-500 focus:oe-outline-none"
              placeholder="e.g. Submit documents"
            />
          </div>

          <div class="oe-space-y-2">
            <label class="oe-text-sm oe-font-medium oe-text-slate-700">Assign To</label>
            <input
              v-model="form.assignedTo"
              required
              class="oe-w-full oe-rounded-2xl oe-border oe-border-slate-200 oe-px-4 oe-py-3 oe-text-sm focus:oe-border-blue-500 focus:oe-outline-none"
              placeholder="e.g. HR Manager"
            />
          </div>

          <div class="oe-flex oe-justify-end oe-gap-3 oe-pt-4">
            <button
              type="button"
              @click="showDialog = false"
              class="oe-px-6 oe-py-3 oe-text-sm oe-font-medium oe-text-slate-600 hover:oe-bg-slate-100 oe-rounded-2xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="oe-px-8 oe-py-3 oe-bg-blue-600 oe-text-white oe-text-sm oe-font-medium oe-rounded-2xl hover:oe-bg-blue-700"
            >
              {{ isEditing ? 'Update Task' : 'Create Task' }}
            </button>
          </div>
        </form>
      </Dialog>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from "vue";
import Dialog from "@/components/Dialog.vue";

const tasks = ref<any[]>([]);
const loading = ref(false);
const showDialog = ref(false);
const editingId = ref<number | null>(null);

const form = reactive({
  title: "",
  assignedTo: "",
});

const isEditing = computed(() => editingId.value !== null);

const openCreateForm = () => {
  editingId.value = null;
  form.title = "";
  form.assignedTo = "";
  showDialog.value = true;
};

const openEditForm = (task: any) => {
  editingId.value = task.id;
  form.title = task.title;
  form.assignedTo = task.assignedTo;
  showDialog.value = true;
};

const handleSubmit = () => {
  // Mock submit
  if (isEditing.value) {
    const index = tasks.value.findIndex(t => t.id === editingId.value);
    if (index !== -1) tasks.value[index] = { ...tasks.value[index], ...form };
  } else {
    tasks.value.push({ id: Date.now(), ...form });
  }
  showDialog.value = false;
};
</script>
