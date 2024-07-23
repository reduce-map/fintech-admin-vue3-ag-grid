<template>
  <AppHeader>
    <span class="text-2xl align-middle">♝</span>
    <h1>Reports page / 50 000 rows</h1>
  </AppHeader>

  <Space split wrap class="mt-2">
    <ButtonGroup>
      <Button @click="gridApi?.selectAll()">Select All</Button>
      <Button @click="gridApi?.deselectAll()">Clear Selection</Button>
      <Button @click="onBtStopEditing">Stop Editing</Button>
      <Button @click="onBtStartEditing">Start Editing</Button>

      <Poptip content="Search for 'new' 👉/ after click" trigger="hover">
        <Button @click="addTradeRecord">Add Trade Record</Button>
      </Poptip>
      <Button :disabled="!isChanged" @click="saveChanges">Save Changes</Button>
      <Button @click="exportData">Export Data</Button>
      <Button @click="toggleSideBar">Show sidebar</Button>
    </ButtonGroup>

    <Input class="ivu-inline" placeholder="Type text to filter..." @keyup="onQuickFilterChanged" />
    <Poptip content="Upload CSV data" title="Upload" trigger="hover">
      <Upload action="#" class="ivu-inline" :before-upload="handleFileUpload" accept=".csv" :show-upload-list="false">
        <Button icon="ios-cloud-upload-outline">Upload CSV</Button>
      </Upload>
    </Poptip>
  </Space>
  <ag-grid-vue
    style="width: 100%; height: calc(100vh - 100px)"
    class="ag-theme-balham"
    :column-defs="columnDefs"
    :row-data="rowData"
    :side-bar="sidebar"
    :default-col-def="defaultColDef"
    edit-type="fullRow"
    :group-headers="true"
    :animate-rows="true"
    :row-drag-managed="true"
    :enable-range-selection="true"
    :suppress-row-click-selection="true"
    row-selection="multiple"
    :row-group-panel-show="'always'"
    undo-redo-cell-editing
    @grid-ready="onGridReady"
    @cell-value-changed="onCellValueChanged"
    @row-value-changed="onRowValueChanged"
  />
</template>

<script setup lang="ts">
import { ref, onBeforeMount, onBeforeUnmount, defineProps } from 'vue'
import { AgGridVue } from 'ag-grid-vue3'
import {
  ColDef,
  GridApi,
  ICellRendererParams,
  AgGridEvent,
  RowValueChangedEvent,
  CellValueChangedEvent,
} from 'ag-grid-community'
import 'ag-grid-enterprise'
import * as XLSX from 'xlsx'
import { Message, Poptip } from 'view-ui-plus'
import { formatDateTime } from '@/utils'
import AppHeader from '@/components/AppHeader.vue'

const props = defineProps({
  initialData: {
    type: Array,
    default: () => [],
  },
  exportFileName: {
    type: String,
    default: 'reports-trading',
  },
})

const isChanged = ref(false)
const isSideBarVisible = ref(false)

const BooleanCellRenderer = (params: ICellRendererParams) => {
  return params.value ? '✅' : '❌'
}

const StarCellRenderer = (params: ICellRendererParams) => {
  const stars = '★'.repeat(params.value)
  return `<span>${stars}</span>`
}

