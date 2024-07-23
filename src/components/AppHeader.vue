<script setup lang="ts">
  import { useSettingsStore } from '@/store/settings.ts'

  const settingsStore = useSettingsStore()
  import { computed, ref, watch } from 'vue'

  const collapsedSider = () => {
    settingsStore.toggleCollapsed()
  }

  const isCollapsed = ref(settingsStore.isCollapsed)

  watch(
    () => settingsStore.isCollapsed,
    (newValue) => {
      isCollapsed.value = newValue
    }
  )

  const rotateIcon = computed(() => ['menu-icon', isCollapsed.value ? 'rotate-icon' : ''])
</script>

<template>
  <Header class="bg-white py-0 px-0 m-0 flex">
    <Card class="m-0 px-4 flex flex-1">
      <Space split>
        <Icon
          @click="collapsedSider"
          :class="[rotateIcon, 'inline-block align-middle cursor-pointer']"
          type="md-menu"
          size="18  "
        />
        <slot />
      </Space>
    </Card>
  </Header>

  <slot name="breadcrumb" />
</template>

<style scoped>
  .menu-icon {
    transition: transform 0.3s ease;
  }

  .rotate-icon {
    transform: rotate(-90deg);
  }
</style>
