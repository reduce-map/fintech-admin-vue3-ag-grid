<script setup lang="ts">
import { computed } from 'vue'
import { useSettingsStore } from '@/store/settings'

const settingsStore = useSettingsStore()

const currentTheme = computed({
  get: () => settingsStore.theme,
  set: (value: 'dark' | 'light') => {
    settingsStore.setTheme(value)
  },
})

// const changeTheme = () => {
//   settingsStore.toggleTheme();
// };
</script>

<template>
  <i-switch v-model="currentTheme" size="large" true-value="dark" false-value="light">
    <template #open>
      <span>{{ $t('dark') }}</span>
    </template>
    <template #close>
      <span>{{ $t('light') }}</span>
    </template>
  </i-switch>
</template>
