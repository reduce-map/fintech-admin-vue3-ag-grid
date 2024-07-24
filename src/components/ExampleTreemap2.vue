<template>
  <div>
    <TradingChart title="FTMO Bots by Trading Volume" :data="ftmoData" />
  </div>
</template>

<script setup lang="ts">
import TradingChart from './DashboardTreeMap.vue'

interface TradingData {
  name: string
  gdp?: number
  children?: TradingData[]
}

const ftmoData: TradingData[] = [
  {
    name: 'FTMO Bots',
    children: [
      {
        name: 'Crypto Trading Bots',
        children: [
          { name: 'BTC/USD', gdp: 5000 },
          { name: 'ETH/USD', gdp: 3000 },
          { name: 'XRP/USD', gdp: 1500 },
          { name: 'LTC/USD', gdp: 1200 },
        ],
      },
      {
        name: 'Fiat Trading Bots',
        children: [
          { name: 'EUR/USD', gdp: 8000 },
          { name: 'USD/JPY', gdp: 4000 },
          { name: 'GBP/USD', gdp: 3500 },
          { name: 'AUD/USD', gdp: 2000 },
        ],
      },
      {
        name: 'Other Trading Bots',
        children: [
          { name: 'Gold/USD', gdp: 2500 },
          { name: 'Oil/USD', gdp: 1800 },
          { name: 'Silver/USD', gdp: 1000 },
        ],
      },
    ],
  },
]
</script>
