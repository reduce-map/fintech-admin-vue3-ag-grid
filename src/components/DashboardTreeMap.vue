<template>
  <ag-charts :options="options" />
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { AgCharts } from 'ag-charts-vue3'
import { type AgChartOptions } from 'ag-charts-community'
import 'ag-charts-enterprise'

interface TradingData {
  name: string
  gdp?: number
  children?: TradingData[]
}

const props = defineProps<{
  title: string
  data: TradingData[]
}>()

const formatter = new Intl.NumberFormat('en-US', {
  useGrouping: true,
  maximumFractionDigits: 0,
})

const options = ref<AgChartOptions>({
  data: props.data,
  series: [
    {
      type: 'treemap',
      labelKey: 'name',
      secondaryLabelKey: 'gdp',
      sizeKey: 'gdp',
      tile: {
        fill: 'rgba(255, 0, 0, 0.7)', // Red fill color
        stroke: 'black', // Black border color
        strokeWidth: 2, // 2px border width
        label: {
          color: 'white', // White text color for labels
          minimumFontSize: 9,
        },
        secondaryLabel: {
          color: 'white', // White text color for secondary labels
          minimumFontSize: 6,
          formatter: ({ value }) => (value != null ? `$${formatter.format(value)} B` : undefined),
        },
        padding: 6,
      },
    },
  ],
  title: {
    text: props.title,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black', // Title color
  },
  background: {
    fill: 'white', // Background color
  },
})

watchEffect(() => {
  options.value.data = props.data
  options.value.title = { text: props.title }
})
</script>
