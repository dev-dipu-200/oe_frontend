import { defineStore } from 'pinia'
import { useApi } from '@/composables/useApi'
import { useToastStore } from '@/stores/toast'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as any,
    token: null as string | null
  }),
  persist: true,
  actions: {
    async logout() {
      const { call } = useApi()
      const toastStore = useToastStore()

      try {
        await call('/auth/logout', { method: 'POST' })
        this.user = null
        this.token = null
        toastStore.addToast({
          message: 'Logged out successfully!',
          type: 'success',
        })
      } catch (error) {
        console.error('Logout failed:', error)
      }
    },

    async login(credentials: { email: string; password: string }) {
      const { call } = useApi()
      const toastStore = useToastStore()

      try {
        const response: any = await call('/auth/login', { method: 'POST', body: credentials })
        if (response && response.access_token) {
          this.token = response.access_token
          this.user = response.data
          toastStore.addToast({
            message: 'Logged in successfully!',
            type: 'success',
          })
          return true
        }
        return false
      } catch (error: any) {
        console.error('Login failed:', error)
        return false
      }
    },

    async register(userData: { first_name: string; last_name: string; email: string; password: string; role: string }) {
      const { call } = useApi()
      const toastStore = useToastStore()

      try {
        const response = await call('/auth/register', { method: 'POST', body: userData })
        if (response) {
          toastStore.addToast({
            message: 'Registration successful!',
            type: 'success',
          })
          return true
        }
        return false
      } catch (error: any) {
        console.error('Registration failed:', error)
        return false
      }
    },

    async forgotPassword(email: string) {
      const { call } = useApi()
      const toastStore = useToastStore()

      try {
        const response = await call('/auth/forgot-password', { method: 'POST', body: { email } })
        if (response) {
          toastStore.addToast({
            message: 'Password reset link sent to your email.',
            type: 'success',
          })
          return true
        }
        return false
      } catch (error: any) {
        console.error('Forgot password failed:', error)
        return false
      }
    },

    async resetPassword(data: any) {
      const { call } = useApi()
      const toastStore = useToastStore()

      try {
        const response = await call('/auth/reset-password', { method: 'POST', body: data })
        if (response) {
          toastStore.addToast({
            message: 'Password reset successful!',
            type: 'success',
          })
          return true
        }
        return false
      } catch (error: any) {
        console.error('Reset password failed:', error)
        return false
      }
    }
  }
})
