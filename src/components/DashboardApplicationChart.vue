<template>
  <Card>
    <ButtonGroup class="mb-4">
      <Button @click="onGenerateChart">Generate Trading Analysis Chart</Button>
    </ButtonGroup>
    <div class="grid-wrapper">
      <ag-grid-vue
        style="width: 100%; height: 500px"
        class="ag-theme-balham"
        :column-defs="columnDefs"
        :default-col-def="defaultColDef"
        :enable-range-selection="true"
        :enable-charts="true"
        :row-data="rowData"
        :popup-parent="popupParent"
        @grid-ready="onGridReady"
      />
    </div>
  </Card>
</template>

<script setup lang="ts">
import { ref, onMounted, VNodeRef } from 'vue'
import { AgGridVue } from 'ag-grid-vue3'
import 'ag-grid-enterprise'
import { ColDef, GridApi } from 'ag-grid-enterprise'
import { Card, ButtonGroup, Button } from 'view-ui-plus'
import { AgGridEvent } from 'ag-grid-community'

// Define an interface for the trading data
interface TradingData {
  strategy: string
  winRate: number
  averageProfit: number
  totalTrades: number
  averageLoss: number
  totalProfit: number
}

// Define column definitions
const columnDefs = ref<ColDef[]>([
  { field: 'strategy', headerName: 'Strategy', width: 150, chartDataType: 'category' },
  { field: 'winRate', headerName: 'Win Rate (%)', chartDataType: 'series', sort: 'desc' },
  { field: 'averageProfit', headerName: 'Avg Profit ($)', chartDataType: 'series', sort: 'desc' },
  { field: 'totalTrades', headerName: 'Total Trades', chartDataType: 'series' },
  { field: 'averageLoss', headerName: 'Avg Loss ($)', chartDataType: 'series' },
  { field: 'totalProfit', headerName: 'Total Profit ($)', chartDataType: 'series' },
])

// Grid API and default column definition
const gridApi = ref<GridApi | null>(null)
const defaultColDef = ref({
  editable: true,
  flex: 1,
  minWidth: 100,
  filter: true,
})

// References for popup parent and row data
const popupParent = ref<VNodeRef | null>(null)
const rowData = ref<TradingData[]>([])

// Fetch and set data on component mount
onMounted(async () => {
  const data: TradingData[] = await getData()
  rowData.value = data
})

// Create charts function
const createCharts = () => {
  if (gridApi.value) {
    gridApi.value.createRangeChart({
      cellRange: {
        rowStartIndex: 0,
        rowEndIndex: 4,
        columns: ['strategy', 'winRate', 'averageProfit'],
      },
      chartType: 'groupedColumn',
      chartThemeOverrides: {
        common: {
          title: {
            enabled: true,
            text: 'Top Trading Strategies',
          },
        },
      },
    })
  }
}

// Handler for chart button click
const onGenerateChart = () => {
  createCharts()
}

// Handler for grid ready event
const onGridReady = (params: AgGridEvent) => {
  gridApi.value = params.api
}

// Mock data fetching function
async function getData(delay = 100): Promise<TradingData[]> {
  return new Promise((resolve) => setTimeout(() => resolve(generateTradingData()), delay))
}

// Generate mock trading data
function generateTradingData(): TradingData[] {
  const strategies = [
    'Trend Following',
    'Mean Reversion',
    'Arbitrage',
    'Scalping',
    'Swing Trading',
    'Day Trading',
    'Position Trading',
    'Algorithmic Trading',
    'Quantitative Trading',
    'High-Frequency Trading',
    'Statistical Arbitrage',
    'Market Making',
    'Event-Driven Trading',
    'Momentum Trading',
    'Technical Analysis',
    'Fundamental Analysis',
    'News Trading',
    'Pairs Trading',
    'Options Trading',
    'Cryptocurrency Trading',
  ]

  return strategies.map((strategy) => ({
    strategy,
    winRate: parseFloat((Math.random() * 100).toFixed(2)),
    averageProfit: parseFloat((Math.random() * 10000).toFixed(2)),
    totalTrades: Math.floor(Math.random() * 1000),
    averageLoss: parseFloat((Math.random() * 10000).toFixed(2)),
    totalProfit: parseFloat((Math.random() * 10000).toFixed(2)),
  }))
}
</script>

<style scoped>
.grid-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>
