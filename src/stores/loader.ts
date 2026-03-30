import { defineStore } from 'pinia'

export const useLoaderStore = defineStore('loader', {
  state: () => ({
    isLoading: false,
    message: ''
  }),
  actions: {
    show(message = 'Loading...') {
      this.isLoading = true
      this.message = message
    },
    hide() {
      this.isLoading = false
      this.message = ''
    }
  }
})
