<template>
  <div
    class="oe-min-h-screen oe-bg-gray-50 oe-transition-colors oe-duration-300"
  >
    <div class="oe-mx-auto oe-space-y-8 oe-p-2">
      <section
        class="oe-rounded-[2rem] oe-border oe-border-slate-200 oe-bg-white oe-p-6 oe-shadow-sm"
      >
        <div
          class="oe-flex oe-flex-col oe-gap-4 lg:oe-flex-row lg:oe-items-center lg:oe-justify-between"
        >
          <div class="oe-flex-1">
            <div class="oe-relative">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search by code, name, email, department, designation"
                class="oe-w-full oe-rounded-2xl oe-border oe-border-slate-200 oe-bg-slate-50 oe-px-4 oe-py-3 oe-pl-12 oe-text-sm focus:oe-border-blue-500 focus:oe-outline-none"
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
              @click="fetchUsers"
              type="button"
              class="oe-rounded-2xl oe-border oe-border-slate-200 oe-bg-white oe-px-4 oe-py-3 oe-text-sm oe-font-medium oe-text-slate-700 hover:oe-bg-slate-50"
            >
              Refresh
            </button>
            <!-- <button
              @click="openCreateForm"
              type="button"
              class="oe-rounded-2xl oe-bg-blue-600 oe-px-5 oe-py-3 oe-text-sm oe-font-medium oe-text-white hover:oe-bg-blue-700"
            >
              Add Employee
            </button> -->
          </div>
        </div>
      </section>

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
                Users
              </h2>
              <p class="oe-mt-1 oe-text-sm oe-text-slate-500">
                Manage onboarding-ready user records from one place.
              </p>
            </div>
            <span
              class="oe-rounded-full oe-bg-slate-100 oe-px-3 oe-py-1 oe-text-xs oe-font-medium oe-text-slate-600"
            >
              {{ filteredUsers.length }} records
            </span>
          </div>

          <div
            v-if="loading"
            class="oe-flex oe-h-80 oe-items-center oe-justify-center oe-text-slate-400"
          >
            Loading users...
          </div>

          <div
            v-else-if="filteredUsers.length === 0"
            class="oe-flex oe-h-80 oe-flex-col oe-items-center oe-justify-center oe-gap-3 oe-text-center"
          >
            <div
              class="oe-flex oe-h-14 oe-w-14 oe-items-center oe-justify-center oe-rounded-2xl oe-bg-slate-100 oe-text-2xl"
            >
              👥
            </div>
            <div>
              <p class="oe-font-medium oe-text-slate-900">No users found</p>
              <p class="oe-text-sm oe-text-slate-500">
                Add a new user or change the search term.
              </p>
            </div>
          </div>

          <div v-else class="oe-divide-y oe-divide-slate-100">
            <article
              v-for="user in filteredUsers"
              :key="getUserKey(user)"
              class="oe-flex oe-flex-col oe-gap-4 oe-p-6 lg:oe-flex-row lg:oe-items-center lg:oe-justify-between"
            >
              <div class="oe-flex oe-min-w-0 oe-items-start oe-gap-4">
                <div
                  class="oe-flex oe-h-12 oe-w-12 oe-flex-shrink-0 oe-items-center oe-justify-center oe-rounded-2xl oe-bg-blue-100 oe-text-sm oe-font-semibold oe-text-blue-700"
                >
                  {{ getInitials(user) }}
                </div>

                <div class="oe-min-w-0">
                  <div class="oe-flex oe-flex-wrap oe-items-center oe-gap-2">
                    <h3 class="oe-text-lg oe-font-semibold oe-text-slate-900">
                      {{ getFullName(user) }}
                    </h3>
                  </div>

                  <div
                    class="oe-mt-2 oe-flex oe-flex-wrap oe-gap-x-4 oe-gap-y-1 oe-text-sm oe-text-slate-500"
                  >
                    <span>{{ user.email || "No email" }}</span>
                    <span>{{ user.role || "No role" }}</span>
                  </div>
                </div>
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
                {{ isEditing ? "Update user" : "Add new user" }}
              </h2>
              <p class="oe-mt-2 oe-text-sm oe-text-slate-500">
                Keep user details structured for onboarding, role mapping, and
                reporting.
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
                <span class="oe-text-sm oe-font-medium oe-text-slate-700">
                  Role
                </span>

                <select
                  v-model="form.role"
                  required
                  class="oe-w-full oe-rounded-2xl oe-border oe-border-slate-200 oe-bg-white oe-px-2 oe-py-3 oe-text-sm oe-text-slate-700 focus:oe-border-blue-500 focus:oe-outline-none"
                >
                  <option disabled value="">Select Role</option>
                  <option value="SUPER_ADMIN">Super Admin</option>
                  <option value="ADMIN">Admin</option>
                  <option value="HR">HR</option>
                  <option value="MANAGER">Manager</option>
                  <option value="NETWORK">Network Admin</option>
                  <option value="UIUX_DESIGNER">UI/UX Designer</option>
                </select>
              </label>
            </div>
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
import { useUsersApi, type UserPayload } from "@/apis/users";
import { useToastStore } from "@/stores/toast";

