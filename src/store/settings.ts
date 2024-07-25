import { defineStore } from 'pinia'

type theme = 'dark' | 'light'

export interface AppSettings {
  isCollapsed: boolean
  theme: theme
}

export const useSettingsStore = defineStore('navigation', {
  state: (): AppSettings => ({
    isCollapsed: true,
    theme: 'dark',
  }),
  actions: {
    toggleCollapsed() {
      this.isCollapsed = !this.isCollapsed
    },
    setCollapsed(value: boolean) {
      this.isCollapsed = value
    },
    setTheme(value: theme) {
      this.theme = value
    },
  },
})
