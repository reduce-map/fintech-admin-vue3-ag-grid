<script setup lang="ts">
  import { ref } from 'vue'
  import { useI18n } from 'vue-i18n'

  // import SideLayout from "../layout/SideLayout.vue";
  // import SettingsForm from "../components/SettingsForm.vue";

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
  <!--  <SideLayout>-->
  <h1>Settings</h1>
  <Space>
    <p>Internationalization / i18n locale:</p>
    <Select v-model="locale" @on-change="handleLanguageChange" style="width: 200px">
      <Option v-for="lang in languages" :key="lang.value" :value="lang.value">
        {{ lang.label }}
      </Option>
    </Select>
  </Space>
  <SettingsForm />
  <!--  </SideLayout>-->
</template>
