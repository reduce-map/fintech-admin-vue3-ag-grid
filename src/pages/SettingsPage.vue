<script setup lang="ts">
  import { ref } from 'vue'
  import { useI18n } from 'vue-i18n'

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
  <h1>Settings</h1>
  <Space>
    <p>Internationalization / i18n locale:</p>
    <Select v-model="locale" @on-change="handleLanguageChange">
      <Option v-for="lang in languages" :key="lang.value" :value="lang.value">
        {{ lang.label }}
      </Option>
    </Select>
  </Space>
</template>
