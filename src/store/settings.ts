import { defineStore } from 'pinia'

export interface AppSettings {
  isCollapsed: boolean
  theme: 'dark' | 'light'
  // language: "en" | "ua"
}

export const useSettingsStore = defineStore('navigation', {
  state: (): AppSettings => ({
    isCollapsed: false,
    theme: 'dark',
    // language: "en"
  }),
  getters: {},
  actions: {
    toggleCollapsed() {
      this.isCollapsed = !this.isCollapsed
    },
    setCollapsed(value: boolean) {
      this.isCollapsed = value
    },
    toggleTheme() {
      this.theme = this.theme === 'dark' ? 'light' : 'dark'
    },
    setTheme(value: 'dark' | 'light') {
      this.theme = value
    },
  },
})