const props = defineProps<{
  title: string;
  description: string;
  endpointBase: string;
}>();

const toastStore = useToastStore();
const { listUsers, createUser, updateUser } = useUsersApi();

const loading = ref(true);
const submitting = ref(false);
const searchQuery = ref("");
const users = ref<any[]>([]);
const editingUserId = ref<number | string | null>(null);

const createInitialForm = (): UserPayload => ({
  first_name: "",
  last_name: "",
  email: "",
  role: "",
});

const form = reactive<UserPayload>(createInitialForm());

const isEditing = computed(() => editingUserId.value !== null);

const filteredUsers = computed(() => {
  const query = searchQuery.value.trim().toLowerCase();

  if (!query) {
    return users.value;
  }

  return users.value.filter((user) => {
    const haystack = [user.first_name, user.last_name, user.email, user.role]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return haystack.includes(query);
  });
});

const resetForm = () => {
  Object.assign(form, createInitialForm());
};

const normalizeUserForForm = (user: any): UserPayload => ({
  first_name: user.first_name ?? "",
  last_name: user.last_name ?? "",
  email: user.email ?? "",
  role: user.role ?? "",
});

const fetchUsers = async () => {
  loading.value = true;

  try {
    const result = await listUsers(props.endpointBase);
    if (result.ok) {
      users.value = result.data;
      return;
    }

    toastStore.error(result.message);
  } finally {
    loading.value = false;
  }
};

const openCreateForm = () => {
  editingUserId.value = null;
  resetForm();
};

const openEditForm = (user: any) => {
  editingUserId.value = user.id ?? user.user_id ?? user.employee_id;
  Object.assign(form, normalizeUserForForm(user));
};

const handleSubmit = async () => {
  submitting.value = true;

  try {
    const payload: UserPayload = {
      ...form,
    };

    const result =
      isEditing.value && editingUserId.value !== null
        ? await updateUser(props.endpointBase, editingUserId.value, payload)
        : await createUser(props.endpointBase, payload);

    if (!result.ok) {
      toastStore.error(result.message);
      return;
    }

    toastStore.success(result.message);
    await fetchUsers();
    openCreateForm();
  } finally {
    submitting.value = false;
  }
};

const getUserKey = (user: any) =>
  user.id ?? user.user_id ?? user.employee_id ?? user.email;

const getFullName = (user: any) => {
  const name = `${user.first_name ?? ""} ${user.last_name ?? ""}`.trim();
  return name || user.email || "Unknown user";
};

const getInitials = (user: any) => {
  const first = user.first_name?.charAt(0) ?? "";
  const last = user.last_name?.charAt(0) ?? "";
  return (
    `${first}${last}`.trim() || user.email?.charAt(0)?.toUpperCase() || "E"
  );
};

const formatDate = (value: string) => {
  if (!value) {
    return "Not set";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
};

onMounted(fetchUsers);
</script>