const columnDefs = ref([
  {
    headerName: 'Trade Details',
    children: [
      {
        headerName: 'Date',
        field: 'date',
        sortable: true,
        filter: 'agDateColumnFilter',
      },
      {
        headerName: 'Time',
        field: 'time',
        sortable: true,
        filter: 'agTextColumnFilter',
      },
      {
        headerName: 'FTMO',
        field: 'isPassedFTMO',
        sortable: true,
        cellRenderer: BooleanCellRenderer,
        filter: 'agTextColumnFilter',
      },
      {
        headerName: 'Trade ID',
        field: 'tradeId',
        sortable: true,
        filter: 'agTextColumnFilter',
      },
      {
        headerName: 'Trader',
        field: 'trader',
        sortable: true,
        filter: 'agTextColumnFilter',
      },
    ],
  },
  {
    headerName: 'Transaction',
    children: [
      {
        headerName: 'Buy/Sell',
        field: 'buySell',
        sortable: true,
        filter: 'agTextColumnFilter',
      },
      {
        headerName: 'Amount',
        field: 'amount',
        sortable: true,
        filter: 'agNumberColumnFilter',
      },
      {
        headerName: 'Currency Pair',
        field: 'currencyPair',
        sortable: true,
        filter: 'agTextColumnFilter',
      },
    ],
  },
  {
    headerName: 'Price Details',
    children: [
      {
        headerName: 'Price',
        field: 'price',
        sortable: true,
        filter: 'agNumberColumnFilter',
      },
      {
        headerName: 'Profit/Loss',
        field: 'profitLoss',
        sortable: true,
        filter: 'agNumberColumnFilter',
      },
      {
        headerName: 'Pips',
        field: 'pips',
        sortable: true,
        filter: 'agNumberColumnFilter',
      },
      {
        headerName: 'Rating',
        field: 'rating',
        cellRenderer: StarCellRenderer,
        sortable: true,
        filter: true,
      },
    ],
  },
])

const defaultColDef = ref<ColDef>({
  flex: 1,
  editable: true,
  sortable: true,
  filter: true,
  enableRowGroup: true,
  enableValue: true,
  enablePivot: true,
  checkboxSelection: true,
  headerCheckboxSelection: true,
})

const gridApi = ref<GridApi | null>(null)
const rowData = ref<TradingHistoryRecord[]>([])

const sidebar = ref({
  toolPanels: [
    {
      id: 'columns',
      labelDefault: 'Columns',
      labelKey: 'columns',
      iconKey: 'columns',
      toolPanel: 'agColumnsToolPanel',
    },
    {
      id: 'filters',
      labelDefault: 'Filters',
      labelKey: 'filters',
      iconKey: 'filter',
      toolPanel: 'agFiltersToolPanel',
    },
  ],
  defaultToolPanel: 'columns',
  hiddenByDefault: false,
})

interface TradingHistoryRecord {
  date: string // ISO string of the date
  time: string // Time string
  tradeId: string // Trade identifier
  trader: string // Trader name/identifier
  buySell: 'Buy' | 'Sell' // Operation type
  amount: string // Amount as string to maintain decimal precision
  currencyPair: string // Currency pair involved in the trade
  price: string // Price at which the trade was executed
  profitLoss: string // Profit or loss from the trade
  pips: string // Number of pips gained or lost
  rating: number // Rating of the trade
  isPassedFTMO: boolean // Flag to indicate if FTMO criteria were passed
}

// Mock Data Generation
const generateTradingHistory = (count: number): TradingHistoryRecord[] => {
  const history: TradingHistoryRecord[] = []
  const currentYear = new Date().getFullYear()

  for (let i = 0; i < count; i++) {
    const randomDate = new Date(currentYear, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1)
    const randomTime = new Date()
    randomTime.setHours(Math.floor(Math.random() * 24))
    randomTime.setMinutes(Math.floor(Math.random() * 60))
    randomTime.setSeconds(Math.floor(Math.random() * 60))

    history.push({
      date: randomDate.toISOString().split('T')[0],
      time: randomTime.toTimeString().split(' ')[0],
      tradeId: `TID-${Math.floor(Math.random() * 100000)}`,
      trader: `Trader${i + 1}`,
      buySell: Math.random() > 0.5 ? 'Buy' : 'Sell',
      amount: (Math.random() * 100000).toFixed(2),
      currencyPair: 'EUR/USD',
      price: (1.1 + Math.random() * 0.2).toFixed(4),
      profitLoss: (Math.random() * 200 - 100).toFixed(2),
      pips: (Math.random() * 100 - 50).toFixed(2),
      rating: Math.floor(Math.random() * 5) + 1,
      isPassedFTMO: Math.random() > 0.8,
    })
  }
  return history
}

const onGridReady = (params: AgGridEvent) => {
  gridApi.value = params.api
  gridApi.value.sizeColumnsToFit()
  rowData.value = generateTradingHistory(50000) // Populate with mock data
}

