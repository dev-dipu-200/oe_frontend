import { defineStore } from 'pinia'
import { useApi } from '@/composables/useApi'
import { useToastStore } from '@/stores/toast'

function unwrapApiData(payload: any) {
  if (!payload || typeof payload !== 'object') {
    return null
  }

  if ('data' in payload) {
    return payload.data
  }

  return payload
}

function getApiMessage(payload: any, fallback: string) {
  if (payload?.message && typeof payload.message === 'string') {
    return payload.message
  }

  if (payload?.data?.message && typeof payload.data.message === 'string') {
    return payload.data.message
  }

  return fallback
}

function normalizeUserPayload(payload: any) {
  const data = unwrapApiData(payload)

  if (!data) {
    return null
  }

  if (data.user && typeof data.user === 'object') {
    return data.user
  }

  if (data.email && data.role) {
    return data
  }

  return null
}

function normalizeAccessToken(payload: any) {
  const data = unwrapApiData(payload)

  if (data?.access_token && typeof data.access_token === 'string') {
    return data.access_token
  }

  if (payload?.access_token && typeof payload.access_token === 'string') {
    return payload.access_token
  }

  return null
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as any,
    token: null as string | null,
    isInitialized: false,
    lastError: null as string | null
  }),
  actions: {
    clearAuth() {
      this.user = null
      this.token = null
      this.lastError = null
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
      let errorMessage = 'Logout failed'

      try {
        const response = await call('/auth/logout', {
          method: 'POST',
          onError: (error) => {
            errorMessage = getApiMessage(error?.data, errorMessage)
          }
        })

        if (!response) {
          toastStore.error(errorMessage)
          this.clearAuth()
          authCookie.value = null
          userCookie.value = null
          this.isInitialized = true
          toastStore.success(getApiMessage(response, 'Logged out successfully'))
          return false
        }

        this.clearAuth()
        authCookie.value = null
        userCookie.value = null
        this.isInitialized = true
        toastStore.success(getApiMessage(response, 'Logged out successfully'))
        return true
      } catch (error) {
        console.error('Logout failed:', error)
        toastStore.error(errorMessage)
        return false
      }
    },

    async login(credentials: { email: string; password: string }) {
      const { call } = useApi()
      const toastStore = useToastStore()
      let errorMessage = 'Login failed'

      try {
        const response: any = await call('/auth/login', {
          method: 'POST',
          body: credentials,
          skipAuth: true,
          onError: (error) => {
            errorMessage = getApiMessage(error?.data, errorMessage)
          }
        })
        const user = normalizeUserPayload(response)
        const accessToken = normalizeAccessToken(response)

        if (response && accessToken && user) {
          const authCookie = useCookie<string | null>('auth_token')
          const userCookie = useCookie<any | null>('auth_user')
          this.lastError = null
          this.token = accessToken
          this.user = user
          authCookie.value = accessToken
          userCookie.value = this.user
          this.isInitialized = true
          toastStore.success(getApiMessage(response, 'Login successful'))
          return true
        }

        this.lastError = errorMessage
        toastStore.error(errorMessage)
        return false
      } catch (error: any) {
        console.error('Login failed:', error)
        this.lastError = errorMessage
        toastStore.error(errorMessage)
        return false
      }
    },

    async register(userData: { first_name: string; last_name: string; email: string; password: string; role: string }) {
      const { call } = useApi()
      const toastStore = useToastStore()
      let errorMessage = 'Registration failed'

      try {
        const response = await call('/auth/register', {
          method: 'POST',
          body: userData,
          skipAuth: true,
          onError: (error) => {
            errorMessage = getApiMessage(error?.data, errorMessage)
          }
        })
        if (response) {
          toastStore.success(getApiMessage(response, 'Registration successful'))
          return true
        }
        toastStore.error(errorMessage)
        return false
      } catch (error: any) {
        console.error('Registration failed:', error)
        toastStore.error(errorMessage)
        return false
      }
    },

    async forgotPassword(email: string) {
      const { call } = useApi()
      const toastStore = useToastStore()
      let errorMessage = 'Forgot password failed'

      try {
        const response = await call('/auth/forgot-password', {
          method: 'POST',
          body: { email },
          skipAuth: true,
          onError: (error) => {
            errorMessage = getApiMessage(error?.data, errorMessage)
          }
        })
        if (response) {
          toastStore.success(getApiMessage(response, 'Password reset link sent to your email.'))
          return true
        }
        toastStore.error(errorMessage)
        return false
      } catch (error: any) {
        console.error('Forgot password failed:', error)
        toastStore.error(errorMessage)
        return false
      }
    },

    async resetPassword(data: any) {
      const { call } = useApi()
      const toastStore = useToastStore()
      let errorMessage = 'Reset password failed'

      try {
        const response = await call('/auth/reset-password', {
          method: 'POST',
          body: data,
          skipAuth: true,
          onError: (error) => {
            errorMessage = getApiMessage(error?.data, errorMessage)
          }
        })
        if (response) {
          toastStore.success(getApiMessage(response, 'Password reset successful'))
          return true
        }
        toastStore.error(errorMessage)
        return false
      } catch (error: any) {
        console.error('Reset password failed:', error)
        toastStore.error(errorMessage)
        return false
      }
    }
  }
})
