import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: {
      email: 'john.doe@example.com',
      role: 'Admin',
      name: 'John Doe'
    }
  }),
  persist: true
})
