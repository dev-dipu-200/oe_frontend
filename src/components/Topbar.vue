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
            {{ authStore.user?.role || "Guest" }}
          </div>
        </div>

        <!-- Notification -->
        <div class="oe-relative">
          <button 
            @click="showNotifications = !showNotifications"
            class="oe-p-2 oe-text-gray-600 oe-rounded-full hover:oe-bg-gray-100 oe-transition-colors"
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
              <span v-if="notificationsStore.unreadCount > 0" class="oe-absolute oe-top-0 oe-right-0 oe-flex oe-h-2 oe-w-2">
                <span
                  class="oe-animate-ping oe-absolute oe-inline-flex oe-h-full oe-w-full oe-rounded-full oe-bg-red-400 oe-opacity-75"
                ></span>
                <span
                  class="oe-relative oe-inline-flex oe-rounded-full oe-h-2 oe-w-2 oe-bg-red-500"
                ></span>
              </span>
            </div>
          </button>

          <!-- Notifications Dropdown -->
          <div 
            v-if="showNotifications"
            class="oe-absolute oe-right-0 oe-mt-2 oe-w-80 oe-bg-white oe-rounded-2xl oe-shadow-xl oe-border oe-border-gray-100 oe-overflow-hidden oe-z-50"
          >
            <div class="oe-p-4 oe-border-b oe-flex oe-justify-between oe-items-center">
              <h3 class="oe-font-semibold oe-text-gray-900">Notifications</h3>
              <button 
                @click="notificationsStore.markAllAsRead"
                class="oe-text-xs oe-text-blue-600 hover:oe-text-blue-700 oe-font-medium"
              >
                Mark all as read
              </button>
            </div>
            
            <div class="oe-max-h-96 oe-overflow-y-auto">
              <div v-if="notificationsStore.notifications.length === 0" class="oe-p-8 oe-text-center oe-text-gray-500 oe-text-sm">
                No notifications yet
              </div>
              <div 
                v-for="notification in notificationsStore.notifications" 
                :key="notification.id"
                @click="handleNotificationClick(notification)"
                class="oe-p-4 oe-border-b oe-border-gray-50 hover:oe-bg-gray-50 oe-cursor-pointer oe-transition-colors"
                :class="{'oe-bg-blue-50/30': !notification.is_read}"
              >
                <div class="oe-flex oe-gap-3">
                  <div class="oe-flex-shrink-0 oe-mt-1">
                    <span v-if="notification.notification_type === 'task_update'" class="oe-text-blue-500">📝</span>
                    <span v-else class="oe-text-gray-500">🔔</span>
                  </div>
                  <div>
                    <p class="oe-text-sm oe-font-semibold oe-text-gray-900">{{ notification.title }}</p>
                    <p class="oe-text-xs oe-text-gray-600 oe-mt-0.5">{{ notification.message }}</p>
                    <p class="oe-text-[10px] oe-text-gray-400 oe-mt-1">{{ formatDate(notification.created_at) }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

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
import { ref, computed, onMounted } from "vue";
import { useAuthStore } from "~/stores/auth";
import { useNotificationsStore } from "~/stores/notifications";
import { useWebsocket } from "~/composables/useWebsocket";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const notificationsStore = useNotificationsStore();
const router = useRouter();
const { connect } = useWebsocket();

const showNotifications = ref(false);

const userInitial = computed(() =>
  (authStore.user?.name || authStore.user?.email || "U")
    .charAt(0)
    .toUpperCase(),
);

defineEmits(["toggleSidebar"]);

const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-IN", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

const handleNotificationClick = async (notification) => {
  if (!notification.is_read) {
    await notificationsStore.markAsRead(notification.id);
  }
  
  if (notification.link) {
    router.push(notification.link);
    showNotifications.value = false;
  }
};

const handleLogout = async () => {
  await authStore.logout();
  router.push("/login");
};

onMounted(() => {
  if (authStore.user) {
    notificationsStore.fetchNotifications();
    connect();
  }
});
</script>
