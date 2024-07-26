<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import { useAuthStore } from '@/store/auth'
import { ref } from 'vue'

import ExampleTreemap from '@/components/ExampleTreemap.vue'
import ExampleTreemap2 from '@/components/ExampleTreemap2.vue'
import DashboardApplicationChart from '@/components/DashboardApplicationChart.vue'
import DashboardFinancialChart from '@/components/DashboardFinancialChart.vue'

const authStore = useAuthStore()

const columns = ref(2)
</script>

<template>
  <AppHeader>
    <span class="text-2xl align-middle">♜</span>
    <h1>Dashboard Page</h1>
  </AppHeader>

  <div class="px-3">
    <Carousel :height="100" autoplay loop :autoplay-speed="2000">
      <CarouselItem class="">
        <div class="flex justify-center items-center h-full">
          <h2>authStore.loggedIn : {{ authStore.loggedIn }}</h2>
        </div>
      </CarouselItem>
      <CarouselItem>
        <div class="flex justify-center items-center h-full">
          <h2>authStore.role : {{ authStore.role }}</h2>
        </div>
      </CarouselItem>
    </Carousel>

    <DashboardFinancialChart />

    <Grid class="mb-4" :col="columns" border hover>
      <GridItem>
        <ExampleTreemap />
      </GridItem>
      <GridItem>
        <ExampleTreemap2 />
      </GridItem>
    </Grid>

    <DashboardApplicationChart class="mb-4" />
  </div>
</template>
