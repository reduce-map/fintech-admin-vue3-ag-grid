<script setup lang="ts">
  import { ref } from 'vue'

  export interface Props {
    verticalSplit?: number
    horizontalSplit?: number
  }

  // Задание дефолтных значений пропсов
  const props = withDefaults(defineProps<Props>(), {
    verticalSplit: 0.3,
    horizontalSplit: 0.4,
  })

  const localVerticalSplit = ref(props.verticalSplit)
  const localHorizontalSplit = ref(props.horizontalSplit)
</script>

<template>
  <slot name="beforeMain">
    <!--    BeforeMain slot-->
  </slot>
  <div class="layout-container">
    <Split v-model="localVerticalSplit" mode="vertical">
      <template #top>
        <div class="layout-pane no-padding">
          <Split v-model="localHorizontalSplit" mode="horizontal">
            <template #left>
              <div class="layout-pane">
                <slot name="topleft">Top Left Pane slot</slot>
              </div>
            </template>
            <template #right>
              <div class="layout-pane">
                <slot name="topright">Top Right Pane slot</slot>
              </div>
            </template>
          </Split>
        </div>
      </template>
      <template #bottom>
        <div class="layout-pane layout-pane-bottom">
          <slot name="main">Main Pane slot</slot>
        </div>
      </template>
    </Split>
  </div>
</template>

<style lang="scss" scoped>
  // tailwind for MVP
  .layout-container {
    height: calc(100vh - var(--header-height) - 150px);
    border: 1px solid #dcdee2;
  }

  .layout-pane {
    padding: 10px;
    max-width: 100%;
    max-height: 100%;
    overflow-x: hidden;
  }

  .layout-pane.no-padding {
    height: 100%;
    padding: 0;
  }

  .layout-pane-bottom {
    //background: #eee;
  }
</style>
