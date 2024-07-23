<script setup lang="ts">
  import AppHeader from '@/components/AppHeader.vue'
  import FormSettings from '@/components/FormSettingsPage.vue'
</script>

<template>
  <AppHeader>
    <span class="text-3xl align-middle">♞</span>
    <h1>Settings</h1>

    <template #breadcrumb>
      <Breadcrumb class="p-4">
        <BreadcrumbItem :to="{ name: 'dashboard' }">Dashboard</BreadcrumbItem>
        <BreadcrumbItem>Settings</BreadcrumbItem>
      </Breadcrumb>
    </template>
  </AppHeader>

  <FormSettings />
</template>
