<template>
  <div>
    <TradingChart title="Indices Performance" :data="indicesData" />
  </div>
</template>

<script setup lang="ts">
import TradingChart from './DashboardTreeMap.vue'

interface TradingData {
  name: string
  gdp?: number
  children?: TradingData[]
}

const indicesData: TradingData[] = [
  {
    name: 'Indices',
    children: [
      {
        name: 'US Indices',
        children: [
          { name: 'S&P 500', gdp: 38000 },
          { name: 'NASDAQ 100', gdp: 15000 },
          { name: 'Dow Jones', gdp: 28000 },
        ],
      },
      {
        name: 'European Indices',
        children: [
          { name: 'FTSE 100', gdp: 10000 },
          { name: 'DAX 30', gdp: 12000 },
          { name: 'CAC 40', gdp: 9000 },
        ],
      },
      {
        name: 'Asian Indices',
        children: [
          { name: 'Nikkei 225', gdp: 14000 },
          { name: 'Hang Seng', gdp: 8000 },
          { name: 'Shanghai Composite', gdp: 7000 },
        ],
      },
    ],
  },
]
</script>
