import { defineStore } from 'pinia'
import { toast, type ToastOptions } from 'vue3-toastify'

export type ToastType = 'success' | 'error' | 'warning' | 'info'

export const useToastStore = defineStore('toast', {
  state: () => ({}),
  actions: {
    addToast(message: string, type: ToastType = 'info', duration = 3000) {
      const options: ToastOptions = {
        autoClose: duration,
        type: type as any
      }
      toast(message, options)
    },
    success(message: string, duration?: number) {
      this.addToast(message, 'success', duration)
    },
    error(message: string, duration?: number) {
      this.addToast(message, 'error', duration)
    },
    warning(message: string, duration?: number) {
      this.addToast(message, 'warning', duration)
    },
    info(message: string, duration?: number) {
      this.addToast(message, 'info', duration)
    }
  }
})
