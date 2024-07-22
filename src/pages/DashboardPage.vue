<script setup lang="ts">
  import { useI18n } from 'vue-i18n'
  import { ref } from 'vue'

  const { t } = useI18n()

  const { locale } = useI18n()
  const languages = ref([
    { label: 'English', value: 'en-US' },
    { label: 'Українська', value: 'uk-UA' },
  ])

  const handleLanguageChange = (value: string) => {
    locale.value = value
  }
</script>

<template>
  <h1 class="text-gray-100 bg-amber-300 flex-1 max-h-1">Dashboard ♟️ Example Page</h1>
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
</template>
