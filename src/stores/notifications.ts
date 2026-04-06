import { defineStore } from 'pinia'
import { useApi } from '@/composables/useApi'
import { useToastStore } from '@/stores/toast'

export interface Notification {
  id: number;
  title: string;
  message: string;
  is_read: boolean;
  notification_type: string;
  link?: string;
  created_at: string;
}

export const useNotificationsStore = defineStore('notifications', {
  state: () => ({
    notifications: [] as Notification[],
    unreadCount: 0,
    loading: false
  }),
  actions: {
    async fetchNotifications() {
      const { call } = useApi()
      this.loading = true
      try {
        const response: any = await call('/notifications', { method: 'GET' })
        if (response && response.ok) {
            const data = response.data;
            this.notifications = data.notifications || []
            this.unreadCount = data.unread_count || 0
        } else if (response && !response.ok && response.data) {
            // Handle cases where response is returned but ok is false
             this.notifications = response.data.notifications || []
             this.unreadCount = response.data.unread_count || 0
        }
      } catch (error) {
        console.error('Failed to fetch notifications:', error)
      } finally {
        this.loading = false
      }
    },

    addNotification(notification: Notification) {
      // Check if notification already exists to avoid duplicates from WS/Polling
      if (!this.notifications.some(n => n.id === notification.id)) {
        this.notifications = [notification, ...this.notifications]
        if (!notification.is_read) {
          this.unreadCount++
        }
      }
    },

    async markAsRead(notificationId: number) {
      const { call } = useApi()
      try {
        const response = await call(`/notifications/${notificationId}/mark-as-read`, { method: 'PATCH' })
        if (response) {
          const notification = this.notifications.find(n => n.id === notificationId)
          if (notification && !notification.is_read) {
            notification.is_read = true
            this.unreadCount = Math.max(0, this.unreadCount - 1)
          }
        }
      } catch (error) {
        console.error('Failed to mark notification as read:', error)
      }
    },

    async markAllAsRead() {
      const { call } = useApi()
      try {
        const response = await call('/notifications/mark-as-read', { method: 'PATCH' })
        if (response) {
          this.notifications = this.notifications.map(n => ({ ...n, is_read: true }))
          this.unreadCount = 0
        }
      } catch (error) {
        console.error('Failed to mark all notifications as read:', error)
      }
    }
  }
})
