<template>
  <div
    class="oe-min-h-screen oe-bg-gray-50 oe-transition-colors oe-duration-300"
  >
    <div class="oe-mx-auto oe-space-y-8 oe-p-2">
      <section
        class=""
      >
        <div
          class="oe-flex oe-flex-col oe-gap-4 lg:oe-flex-row lg:oe-items-center lg:oe-justify-between"
        >
          <div class="oe-flex-1">
            <div class="oe-relative">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search by code, name, email"
                class="oe-w-1/4 oe-rounded-2xl oe-border oe-border-slate-200 oe-bg-white oe-px-4 oe-py-3 oe-pl-12 oe-text-sm focus:oe-border-blue-500 focus:oe-outline-none"
              />
              <span
                class="oe-pointer-events-none oe-absolute oe-left-4 oe-top-1/2 -oe-translate-y-1/2 oe-text-slate-400"
              >
                🔍
              </span>
            </div>
          </div>

          <div class="oe-flex oe-flex-wrap oe-gap-3">
             <button
              @click="isFilterDrawerOpen = true"
              type="button"
              class="oe-rounded-2xl oe-border oe-border-slate-200 oe-bg-white oe-px-4 oe-py-3 oe-text-sm oe-font-medium oe-text-slate-700 hover:oe-bg-slate-50 oe-flex oe-items-center oe-gap-2"
            >
              <span>🔽</span>
              Filter
            </button>
            <button
              @click="fetchEmployees"
              type="button"
              class="oe-rounded-2xl oe-border oe-border-slate-200 oe-bg-white oe-px-4 oe-py-3 oe-text-sm oe-font-medium oe-text-slate-700 hover:oe-bg-slate-50"
            >
              Refresh
            </button>
          </div>
        </div>
      </section>

      <FilterDrawer
        v-model:is-open="isFilterDrawerOpen"
        :initial-filters="currentFilters"
        @filter="handleFilter"
        @reset="handleReset"
      />

      <section
        class="oe-grid oe-grid-cols-1 oe-gap-6 xl:oe-grid-cols-[minmax(0,1.5fr)_minmax(360px,0.9fr)]"
      >
        <div
          class="oe-rounded-[2rem] oe-border oe-border-slate-200 oe-bg-white oe-shadow-sm"
        >
          <div
            class="oe-flex oe-items-center oe-justify-between oe-border-b oe-border-slate-100 oe-p-6"
          >
            <div>
              <h2 class="oe-text-xl oe-font-semibold oe-text-slate-900">
                Employees
              </h2>
              <p class="oe-mt-1 oe-text-sm oe-text-slate-500">
                Manage onboarding-ready employee records from one place.
              </p>
            </div>
            <span
              class="oe-rounded-full oe-bg-slate-100 oe-px-3 oe-py-1 oe-text-xs oe-font-medium oe-text-slate-600"
            >
              {{ filteredEmployees.length }} records
            </span>
          </div>

          <div
            v-if="loading"
            class="oe-flex oe-h-80 oe-items-center oe-justify-center oe-text-slate-400"
          >
            Loading employees...
          </div>

          <div
            v-else-if="filteredEmployees.length === 0"
            class="oe-flex oe-h-80 oe-flex-col oe-items-center oe-justify-center oe-gap-3 oe-text-center"
          >
            <div
              class="oe-flex oe-h-14 oe-w-14 oe-items-center oe-justify-center oe-rounded-2xl oe-bg-slate-100 oe-text-2xl"
            >
              👥
            </div>
            <div>
              <p class="oe-font-medium oe-text-slate-900">No employees found</p>
              <p class="oe-text-sm oe-text-slate-500">
                Add a new employee or change the search term.
              </p>
            </div>
          </div>

          <div v-else class="oe-divide-y oe-divide-slate-100">
            <article
              v-for="employee in filteredEmployees"
              :key="getEmployeeKey(employee)"
              class="oe-flex oe-flex-col oe-gap-4 oe-p-6 lg:oe-flex-row lg:oe-items-center lg:oe-justify-between"
            >
              <div class="oe-flex oe-min-w-0 oe-items-start oe-gap-4">
                <div
                  class="oe-flex oe-h-12 oe-w-12 oe-flex-shrink-0 oe-items-center oe-justify-center oe-rounded-2xl oe-bg-blue-100 oe-text-sm oe-font-semibold oe-text-blue-700"
                >
                  {{ getInitials(employee) }}
                </div>

                <div class="oe-min-w-0">
                  <div class="oe-flex oe-flex-wrap oe-items-center oe-gap-2">
                    <h3 class="oe-text-lg oe-font-semibold oe-text-slate-900">
                      {{ getFullName(employee) }}
                    </h3>
                    <span
                      class="oe-rounded-full oe-bg-slate-100 oe-px-2.5 oe-py-1 oe-text-xs oe-font-medium oe-text-slate-600"
                    >
                      {{ employee.employee_code || "No code" }}
                    </span>
                  </div>

                  <div
                    class="oe-mt-2 oe-flex oe-flex-wrap oe-gap-x-4 oe-gap-y-1 oe-text-sm oe-text-slate-500"
                  >
                    <span>{{ employee.email || "No email" }}</span>
                    <span>{{ employee.department || "No department" }}</span>
                    <span>{{ employee.designation || "No designation" }}</span>
                  </div>

                  <div class="oe-mt-3 oe-flex oe-flex-wrap oe-gap-2">
                    <span
                      class="oe-rounded-full oe-bg-emerald-50 oe-px-3 oe-py-1 oe-text-xs oe-font-medium oe-text-emerald-700"
                    >
                      {{ employee.employee_type || "Employee type pending" }}
                    </span>
                    <span
                      class="oe-rounded-full oe-bg-amber-50 oe-px-3 oe-py-1 oe-text-xs oe-font-medium oe-text-amber-700"
                    >
                      {{ employee.work_location || "Location pending" }}
                    </span>
                    <span
                      class="oe-rounded-full oe-bg-violet-50 oe-px-3 oe-py-1 oe-text-xs oe-font-medium oe-text-violet-700"
                    >
                      {{ employee.gender || "Gender pending" }}
                    </span>
                  </div>
                </div>
              </div>

              <div class="oe-flex oe-flex-col oe-gap-3 lg:oe-items-end">
                <div
                  class="oe-grid oe-grid-cols-2 oe-gap-3 oe-text-sm oe-text-slate-500"
                >
                  <div>
                    <p
                      class="oe-text-xs oe-uppercase oe-tracking-[0.2em] oe-text-slate-400"
                    >
                      Joined
                    </p>
                    <p class="oe-mt-1 oe-font-medium oe-text-slate-700">
                      {{ formatDate(employee.date_of_joining) }}
                    </p>
                  </div>
                  <div>
                    <p
                      class="oe-text-xs oe-uppercase oe-tracking-[0.2em] oe-text-slate-400"
                    >
                      Mobile
                    </p>
                    <p class="oe-mt-1 oe-font-medium oe-text-slate-700">
                      {{ employee.mobile_number || "Not added" }}
                    </p>
                  </div>
                </div>

                <button
                  @click="openEditForm(employee)"
                  type="button"
                  class="oe-rounded-2xl oe-border oe-border-slate-200 oe-bg-slate-50 oe-px-4 oe-py-2.5 oe-text-sm oe-font-medium oe-text-slate-700 hover:oe-bg-slate-100"
                >
                  Edit Employee
                </button>
              </div>
            </article>
          </div>
        </div>

        <aside
          class="oe-rounded-[2rem] oe-border oe-border-slate-200 oe-bg-white oe-p-6 oe-shadow-sm"
        >
          <div class="oe-flex oe-items-start oe-justify-between oe-gap-4">
            <div>
              <p
                class="oe-text-sm oe-uppercase oe-tracking-[0.25em] oe-text-blue-600"
              >
                {{ isEditing ? "Update Record" : "Create Record" }}
              </p>
              <h2
                class="oe-mt-2 oe-text-2xl oe-font-semibold oe-text-slate-900"
              >
                {{ isEditing ? "Update employee" : "Add new employee" }}
              </h2>
              <p class="oe-mt-2 oe-text-sm oe-text-slate-500">
                Keep employee details structured for onboarding, role mapping,
                and reporting.
              </p>
            </div>

            <button
              v-if="isEditing"
              @click="openCreateForm"
              type="button"
              class="oe-rounded-full oe-bg-slate-100 oe-px-3 oe-py-1.5 oe-text-xs oe-font-medium oe-text-slate-600"
            >
              New
            </button>
          </div>

          <form class="oe-mt-6 oe-space-y-5" @submit.prevent="handleSubmit">
            <div class="oe-grid oe-grid-cols-1 oe-gap-4 md:oe-grid-cols-2">
              <label class="oe-space-y-2 oe">
                <span class="oe-text-sm oe-font-medium oe-text-slate-700"
                  >Employee Code</span
                >
                <input
                  :disabled="true"
                  v-model="form.employee_code"
                  required
                  type="text"
                  class="oe-w-full oe-rounded-2xl oe-border oe-border-slate-200 oe-px-4 oe-py-3 oe-text-sm focus:oe-border-blue-500 focus:oe-outline-none"
                />
              </label>

              <label class="oe-space-y-2">
                <span class="oe-text-sm oe-font-medium oe-text-slate-700"
                  >Email</span
                >
                <input
                  v-model="form.email"
                  required
                  type="email"
                  class="oe-w-full oe-rounded-2xl oe-border oe-border-slate-200 oe-px-4 oe-py-3 oe-text-sm focus:oe-border-blue-500 focus:oe-outline-none"
                />
              </label>

              <label class="oe-space-y-2">
                <span class="oe-text-sm oe-font-medium oe-text-slate-700"
                  >First Name</span
                >
                <input
                  v-model="form.first_name"
                  required
                  type="text"
                  class="oe-w-full oe-rounded-2xl oe-border oe-border-slate-200 oe-px-4 oe-py-3 oe-text-sm focus:oe-border-blue-500 focus:oe-outline-none"
                />
              </label>

              <label class="oe-space-y-2">
                <span class="oe-text-sm oe-font-medium oe-text-slate-700"
                  >Last Name</span
                >
                <input
                  v-model="form.last_name"
                  required
                  type="text"
                  class="oe-w-full oe-rounded-2xl oe-border oe-border-slate-200 oe-px-4 oe-py-3 oe-text-sm focus:oe-border-blue-500 focus:oe-outline-none"
                />
              </label>

              <label class="oe-space-y-2">
                <span class="oe-text-sm oe-font-medium oe-text-slate-700"
                  >Department</span
                >
                <input
                  v-model="form.department"
                  required
                  type="text"
                  class="oe-w-full oe-rounded-2xl oe-border oe-border-slate-200 oe-px-4 oe-py-3 oe-text-sm focus:oe-border-blue-500 focus:oe-outline-none"
                />
              </label>

              <label class="oe-space-y-2">
                <span class="oe-text-sm oe-font-medium oe-text-slate-700"
                  >Designation</span
                >
                <input
                  v-model="form.designation"
                  required
                  type="text"
                  class="oe-w-full oe-rounded-2xl oe-border oe-border-slate-200 oe-px-4 oe-py-3 oe-text-sm focus:oe-border-blue-500 focus:oe-outline-none"
                />
              </label>

              <label class="oe-space-y-2">
                <span class="oe-text-sm oe-font-medium oe-text-slate-700"
                  >Mobile Number</span
                >
                <input
                  v-model="form.mobile_number"
                  type="text"
                  class="oe-w-full oe-rounded-2xl oe-border oe-border-slate-200 oe-px-4 oe-py-3 oe-text-sm focus:oe-border-blue-500 focus:oe-outline-none"
                />
              </label>

              <label class="oe-space-y-2">
                <span class="oe-text-sm oe-font-medium oe-text-slate-700"
                  >Gender</span
                >
                <select
                  v-model="form.gender"
                  class="oe-w-full oe-rounded-2xl oe-border oe-border-slate-200 oe-px-4 oe-py-3 oe-text-sm focus:oe-border-blue-500 focus:oe-outline-none"
                >
                  <option value="">Select gender</option>
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                  <option value="OTHER">Other</option>
                </select>
              </label>

              <label class="oe-space-y-2">
                <span class="oe-text-sm oe-font-medium oe-text-slate-700"
                  >Date of Birth</span
                >
                <input
                  v-model="form.date_of_birth"
                  type="date"
                  class="oe-w-full oe-rounded-2xl oe-border oe-border-slate-200 oe-px-4 oe-py-3 oe-text-sm focus:oe-border-blue-500 focus:oe-outline-none"
                />
              </label>

              <label class="oe-space-y-2">
                <span class="oe-text-sm oe-font-medium oe-text-slate-700"
                  >Date of Joining</span
                >
                <input
                  v-model="form.date_of_joining"
                  type="date"
                  class="oe-w-full oe-rounded-2xl oe-border oe-border-slate-200 oe-px-4 oe-py-3 oe-text-sm focus:oe-border-blue-500 focus:oe-outline-none"
                />
              </label>

              <label class="oe-space-y-2">
                <span class="oe-text-sm oe-font-medium oe-text-slate-700"
                  >Reporting Time</span
                >
                <input
                  v-model="form.reporting_time"
                  type="time"
                  class="oe-w-full oe-rounded-2xl oe-border oe-border-slate-200 oe-px-4 oe-py-3 oe-text-sm focus:oe-border-blue-500 focus:oe-outline-none"
                />
              </label>

              <label class="oe-space-y-2">
                <span class="oe-text-sm oe-font-medium oe-text-slate-700"
                  >Work Location</span
                >
                <input
                  v-model="form.work_location"
                  type="text"
                  class="oe-w-full oe-rounded-2xl oe-border oe-border-slate-200 oe-px-4 oe-py-3 oe-text-sm focus:oe-border-blue-500 focus:oe-outline-none"
                />
              </label>

              <label class="oe-space-y-2">
                <span class="oe-text-sm oe-font-medium oe-text-slate-700"
                  >Employee Type</span
                >
                <input
                  v-model="form.employee_type"
                  type="text"
                  class="oe-w-full oe-rounded-2xl oe-border oe-border-slate-200 oe-px-4 oe-py-3 oe-text-sm focus:oe-border-blue-500 focus:oe-outline-none"
                />
              </label>

              <label class="oe-space-y-2">
                <span class="oe-text-sm oe-font-medium oe-text-slate-700"
                  >Reporting Manager ID</span
                >
                <input
                  v-model.number="form.reporting_manager_id"
                  min="0"
                  type="number"
                  class="oe-w-full oe-rounded-2xl oe-border oe-border-slate-200 oe-px-4 oe-py-3 oe-text-sm focus:oe-border-blue-500 focus:oe-outline-none"
                />
              </label>
            </div>

            <label class="oe-block oe-space-y-2">
              <span class="oe-text-sm oe-font-medium oe-text-slate-700"
                >Remarks</span
              >
              <textarea
                v-model="form.remarks"
                rows="4"
                class="oe-w-full oe-rounded-2xl oe-border oe-border-slate-200 oe-px-4 oe-py-3 oe-text-sm focus:oe-border-blue-500 focus:oe-outline-none"
              ></textarea>
            </label>

            <div class="oe-flex oe-flex-wrap oe-gap-3">
              <button
                :disabled="submitting"
                type="submit"
                class="oe-rounded-2xl oe-bg-blue-600 oe-px-5 oe-py-3 oe-text-sm oe-font-medium oe-text-white hover:oe-bg-blue-700 disabled:oe-cursor-not-allowed disabled:oe-opacity-60"
              >
                {{
                  submitting
                    ? "Saving..."
                    : isEditing
                      ? "Update Employee"
                      : "Create Employee"
                }}
              </button>
              <button
                @click="openCreateForm"
                type="button"
                class="oe-rounded-2xl oe-border oe-border-slate-200 oe-bg-white oe-px-5 oe-py-3 oe-text-sm oe-font-medium oe-text-slate-700 hover:oe-bg-slate-50"
              >
                Reset Form
              </button>
            </div>
          </form>
        </aside>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch, onMounted } from 'vue';