const onCellValueChanged = (event: CellValueChangedEvent) => {
  const field = event.colDef.field + 'Changed'
  event.data[field] = true
  gridApi.value?.refreshCells({
    rowNodes: [event.node],
    columns: [event.colDef.field || ''],
  })
  isChanged.value = true
}

const onRowValueChanged = (event: RowValueChangedEvent) => {
  const data = event.data
  console.log('onRowValueChanged: (' + data.date + ', ' + data.trader + ', ' + data.amount + ', ' + data.price + ')')
  isChanged.value = true
}

const onBtStopEditing = () => {
  gridApi.value?.stopEditing()
}

const onBtStartEditing = () => {
  gridApi.value?.setFocusedCell(1, 'date')
  gridApi.value?.startEditingCell({
    rowIndex: 1,
    colKey: 'date',
  })
}

const onQuickFilterChanged = (event: Event) => {
  const target = event.target as HTMLInputElement
  gridApi.value?.setGridOption('quickFilterText', target.value)
}

const addTradeRecord = () => {
  const newRecord: TradingHistoryRecord = {
    date: new Date().toISOString().split('T')[0],
    time: new Date().toISOString().split('T')[1].split('.')[0],
    tradeId: `TID-${Math.floor(Math.random() * 100000)}`,
    trader: 'New',
    buySell: Math.random() > 0.5 ? 'Buy' : 'Sell',
    amount: (Math.random() * 100000).toFixed(2),
    currencyPair: 'EUR/USD', // replace to symbol
    price: (1.1 + Math.random() * 0.2).toFixed(4),
    profitLoss: (Math.random() * 200 - 100).toFixed(2),
    pips: (Math.random() * 100 - 50).toFixed(2),
    rating: Math.floor(Math.random() * 5) + 1,
    isPassedFTMO: Math.random() > 0.5,
  }

  rowData.value = [...rowData.value, newRecord]
  isChanged.value = true
}

const saveChanges = () => {
  isChanged.value = false
  Message.info('Pinia -> API call')
}

const exportData = () => {
  gridApi.value?.exportDataAsCsv({
    skipColumnGroupHeaders: true,
    fileName: `${props.exportFileName}-${formatDateTime()}`,
  })
}

const toggleSideBar = () => {
  isSideBarVisible.value = !isSideBarVisible.value
  gridApi.value?.setSideBarVisible(isSideBarVisible.value)
  gridApi.value?.sizeColumnsToFit()
}

const handleFileUpload = (file: File): boolean => {
  const reader = new FileReader()

  reader.onload = (event: ProgressEvent<FileReader>) => {
    const data = event.target?.result as ArrayBuffer // Assert ArrayBuffer for binary data
    const workbook = XLSX.read(data, { type: 'binary' })
    const firstSheetName = workbook.SheetNames[0]
    const worksheet = workbook.Sheets[firstSheetName]
    const jsonData: unknown[][] = XLSX.utils.sheet_to_json(worksheet, {
      header: 1,
    })

    const rowData: TradingHistoryRecord[] = jsonData.slice(1).map((row: unknown[]): TradingHistoryRecord => {
      // assuming user uploaded data is in correct format
      return {
        date: String(row[0]),
        time: String(row[1]),
        tradeId: String(row[2]),
        trader: String(row[3]),
        buySell: row[4] === 'Buy' ? 'Buy' : 'Sell', // Ensures buySell is 'Buy' or 'Sell'
        amount: String(row[5]),
        currencyPair: String(row[6]),
        price: String(row[7]),
        profitLoss: String(row[8]),
        pips: String(row[9]),
        rating: Number(row[10]),
        isPassedFTMO: false, // Defaulting as this field might not be in uploaded data
      }
    })

    gridApi.value?.setGridOption('rowData', rowData)
  }
  reader.readAsArrayBuffer(file)

  return false // To prevent default file upload behavior
}

onBeforeMount(() => {
  rowData.value = generateTradingHistory(50000) // mock data population
})

onBeforeUnmount(() => {
  gridApi.value?.destroy()
})
</script>
