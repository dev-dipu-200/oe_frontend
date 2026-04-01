import { defineStore } from 'pinia'
import { useApi } from '@/composables/useApi'
import { useToastStore } from '@/stores/toast'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: {
      email: 'john.doe@example.com',
      role: 'Admin',
      name: 'John Doe'
    }
  }),
  persist: true,
  actions: {
    async logout() {
      const { call } = useApi()
      const toastStore = useToastStore()

      try {
        await call('/auth/logout', { method: 'POST' })
        this.user = null // Clear user state
        toastStore.addToast({
          message: 'Logged out successfully!',
          type: 'success',
        })
        // In a real application, you might also redirect here
        // e.g., navigateTo('/login')
      } catch (error) {
        console.error('Logout failed:', error)
        // useApi already handles toast for errors, but you can add more specific logic here if needed
        // toastStore.addToast({
        //   message: 'Failed to log out.',
        //   type: 'error',
        // })
      }
    },

    async login(credentials: { email: string; password: string }) {
      const { call } = useApi()
      const toastStore = useToastStore()

      try {
        const response = await call('/auth/login', { method: 'POST', body: credentials })
        if (response && response.user) {
          this.user = response.user // Assuming API returns user data
          toastStore.addToast({
            message: 'Logged in successfully!',
            type: 'success',
          })
          return true
        }
        return false
      } catch (error: any) {
        console.error('Login failed:', error)
        // toastStore already handles generic error messages from useApi
        return false
      }
    },

    async register(userData: { name: string; email: string; password: string; confirm_password: string }) {
      const { call } = useApi()
      const toastStore = useToastStore()

      try {
        const response = await call('/auth/register', { method: 'POST', body: userData })
        if (response && response.user) {
          // Optionally log in the user directly after registration, or redirect to login
          this.user = response.user // Assuming API returns user data
          toastStore.addToast({
            message: 'Registration successful! You are now logged in.',
            type: 'success',
          })
          return true
        }
        return false
      } catch (error: any) {
        console.error('Registration failed:', error)
        // toastStore already handles generic error messages from useApi
        return false
      }
    }
  }
})
