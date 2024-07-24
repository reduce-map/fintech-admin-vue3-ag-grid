<script setup lang="ts">
import { ref } from 'vue'
import { AgFinancialCharts } from 'ag-charts-vue3'
import 'ag-charts-enterprise'
import { AgFinancialChartOptions } from 'ag-grid-enterprise'
import { Card } from 'view-ui-plus'

// didn't find in lib
type ChartType = 'candlestick' | 'hollow-candlestick' | 'ohlc' | 'line' | 'step-line' | 'range-area'

const options = ref<AgFinancialChartOptions>({
  data: generateRandomData(200), // Generate 100 data points
  // navigator: true, // annotations don't work with navigator
  annotations: true,
  rangeToolbar: true, // 1m 3m 6m YTD 1 y All
  volume: true,
  statusBar: true,
  zoom: true,
  chartType: 'candlestick',
})

type toggleFeatureType = 'navigator' | 'annotations' | 'rangeToolbar' | 'volume'

function toggleFeature(type: toggleFeatureType) {
  const newOptions = { ...options.value }
  if (typeof newOptions[type] === 'boolean') {
    newOptions[type] = !newOptions[type]
  }
  options.value = newOptions
}

function changeType(type: ChartType) {
  const newOptions = { ...options.value }
  newOptions.chartType = type
  options.value = newOptions
}

function generateRandomData(count: number) {
  const data = []
  let date = new Date('2022-01-01')
  for (let i = 0; i < count; i++) {
    const open = Math.random() * 100 + 100 // Random value between 100 and 200
    const close = open + (Math.random() - 0.5) * 10 // Close around open, random up/down
    const high = Math.max(open, close) + Math.random() * 5
    const low = Math.min(open, close) - Math.random() * 5
    const volume = Math.floor(Math.random() * 5000000 + 1000000) // Volume between 1M and 6M
    data.push({ date, open, high, low, close, volume })
    date = new Date(date.setDate(date.getDate() + 1)) // Increment date by one day
  }
  return data
}
</script>

<template>
  <Card>
    <ButtonGroup>
      <Button @click="toggleFeature('navigator')">Toggle Navigator</Button>
      <Button @click="toggleFeature('annotations')">Toggle Annotations</Button>
      <Button @click="toggleFeature('rangeToolbar')"> Toggle Range Toolbar </Button>
      <Button @click="toggleFeature('volume')">Toggle Volume</Button>
      <Button @click="changeType('candlestick')">Candlestick (Default)</Button>
      <Button @click="changeType('ohlc')">OHLC</Button>
      <Button @click="changeType('hollow-candlestick')"> Hollow Candlestick </Button>
      <Button @click="changeType('line')">Line</Button>
      <Button @click="changeType('step-line')">Step Line</Button>
      <Button @click="changeType('range-area')">Range Area</Button>
    </ButtonGroup>
    <ag-financial-charts :options="options" style="height: 500px" />
  </Card>
</template>
