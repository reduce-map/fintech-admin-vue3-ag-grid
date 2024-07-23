<script setup lang="ts">
  import AppHeader from '@/components/AppHeader.vue'
</script>

<template>
  <AppHeader>
    <span class="text-2xl align-middle">♜</span>
    <h1>Dashboard Page</h1>
  </AppHeader>

  <DescriptionList title="List:" :col="4">
    <Description term="Settings Page：">
      <router-link :to="{ name: 'settings' }"> Link </router-link>
    </Description>
    <Description term="Lisa："> 12 </Description>
    <Description term="Newton："> 321 </Description><Description term="Macintosh："> 12 </Description>
    <Description term="Lisa："> 12 </Description>
    <Description term="Newton："> 321 </Description><Description term="Macintosh："> 12 </Description>
    <Description term="Lisa："> 12 </Description>
    <Description term="Newton："> 321 </Description>
  </DescriptionList>
</template>
