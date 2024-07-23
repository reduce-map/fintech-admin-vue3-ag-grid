<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
</script>

<template>
  <AppHeader>
    <span class="text-2xl align-middle">♜</span>
    <h1>Dashboard Page</h1>
  </AppHeader>

  <Row>
    <Col>
      <DescriptionList title="List:" :col="3">
        <Description term="Settings Page：">
          <router-link :to="{ name: 'settings' }"> Link </router-link>
        </Description>
      </DescriptionList>
    </Col>
  </Row>
</template>
