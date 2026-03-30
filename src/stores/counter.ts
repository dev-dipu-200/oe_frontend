import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
    name: 'Pinia User'
  }),
  actions: {
    increment() {
      this.count++
    },
    reset() {
      this.count = 0
    }
  },
  persist: true
})