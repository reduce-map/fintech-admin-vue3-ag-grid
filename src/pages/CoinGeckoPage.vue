<script setup lang="ts">
import coinGeckoService from '../services/coin-gecko-service';
import type { Cryptocurrency } from '../services/coin-gecko-service';
import { onMounted, ref } from 'vue';

import { AgGridVue } from 'ag-grid-vue3';
import { GridApi, ColDef } from 'ag-grid-enterprise';
import 'ag-grid-enterprise';
import { Message } from "view-ui-plus";
import { getSavedResponseCoinGecko } from "@/utils/coingecko-sample-response.ts";
import AppHeader from "@/components/AppHeader.vue";
import {AgGridEvent} from "ag-grid-community";
import ImageCellRenderer from "@/components/AgGridImageCellRenderer.vue";

function numberFormatter(params: { value: number }) {
  return params?.value?.toLocaleString();
}

const fetchCryptocurrencies = async () => {
  try {
    rowData.value = await coinGeckoService.getCryptocurrencies();
  } catch (error) {
    Message.error('Error fetching cryptocurrencies ', error);
    rowData.value = getSavedResponseCoinGecko();
  }
};

onMounted(() => {
  fetchCryptocurrencies();
});

const rowData = ref<Cryptocurrency[]>([]);
const gridApi = ref<GridApi | null>(null);

const columnDefs = ref<ColDef[]>([
  {
    field: 'name',
    headerName: 'Name',
    rowDrag: true
  },
  {
    field: 'symbol',
    headerName: 'Symbol',
  },
  {
    field: 'current_price',
    headerName: 'Current Price',
  },

  {
    field: 'high_24h',
    headerName: '24h High',
  },
  {
    field: 'low_24h',
    headerName: '24h Low',
  },
  {
    field: 'price_change_24h',
    headerName: '24h Change',
  },
  {
    field: 'price_change_percentage_24h',
    headerName: '24h Change %',
  },
  {
    field: 'image',
    headerName: 'Image',
    cellRenderer: ImageCellRenderer,
  },
  {
    field: 'market_cap',
    headerName: 'Market Cap',
    valueFormatter: numberFormatter,
  },
  {
    field: 'total_volume',
    headerName: 'Total Volume',
    valueFormatter: numberFormatter,
  },
  {
    field: 'circulating_supply',
    headerName: 'Circulating Supply',
    valueFormatter: numberFormatter,
  },
  {
    field: 'total_supply',
    headerName: 'Total Supply',
    valueFormatter: numberFormatter,
  },
  {
    field: 'max_supply',
    headerName: 'Max Supply',
  },
]);

const defaultColDef = ref<ColDef>({
  flex: 1,
  sortable: true,
  filter: true,
  enableRowGroup: true,
  minWidth: 100,
});

const onGridReady = (params: AgGridEvent) => {
  gridApi.value = params.api;
  params.api.sizeColumnsToFit();
};
</script>

<template>
  <AppHeader>
    <span class="text-2xl align-middle">♚</span>
    <h1>Coin Gecko Sample</h1>
  </AppHeader>

    <ag-grid-vue
      style="height: calc(100vh - 100px)"
      class="ag-theme-balham"
      :columnDefs="columnDefs"
      :rowData="rowData"
      :defaultColDef="defaultColDef"
      :animateRows="true"
      :rowDragManaged="true"
      :enableRangeSelection="true"
      :suppressRowClickSelection="true"
      rowSelection="multiple"
      @grid-ready="onGridReady"
    />
</template>
