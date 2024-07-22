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
  <!--        Leave here for MVP. LEAD -->
  <!--        https://www.iviewui.com/view-ui-plus/component/layout/layout#left -->

  <!--  <Content>-->
  <Header :style="{ background: '#fff', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)' }">
    123123
    <Breadcrumb :style="{ margin: '16px 0' }">
      <BreadcrumbItem>Home</BreadcrumbItem>
      <BreadcrumbItem>Components</BreadcrumbItem>
      <BreadcrumbItem>Layout</BreadcrumbItem>
    </Breadcrumb>
  </Header>
  <!--        Leave here for MVP. LEAD -->

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
  <!--  </Content>-->
</template>
