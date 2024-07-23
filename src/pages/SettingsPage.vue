<script setup lang="ts">
  import AppHeader from '@/components/AppHeader.vue'
  import FormPersonalSettings from '@/components/FormPersonalSettings.vue'
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

  <FormPersonalSettings />
</template>
