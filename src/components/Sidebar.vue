<template>
  <div class="lg:oe-h-screen lg:oe-sticky lg:oe-top-0">
    <!-- Mobile Overlay -->
    <div
      v-if="isOpen"
      @click="$emit('close')"
      class="oe-fixed oe-inset-0 oe-bg-black/50 oe-z-40 lg:oe-hidden"
    ></div>

    <!-- Sidebar Content -->
    <aside
      class="oe-fixed oe-inset-y-0 oe-left-0 oe-w-64 oe-bg-gray-800 oe-text-white oe-transform oe-transition-transform oe-duration-300 oe-ease-in-out oe-z-50 lg:oe-static lg:oe-translate-x-0 oe-flex oe-flex-col oe-h-full lg:oe-h-[calc(100vh-0rem)] lg:oe-shadow-xl lg:oe-w-72"
      :class="isOpen ? 'oe-translate-x-0' : '-oe-translate-x-full'"
    >
      <!-- Header -->
      <div class="oe-p-6 oe-border-b oe-border-gray-700">
        <h1
          class="oe-text-xl oe-font-bold oe-text-white oe-tracking-tight oe-flex oe-items-center"
        >
          <div
            class="oe-w-8 oe-h-8 oe-bg-blue-600 oe-rounded-lg oe-mr-3 oe-flex oe-items-center oe-justify-center"
          >
            <span class="oe-text-sm">HR</span>
          </div>
          WorkflowHR
        </h1>
      </div>

      <!-- Navigation -->
      <nav class="oe-flex-1 oe-px-3 oe-py-4 oe-space-y-1">
        <template v-for="link in filteredLinks" :key="link.to">
          <NuxtLink
            :to="link.to"
            class="oe-flex oe-items-center oe-px-3 oe-py-2.5 oe-rounded-xl hover:oe-bg-gray-700 oe-transition-colors"
            active-class="oe-bg-blue-600 hover:oe-bg-blue-600"
          >
            <component :is="link.icon" class="oe-w-5 oe-h-5 oe-mr-3" />
            <span class="oe-text-sm oe-font-medium">{{ link.label }}</span>
          </NuxtLink>
        </template>
      </nav>

      <!-- User Profile (Bottom) -->
      <div
        class="oe-p-4 oe-mt-auto oe-border-t oe-border-gray-700 oe-bg-gray-900/40 lg:oe-rounded-b-2xl"
      >
        <div class="oe-flex oe-flex-col oe-gap-1" v-if="authStore.user">
          <div class="oe-flex oe-items-center oe-gap-3 oe-mt-1">
            <div
              class="oe-w-8 oe-h-8 oe-rounded-full oe-bg-blue-500 oe-flex oe-items-center oe-justify-center oe-text-xs oe-font-bold"
            >
              {{
                (authStore.user.name || authStore.user.email || "U")
                  ?.charAt(0)
                  ?.toUpperCase()
              }}
            </div>
            <div class="oe-overflow-hidden">
              <p class="oe-text-lg oe-font-semibold oe-text-white oe-truncate">
                {{ authStore.user.role }}
              </p>
              <p class="oe-text-[15px] oe-text-gray-400 oe-truncate">
                {{ authStore?.user?.email }}
              </p>
            </div>
            <Icon
              @click="handleLogout"
              icon="lucide:log-out"
              class="oe-w-5 oe-h-5 oe-text-xl oe-text-gray-400 hover:oe-text-red-600 oe-transition-colors oe-mt-1"
            />
          </div>
        </div>
      </div>
    </aside>
  </div>
</template>

<script setup>
import { computed, h } from "vue";
import { useAuthStore } from "~/stores/auth";
import { useRouter } from "vue-router";
import { Icon } from "@iconify/vue";

// Simple icon components using SVG
const HomeIcon = () =>
  h(
    "svg",
    {
      class: "oe-w-5 oe-h-5",
      fill: "none",
      stroke: "currentColor",
      viewBox: "0 0 24 24",
    },
    [
      h("path", {
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        "stroke-width": "2",
        d: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
      }),
    ],
  );
const UsersIcon = () =>
  h(
    "svg",
    {
      class: "oe-w-5 oe-h-5",
      fill: "none",
      stroke: "currentColor",
      viewBox: "0 0 24 24",
    },
    [
      h("path", {
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        "stroke-width": "2",
        d: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z",
      }),
    ],
  );
const ClipboardIcon = () =>
  h(
    "svg",
    {
      class: "oe-w-5 oe-h-5",
      fill: "none",
      stroke: "currentColor",
      viewBox: "0 0 24 24",
    },
    [
      h("path", {
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        "stroke-width": "2",
        d: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
      }),
    ],
  );
const BriefcaseIcon = () =>
  h(
    "svg",
    {
      class: "oe-w-5 oe-h-5",
      fill: "none",
      stroke: "currentColor",
      viewBox: "0 0 24 24",
    },
    [
      h("path", {
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        "stroke-width": "2",
        d: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
      }),
    ],
  );

const authStore = useAuthStore();
const router = useRouter();

defineProps({
  isOpen: Boolean,
});
defineEmits(["close"]);

const allLinks = [
  {
    to: "/super-admin/dashboard",
    label: "Dashboard",
    icon: HomeIcon,
    roles: ["SUPER_ADMIN"],
  },
  {
    to: "/admin/dashboard",
    label: "Dashboard",
    icon: HomeIcon,
    roles: ["ADMIN"],
  },
  { to: "/hr/dashboard", label: "Dashboard", icon: HomeIcon, roles: ["HR"] },
  {
    to: "/network/dashboard",
    label: "Dashboard",
    icon: HomeIcon,
    roles: ["NETWORK"],
  },
  {
    to: "/employee/dashboard",
    label: "Dashboard",
    icon: HomeIcon,
    roles: ["EMPLOYEE"],
  },

  // Super Admin specific
  {
    to: "/super-admin/users",
    label: "Users",
    icon: UsersIcon,
    roles: ["SUPER_ADMIN"],
  },
  {
    to: "/super-admin/employees",
    label: "Employees",
    icon: BriefcaseIcon,
    roles: ["SUPER_ADMIN"],
  },

  // HR specific
  {
    to: "/hr/employees",
    label: "Employees",
    icon: BriefcaseIcon,
    roles: ["HR"],
  },

  // UIUX Specific
  {
    to: "/uiux/dashboard",
    label: "Dashboard",
    icon: HomeIcon,
    roles: ["UIUX_DESIGNER"],
  },

  {
    to: "/tasks",
    label: "Tasks",
    icon: ClipboardIcon,
    roles: ["HR", "UIUX_DESIGNER", "NETWORK", "ADMIN", "SUPER_ADMIN", "MANAGER"],
  },
  {
    to: "/onboarding",
    label: "Onboarding",
    icon: ClipboardIcon,
    roles: ["HR", "SUPER_ADMIN", "UIUX_DESIGNER", "NETWORK", "ADMIN", "MANAGER"],
  },
  {
    to: "/exit",
    label: "Exit",
    icon: ClipboardIcon,
    roles: ["HR", "SUPER_ADMIN", "UIUX_DESIGNER", "NETWORK", "ADMIN", "MANAGER"],
  },

  // Employee specific
];

const filteredLinks = computed(() => {
  const role = authStore.user?.role;
  return allLinks.filter((link) => link.roles.includes(role));
});

const handleLogout = async () => {
  await authStore.logout();
  router.push("/login");
};
</script>
