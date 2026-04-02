<template>
  <div class="oe-h-16">
    <nav
      class="oe-bg-white oe-border-b oe-h-16 oe-flex oe-items-center oe-px-6 oe-fixed oe-top-0 oe-right-0 oe-left-0 lg:oe-left-72 oe-z-30 oe-transition-colors oe-duration-300"
    >
      <button
        @click="$emit('toggleSidebar')"
        class="lg:oe-hidden oe-p-2 oe-mr-4 oe-text-gray-600 hover:oe-bg-gray-100 oe-rounded-md"
      >
        <svg
          class="oe-w-6 oe-h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      <div class="oe-flex-1 oe-flex oe-items-center oe-gap-4">
        <!-- Back Button -->
        <button
          v-if="showBackButton"
          @click="goBack"
          class="oe-p-2 oe-text-gray-600 hover:oe-bg-gray-100 oe-rounded-md"
          title="Go back"
        >
          <svg
            class="oe-w-5 oe-h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
        </button>
        
        <h2 class="oe-text-xl oe-font-semibold oe-text-gray-800">Dashboard</h2>
      </div>

      <div class="oe-flex oe-items-center oe-gap-4">
        <div
          class="oe-flex oe-items-center oe-gap-2 oe-bg-white oe-px-4 oe-py-2 oe-rounded-xl oe-border oe-border-gray-200 oe-transition-colors"
        >
          <span class="oe-text-sm oe-font-medium">Viewing as:</span>
          <div
            class="oe-bg-blue-600 oe-text-white oe-px-3 oe-py-1 oe-rounded-lg oe-text-sm"
          >
            HR
          </div>
        </div>

        <!-- Notification -->
        <button
          class="oe-p-2 oe-text-gray-600 oe-rounded-full"
        >
          <div class="oe-relative">
            <svg
              class="oe-w-6 oe-h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 00-5-5.917V5a2 2 0 10-4 0v.083A6 6 0 006 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <span class="oe-absolute oe-top-0 oe-right-0 oe-flex oe-h-2 oe-w-2">
              <span class="oe-animate-ping oe-absolute oe-inline-flex oe-h-full oe-w-full oe-rounded-full oe-bg-red-400 oe-opacity-75"></span>
              <span class="oe-relative oe-inline-flex oe-rounded-full oe-h-2 oe-w-2 oe-bg-red-500"></span>
            </span>
          </div>
        </button>

        <!-- Logout Button -->
        <button
          @click="handleLogout"
          class="oe-p-2 oe-text-gray-600 hover:oe-text-red-500 oe-rounded-full oe-transition-colors"
          title="Logout"
        >
          <svg
            class="oe-w-6 oe-h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            ></path>
          </svg>
        </button>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { computed, ref, watch, onMounted, onUnmounted } from "vue";
import { useAuthStore } from "~/stores/auth";
import { useRouter, useRoute } from 'vue-router'; // Import useRouter for redirection

const authStore = useAuthStore();
const router = useRouter(); // Initialize useRouter
const route = useRoute();
const userInitial = computed(() => (authStore.user?.name || authStore.user?.email || 'U').charAt(0).toUpperCase());

defineEmits(["toggleSidebar"]);

// Back button logic
const showBackButton = ref(false);
const historyLength = ref(0);

const updateBackButton = () => {
  // Show back button if we're not on the main dashboard for the user's role
  const currentPath = route.path;
  const userRole = authStore.user?.role;
  
  // Define main dashboard paths for each role
  const mainDashboards = {
    'SUPER_ADMIN': '/super-admin/dashboard',
    'ADMIN': '/admin/dashboard',
    'HR': '/hr/dashboard',
    'MANAGER': '/manager/dashboard',
    'NETWORK': '/network/dashboard',
    'UIUX_DESIGNER': '/uiux/dashboard',
    'EMPLOYEE': '/employee/dashboard'
  };
  
  const mainDashboard = mainDashboards[userRole] || '/';
  showBackButton.value = currentPath !== mainDashboard && currentPath !== '/';
};

const goBack = () => {
  if (window.history.length > 1) {
    router.back();
  } else {
    // If no history, go to main dashboard
    const userRole = authStore.user?.role;
    const mainDashboards = {
      'SUPER_ADMIN': '/super-admin/dashboard',
      'ADMIN': '/admin/dashboard',
      'HR': '/hr/dashboard',
      'MANAGER': '/manager/dashboard',
      'NETWORK': '/network/dashboard',
      'UIUX_DESIGNER': '/uiux/dashboard',
      'EMPLOYEE': '/employee/dashboard'
    };
    const mainDashboard = mainDashboards[userRole] || '/';
    router.push(mainDashboard);
  }
};

// Prevent browser back button and reload
const preventBackButton = (event) => {
  // Store the current scroll position
  sessionStorage.setItem('scrollPos', window.scrollY.toString());
  
  // Show confirmation dialog on page reload/close
  if (event.type === 'beforeunload') {
    event.preventDefault();
    event.returnValue = '';
    return '';
  }
};

// Store the popstate handler reference for cleanup
let popstateHandler = null;

const handleLogout = async () => {
  await authStore.logout();
  router.push('/login'); // Redirect to login page after logout
};

// Watch route changes to update back button visibility
watch(() => route.path, () => {
  updateBackButton();
});

onMounted(() => {
  updateBackButton();
  
  // Add event listeners to prevent browser navigation
  window.addEventListener('beforeunload', preventBackButton);
  
  // Create popstate handler
  popstateHandler = (event) => {
    // Prevent browser back button
    event.preventDefault();
    // Use our custom back button logic instead
    goBack();
  };
  
  window.addEventListener('popstate', popstateHandler);
});

onUnmounted(() => {
  window.removeEventListener('beforeunload', preventBackButton);
  if (popstateHandler) {
    window.removeEventListener('popstate', popstateHandler);
  }
});
</script>
