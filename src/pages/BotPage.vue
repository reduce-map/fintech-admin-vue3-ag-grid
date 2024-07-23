<script setup lang="ts">
import { ref } from 'vue'

import SplitLayout from '../layouts/SplitLayout.vue'

import DashboardBasicSettings from '@/components/DashboardBasicSettings.vue'
import DashboardLog from '@/components/DashboardLog.vue'
import Header2 from '@/components/BotHeader.vue'
import DashboardAgGrid from '@/components/DashboardAgGrid.vue'
import type { CurrencyPair } from '@/components/DashboardAgGrid.vue'

// const value = ref('basic'); // set if you want to open the panel by default
const value = ref('')
const columns = ref([
  {
    title: 'Variable',
    key: 'variable',
    width: 150,
    fixed: 'left',
    sortable: true,
  },
  {
    title: 'Value',
    key: 'value',
    sortable: true,
  },
  {
    title: 'Description',
    key: 'description',
    sortable: true,
  },
])

const data = ref([
  {
    variable: 'Mode',
    value: 'AGGRESSIVE',
    description: 'Trading mode to find positions',
  },
  {
    variable: 'Risk per trade',
    value: '0.25%',
    description: 'Percentage of deposit risked per trade',
  },
  {
    variable: 'Daily stop loss',
    value: '0.0',
    description: 'Total losses to stop trading for the day',
  },
  {
    variable: 'Active trades',
    value: '2',
    description: 'Number of active trades per idea',
  },
  {
    variable: 'Stoploss range',
    value: 'auto',
    description: 'Automatic stoploss range',
  },
  {
    variable: 'Min stoploss',
    value: '0',
    description: 'Minimum stoploss length in ticks',
  },
  {
    variable: 'Max stoploss',
    value: '0',
    description: 'Maximum stoploss length in ticks',
  },
  {
    variable: 'Min RR',
    value: '1 RR',
    description: 'Minimum risk-reward ratio to find',
  },
  {
    variable: 'Partials',
    value: '30% / 30% / 40%',
    description: 'Percentage distribution for partial exits',
  },
  {
    variable: 'First TP',
    value: '1.5 RR',
    description: 'Risk-reward ratio for the first take profit',
  },
  {
    variable: 'Second TP',
    value: '3 RR',
    description: 'Risk-reward ratio for the second take profit',
  },
  {
    variable: 'BE after TP',
    value: '2.0',
    description: 'Risk-reward ratio to move to break-even',
  },
  {
    variable: 'Move to BE',
    value: 'ALL',
    description: 'Move to break-even at chosen time',
  },
  {
    variable: 'Close at time',
    value: 'ALL',
    description: 'Close trade at chosen time',
  },
  { variable: 'Test Mode', value: 'OFF', description: 'Test mode on or off' },
  {
    variable: 'Test Mode Trades',
    value: 'LONGS',
    description: 'Test mode trades: long or short',
  },
])

const AgGridData = ref<CurrencyPair[]>([
  {
    enabled: true,
    base: 'USD',
    quote: 'UAH',
    buy: 40.55,
    sell: 41.111,
    updatedAt: '2024-06-13T08:02:00Z',
  },
  {
    enabled: true,
    base: 'EUR',
    quote: 'UAH',
    buy: 43.9,
    sell: 44.4,
    updatedAt: '2024-06-17T08:02:00Z',
  },
  {
    enabled: false,
    base: 'GBP',
    quote: 'UAH',
    buy: 49.0,
    sell: 52.5,
    updatedAt: '2024-06-17T08:02:00Z',
  },
  {
    enabled: true,
    base: 'CHF',
    quote: 'UAH',
    buy: 43.0,
    sell: 45.5,
    updatedAt: '2024-06-17T08:02:00Z',
  },
  {
    enabled: true,
    base: 'PLN',
    quote: 'UAH',
    buy: 9.8,
    sell: 10.5,
    updatedAt: '2024-06-17T08:02:00Z',
  },
  {
    enabled: true,
    base: 'EUR',
    quote: 'USD',
    buy: 1.0681,
    sell: 1.0936,
    updatedAt: '2024-06-17T08:02:00Z',
  },
])
</script>

<template>
  <Header2 />
  <SplitLayout class="min-h-screen">
    <template #beforeMain>
      <Collapse v-model="value" accordion>
        <Panel name="basic">
          <Icon type="ios-settings" size="18" />
          <strong>Basic Settings</strong>
          <template #content>
            <DashboardBasicSettings />
          </template>
        </Panel>
      </Collapse>
    </template>
    <template #topleft>
      <h3 class="mb-4">Trading Input Values</h3>
      <Table :columns="columns" :data="data" stripe size="small" :border="true" />
    </template>
    <template #topright>
      <DashboardLog />
    </template>
    <template #main>
      <DashboardAgGrid :initial-data="AgGridData" export-file-name="bot-currency-pairs" />
    </template>
  </SplitLayout>
</template>

<style lang="scss" scoped>
.split-layout-bot {
}
</style>
