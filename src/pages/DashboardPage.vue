<script setup lang="ts">
  import { useI18n } from 'vue-i18n'
  import { computed, ref, watch } from 'vue'
  import { useSettingsStore } from '@/store/settings.ts'

  const settingsStore = useSettingsStore()

  const { t } = useI18n()
  const { locale } = useI18n()
  const languages = ref([
    { label: 'English', value: 'en-US' },
    { label: 'Українська', value: 'uk-UA' },
  ])

  const handleLanguageChange = (value: string) => {
    locale.value = value
  }

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
  <Header :style="{ padding: 0 }" class="bg-amber-300">
    <Icon @click="collapsedSider" :class="rotateIcon" :style="{ margin: '0 20px' }" type="md-menu" size="24" />
  </Header>
  {{ settingsStore.isCollapsed }}
  <Header :style="{ background: '#fff', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)' }">
    <Breadcrumb :style="{ margin: '16px 0' }">
      <BreadcrumbItem>Home</BreadcrumbItem>
      <BreadcrumbItem>Components</BreadcrumbItem>
      <BreadcrumbItem>Layout</BreadcrumbItem>
    </Breadcrumb>
  </Header>
  <Card>
    <h1 class="text-gray-100 bg-amber-300">Dashboard ♟️ Example Page</h1>
    <Icon type="logo-bitcoin" />
    <Space>
      <p>Internationalization / i18n locale:</p>
      <Select v-model="locale" style="width: 200px" @on-change="handleLanguageChange">
        <Option v-for="lang in languages" :key="lang.value" :value="lang.value">
          {{ lang.label }}
        </Option>
      </Select>
    </Space>
    {{ t('enterDesiredProfitPercentage') }}
  </Card>
</template>

<style scoped>
  .menu-icon {
    transition: transform 0.3s ease;
  }

  .rotate-icon {
    transform: rotate(-90deg);
  }
</style>
