import { ref, watch } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useToastStore } from '@/stores/toast';
import { useNotificationsStore } from '@/stores/notifications';

export function useWebsocket() {
  const authStore = useAuthStore();
  const toastStore = useToastStore();
  const notificationsStore = useNotificationsStore();
  const config = useRuntimeConfig();
  
  const socket = ref<WebSocket | null>(null);
  const isConnected = ref(false);
  const reconnectTimeout = ref<ReturnType<typeof setTimeout> | null>(null);

  // Type for callbacks
  type MessageCallback = (data: any) => void;
  const callbacks = new Set<MessageCallback>();

  const onMessageReceived = (callback: MessageCallback) => {
    callbacks.add(callback);
    return () => callbacks.delete(callback);
  };

  const connect = () => {
    if (socket.value || !authStore.user?.id) return;

    const baseUrl = config.public.apiBaseUrl as string;
    const wsBaseUrl = baseUrl.replace(/^http/, 'ws');
    const wsUrl = `${wsBaseUrl}/notifications/ws/${authStore.user.id}`;

    console.log(`Connecting to WebSocket: ${wsUrl}`);
    
    socket.value = new WebSocket(wsUrl);

    socket.value.onopen = () => {
      console.log("WebSocket connected");
      isConnected.value = true;
      if (reconnectTimeout.value) {
        clearTimeout(reconnectTimeout.value);
        reconnectTimeout.value = null;
      }
    };

    socket.value.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        console.log("Received WebSocket message:", message);
        callbacks.forEach(cb => cb(message));
        if (message.type === "notification") {
          toastStore.success(message.data.message || message.data.title);
          notificationsStore.addNotification(message.data);
        }
      } catch (e) {
        console.error("Error parsing WebSocket message:", e);
      }
    };

    socket.value.onclose = () => {
      console.log("WebSocket disconnected. Reconnecting...");
      isConnected.value = false;
      socket.value = null;
      reconnectTimeout.value = setTimeout(() => {
        connect();
      }, 3000);
    };

    socket.value.onerror = (error) => {
      console.error("WebSocket error:", error);
      socket.value?.close();
    };
  };

  const disconnect = () => {
    if (reconnectTimeout.value) {
      clearTimeout(reconnectTimeout.value);
      reconnectTimeout.value = null;
    }
    if (socket.value) {
      socket.value.close();
      socket.value = null;
    }
    isConnected.value = false;
  };

  watch(() => authStore.user?.id, (newId) => {
    if (newId) {
      connect();
    } else {
      disconnect();
    }
  }, { immediate: true });

  return {
    isConnected,
    connect,
    disconnect,
    onMessageReceived
  };
}
