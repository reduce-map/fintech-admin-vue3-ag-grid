import { defineStore } from 'pinia'

export interface AppSettings {
  isCollapsed: boolean
}

export const useSettingsStore = defineStore('navigation', {
  state: (): AppSettings => ({
    isCollapsed: false,
  }),
  getters: {},
  actions: {
    toggleCollapsed() {
      this.isCollapsed = !this.isCollapsed
    },
    setCollapsed(value: boolean) {
      this.isCollapsed = value
    },
  },
})
