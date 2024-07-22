<script setup lang="ts">
  import { useI18n } from 'vue-i18n'
  import { computed, ref, watch } from 'vue'
  import { useSettingsStore } from '@/store/settings.ts'
  import {Space} from "view-ui-plus";

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
  <Header class="bg-amber-300 p-0 m-0">
    <Card class="m-0 p-0 flex">
      <Space>
        <Icon @click="collapsedSider" :class="[rotateIcon, 'inline-block']" type="md-menu" size="24" />
        <h1>♟️Dashboard Page</h1>
      </Space>
    </Card>
  </Header>
  <Breadcrumb class="p-4">
    <BreadcrumbItem>Home</BreadcrumbItem>
    <BreadcrumbItem>Components</BreadcrumbItem>
    <BreadcrumbItem>Layout</BreadcrumbItem>
  </Breadcrumb>


  <Card>

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
