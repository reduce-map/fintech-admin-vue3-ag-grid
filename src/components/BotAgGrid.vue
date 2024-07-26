<template>
  <div>
    <div class="example-wrapper">
      <Space split wrap class="py-3 px-2">
        <ButtonGroup>
          <Button @click="gridApi?.selectAll()">Select All</Button>
          <Button @click="gridApi?.deselectAll()">Clear Selection</Button>
          <Button @click="onBtStopEditing">Stop Editing</Button>
          <Button @click="onBtStartEditing">Start Editing</Button>
          <Button @click="addCurrencyPair">Add Currency Pair</Button>
          <Button :disabled="!isChanged" @click="saveChanges">Save Changes</Button>
          <Button @click="exportData">Export Data</Button>
          <Button @click="toggleSideBar">Show sidebar</Button>
        </ButtonGroup>

        <Input class="ivu-inline" placeholder="Type text to filter..." @keyup="onQuickFilterChanged" />
        <Poptip
          content="It works 👌🔥 this id done by ag grid 🙌 not me 🙆🏻‍"
          title="Export data 👈 after upload it 🙇🏻‍"
          trigger="hover"
        >
          <Upload
            action="#"
            class="ivu-inline"
            :before-upload="handleFileUpload"
            accept=".csv"
            :show-upload-list="false"
          >
            <Button icon="ios-cloud-upload-outline">Upload CSV</Button>
          </Upload>
        </Poptip>
      </Space>
      <ag-grid-vue
        style="width: 100%; height: 425px"
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, onBeforeUnmount } from 'vue'
import { AgGridVue } from 'ag-grid-vue3'
import { formatDateTime, getAllCurrenciesFromPrioritizedCountries, getFlagByCurrency } from '@/utils'
import { ColDef, GridApi, AgGridEvent, CellValueChangedEvent, ICellRendererParams } from 'ag-grid-community'
import 'ag-grid-enterprise'
import * as XLSX from 'xlsx'
import { Poptip, Message } from 'view-ui-plus'

const props = defineProps<{
  initialData: CurrencyPair[]
  exportFileName: string
}>()

const isChanged = ref(false)
const isSideBarVisible = ref(true)

type DynamicField<T> = T & { [key: string]: unknown }

const generateCellClassRules = <T extends object>(fieldName: string) => {
  return {
    'cell-changed': (params: { data: DynamicField<T> }) => {
      return !!params.data?.[`${fieldName}Changed`]
    },
  }
}

const columnDefs = ref<ColDef[]>([
  {
    rowDrag: true,
    field: 'base',
    headerName: 'Base',
    sortable: true,
    cellEditor: 'agSelectCellEditor',
    cellRenderer: currencyCellRenderer,
    cellEditorParams: {
      values: getAllCurrenciesFromPrioritizedCountries(),
    },
    aggFunc: 'first',
    cellClassRules: generateCellClassRules('base'),
  },
  {
    field: 'quote',
    headerName: 'Quote',
    sortable: true,
    cellEditor: 'agSelectCellEditor',
    cellRenderer: currencyCellRenderer,
    cellEditorParams: {
      values: getAllCurrenciesFromPrioritizedCountries(),
    },
    aggFunc: 'first',
    cellClassRules: generateCellClassRules('quote'),
  },
  {
    field: 'buy',
    headerName: 'Buy',
    sortable: true,
    cellEditor: 'NumericCellEditor',
    cellClassRules: generateCellClassRules('buy'),
  },
  {
    field: 'sell',
    headerName: 'Sell',
    aggFunc: 'sum',
    sortable: true,
    cellEditor: 'NumericCellEditor',
    cellClassRules: generateCellClassRules('sell'),
  },
  {
    headerName: 'Enabled',
    field: 'enabled',
    sortable: true,
    cellRenderer: checkboxCellRenderer,
    cellEditor: 'agCheckboxCellEditor',
    cellClassRules: generateCellClassRules('enabled'),
  },
])

const gridApi = ref<GridApi | null>(null)
const defaultColDef = ref<ColDef>({
  flex: 1,
  editable: true,
  sortable: true,
  filter: true,
  enableRowGroup: true,
  enableValue: true,
  enablePivot: true,
  aggFunc: 'first',
  checkboxSelection: true,
  headerCheckboxSelection: true,
})

export interface CurrencyPair {
  enabled: boolean
  base: string
  quote: string
  buy: number
  sell: number
  updatedAt: string
}
const rowData = ref<CurrencyPair[]>([])
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

const onCellValueChanged = (event: CellValueChangedEvent) => {
  const field = event.colDef.field + 'Changed'
  event.data[field] = true
  gridApi.value?.refreshCells({
    rowNodes: [event.node],
    columns: [event.colDef.field || ''],
  })
  isChanged.value = true
}

const onRowValueChanged = () => {
  isChanged.value = true
}

const onBtStopEditing = () => {
  gridApi.value?.stopEditing()
}

const onBtStartEditing = () => {
  gridApi.value?.setFocusedCell(1, 'base')
  gridApi.value?.startEditingCell({
    rowIndex: 1,
    colKey: 'base',
  })
}

const onQuickFilterChanged = (event: Event) => {
  const target = event.target as HTMLInputElement
  gridApi.value?.setGridOption('quickFilterText', target.value)
}

const onGridReady = (params: AgGridEvent) => {
  gridApi.value = params.api
  gridApi.value?.sizeColumnsToFit()
}

const addCurrencyPair = () => {
  const newPair = {
    enabled: true,
    base: 'USD',
    quote: 'EUR',
    buy: 1,
    sell: 1,
    updatedAt: new Date().toISOString(),
  }

  rowData.value = [...rowData.value, newPair]
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

interface CsvRow {
  [key: number]: string | number | undefined
}

const handleFileUpload = (file: File) => {
  const reader = new FileReader()
  reader.onload = (event: ProgressEvent<FileReader>) => {
    const data = event.target?.result as ArrayBuffer // Assert ArrayBuffer for binary data
    const workbook = XLSX.read(data, { type: 'binary' })
    const firstSheetName = workbook.SheetNames[0]
    const worksheet = workbook.Sheets[firstSheetName]
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 })

    const rowData: CurrencyPair[] = (jsonData.slice(1) as unknown as CsvRow[]).map((row: CsvRow) => {
      return {
        base: row[0] as string,
        updatedAt: row[1] as string,
        quote: row[2] as string,
        buy: Number(row[3]),
        sell: Number(row[4]),
        enabled: row[5] === 'true', // Assuming 'true' or 'false' string in CSV
      }
    })

    gridApi.value?.setGridOption('rowData', rowData)
  }
  reader.readAsArrayBuffer(file)
  return false // Prevent upload
}

onBeforeMount(() => {
  // editType.value = "fullRow";
  rowData.value = [...props.initialData]
})

onBeforeUnmount(() => {
  gridApi.value?.destroy()
})

function checkboxCellRenderer(params: ICellRendererParams) {
  return params.value ? '✅' : '❌'
}

function currencyCellRenderer(params: ICellRendererParams) {
  return `${getFlagByCurrency(params.value)} ${params.value}`
}
</script>

<style lang="scss">
.example-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.cell-changed {
  background-color: #ffeb3b; // Yellow color for highlighting
}
</style>
