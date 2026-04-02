import { defineStore } from 'pinia'
import { useApi } from '@/composables/useApi'
import { useToastStore } from '@/stores/toast'

function normalizeUserPayload(payload: any) {
  if (!payload) {
    return null
  }

  if (payload.data && typeof payload.data === 'object') {
    return payload.data
  }

  if (payload.email && payload.role) {
    return payload
  }

  return null
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as any,
    token: null as string | null,
    isInitialized: false
  }),
  actions: {
    clearAuth() {
      this.user = null
      this.token = null
    },

    setAuth(token: string, user: any) {
      this.token = token
      this.user = user
    },

    async initialize() {
      if (this.isInitialized) {
        return
      }

      const authCookie = useCookie<string | null>('auth_token')
      const userCookie = useCookie<any | null>('auth_user')

      if (authCookie.value) {
        this.token = authCookie.value
        this.user = userCookie.value

        if (!this.user) {
          const { call } = useApi()
          const hasUser = await this.fetchUser(call)

          if (!hasUser) {
            this.clearAuth()
            authCookie.value = null
            userCookie.value = null
          }
        }
      }

      this.isInitialized = true
    },

    async fetchUser(call: any) {
      try {
        const response = await call('/auth/me', { method: 'GET' })
        const user = normalizeUserPayload(response)

        if (user) {
          this.user = user
          const userCookie = useCookie<any | null>('auth_user')
          userCookie.value = user
          return true
        }
        return false
      } catch (error) {
        console.error('Failed to fetch user:', error)
        return false
      }
    },

    async logout() {
      const { call } = useApi()
      const toastStore = useToastStore()
      const authCookie = useCookie<string | null>('auth_token')
      const userCookie = useCookie<any | null>('auth_user')

      try {
        await call('/auth/logout', { method: 'POST' })
        this.clearAuth()
        authCookie.value = null
        userCookie.value = null
        this.isInitialized = true
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
        const response: any = await call('/auth/login', {
          method: 'POST',
          body: credentials,
          skipAuth: true
        })
        const user = normalizeUserPayload(response)

        if (response && response.access_token && user) {
          const authCookie = useCookie<string | null>('auth_token')
          const userCookie = useCookie<any | null>('auth_user')
          this.token = response.access_token
          this.user = user
          authCookie.value = response.access_token
          userCookie.value = this.user
          this.isInitialized = true
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
        const response = await call('/auth/register', {
          method: 'POST',
          body: userData,
          skipAuth: true
        })
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
        const response = await call('/auth/forgot-password', {
          method: 'POST',
          body: { email },
          skipAuth: true
        })
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
        const response = await call('/auth/reset-password', {
          method: 'POST',
          body: data,
          skipAuth: true
        })
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