import { useEmployeesApi, type EmployeePayload } from "@/apis/employees";
import { useToastStore } from "@/stores/toast";
import FilterDrawer from "@/components/FilterDrawer.vue";

const props = defineProps<{
  title: string;
  description: string;
  endpointBase: string;
}>();

const toastStore = useToastStore();
const { listEmployees, createEmployee, updateEmployee } = useEmployeesApi();

const loading = ref(true);
const submitting = ref(false);
const searchQuery = ref("");
const employees = ref<any[]>([]);
const editingEmployeeId = ref<number | string | null>(null);

const isFilterDrawerOpen = ref(false);

// Current filters - start with clean defaults
const currentFilters = ref({
  keyword: "",
  from_date: "",
  to_date: "",
  is_paginate: true,
  page: 1,
  page_size: 10,
});

// Clean the payload before sending to API (This fixes 422)
const getCleanFilters = (filters: any) => {
  const payload: Record<string, any> = {};

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

const handleFilter = (incomingFilters: any) => {
  currentFilters.value = { ...incomingFilters };   // store raw for drawer
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
  loading.value = true;

  try {
    const cleanPayload = getCleanFilters(currentFilters.value);

    const result = await listEmployees(props.endpointBase, cleanPayload);

    if (result.ok) {
      employees.value = result.data || [];
    } else {
      toastStore.error(result.message || "Failed to load employees");
    }
  } catch (error: any) {
    console.error(error);
    toastStore.error(error.response?.data?.message || "Something went wrong");
  } finally {
    loading.value = false;
  }
};

const createInitialForm = (): EmployeePayload => ({
  employee_code: "D00" + (employees.value.length + 1).toString().padStart(3, "0"),
  first_name: "",
  last_name: "",
  email: "",
  department: "",
  designation: "",
  mobile_number: "",
  gender: "",
  date_of_birth: "",
  date_of_joining: "",
  reporting_time: "",
  work_location: "",
  employee_type: "",
  reporting_manager_id: null,
  remarks: "",
});

const form = reactive<EmployeePayload>(createInitialForm());

const isEditing = computed(() => editingEmployeeId.value !== null);

const filteredEmployees = computed(() => {
  const query = searchQuery.value.trim().toLowerCase();
  if (!query) return employees.value;

  return employees.value.filter((employee) => {
    const haystack = [
      employee.employee_code,
      employee.first_name,
      employee.last_name,
      employee.email,
      employee.department,
      employee.designation,
      employee.mobile_number,
      employee.work_location,
      employee.employee_type,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return haystack.includes(query);
  });
});

const resetForm = () => Object.assign(form, createInitialForm());

const normalizeEmployeeForForm = (employee: any): EmployeePayload => ({
  employee_code: employee.employee_code ?? "",
  first_name: employee.first_name ?? "",
  last_name: employee.last_name ?? "",
  email: employee.email ?? "",
  department: employee.department ?? "",
  designation: employee.designation ?? "",
  mobile_number: employee.mobile_number ?? "",
  gender: employee.gender ?? "",
  date_of_birth: employee.date_of_birth ? String(employee.date_of_birth).slice(0, 10) : "",
  date_of_joining: employee.date_of_joining ? String(employee.date_of_joining).slice(0, 10) : "",
  reporting_time: employee.reporting_time ? String(employee.reporting_time).slice(0, 5) : "",
  work_location: employee.work_location ?? "",
  employee_type: employee.employee_type ?? "",
  reporting_manager_id: employee.reporting_manager_id ?? null,
  remarks: employee.remarks ?? "",
});

const openCreateForm = () => {
  editingEmployeeId.value = null;
  resetForm();
};

const openEditForm = (employee: any) => {
  editingEmployeeId.value = employee.id ?? employee.user_id ?? employee.employee_id;
  Object.assign(form, normalizeEmployeeForForm(employee));
};

const handleSubmit = async () => {
  submitting.value = true;

  try {
    const payload: EmployeePayload = {
      ...form,
      reporting_manager_id:
        form.reporting_manager_id === null ||
        form.reporting_manager_id === undefined ||
        form.reporting_manager_id === ("" as any)
          ? null
          : Number(form.reporting_manager_id),
    };

    const result =
      isEditing.value && editingEmployeeId.value !== null
        ? await updateEmployee(
            props.endpointBase,
            editingEmployeeId.value,
            payload,
          )
        : await createEmployee(props.endpointBase, payload);

    if (!result.ok) {
      toastStore.error(result.message);
      return;
    }

    toastStore.success(result.message);
    await fetchEmployees();
    openCreateForm();
  } finally {
    submitting.value = false;
  }
};

const getEmployeeKey = (employee: any) => employee.id ?? employee.user_id ?? employee.employee_id ?? employee.email;

const getFullName = (employee: any) => {
  const name = `${employee.first_name ?? ""} ${employee.last_name ?? ""}`.trim();
  return name || employee.email || "Unknown employee";
};

const getInitials = (employee: any) => {
  const first = employee.first_name?.charAt(0) ?? "";
  const last = employee.last_name?.charAt(0) ?? "";
  return `${first}${last}`.trim() || employee.email?.charAt(0)?.toUpperCase() || "E";
};

const formatDate = (value: string) => {
  if (!value) return "Not set";
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? value
    : new Intl.DateTimeFormat("en-IN", { day: "2-digit", month: "short", year: "numeric" }).format(date);
};

watch(() => employees.value.length, (newLength) => {
  if (!isEditing.value) {
    form.employee_code = "D00" + (newLength + 1).toString().padStart(3, "0");
  }
});

onMounted(fetchEmployees);
</script>

