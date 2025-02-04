<script setup lang="ts">
import { computed, Ref, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useSettingsStore } from '@/store/settings.ts'
import { Sider } from 'view-ui-plus'

const settingsStore = useSettingsStore()
const route = useRoute()

const activeMenuItem = computed(() => route.name)
const menuitemClasses = computed(() => ['menu-item', isCollapsed.value ? 'collapsed-menu' : ''])

const sideBarRef: Ref<typeof Sider | null> = ref(null)

const isCollapsed = ref(settingsStore.isCollapsed)

const handleCollapseChange = (newValue: boolean) => {
  settingsStore.setCollapsed(newValue)
  sideBarRef.value?.toggleCollapse()
}

watch(
  () => settingsStore.isCollapsed,
  (newValue: boolean) => {
    isCollapsed.value = newValue
    handleCollapseChange(newValue)
  }
)

watch(isCollapsed, handleCollapseChange)
</script>

<template>
  <Layout class="min-h-screen">
    <Sider
      ref="sideBarRef"
      v-model="isCollapsed"
      hide-trigger
      collapsible
      :collapsed-width="78"
      :class="{ 'dark-theme': settingsStore.theme === 'dark' }"
    >
      <Menu
        :active-name="activeMenuItem"
        :theme="settingsStore.theme"
        width="auto"
        :class="menuitemClasses"
        :open-names="['AG Grid']"
        accordion
      >
        <MenuItem name="dashboard" :to="{ name: 'dashboard' }">
          <Icon type="ios-navigate" />
          <span>Dashboard</span>
        </MenuItem>
        <MenuItem name="bot" :to="{ name: 'bot', params: { id: 27 } }">
          <Icon type="logo-bitcoin" />
          <span>FTMO Bot 27 Special</span>
        </MenuItem>
        <MenuItem name="coin-gecko" :to="{ name: 'coin-gecko' }">
          <Icon type="md-ionitron" />
          <span>Coingecko</span>
        </MenuItem>
        <MenuItem name="reports" :to="{ name: 'reports' }">
          <Icon type="ios-list-box" />
          <span>Reports</span>
        </MenuItem>
        <MenuItem name="settings" :to="{ name: 'settings' }">
          <Icon type="ios-settings" />
          <span>Settings</span>
        </MenuItem>
      </Menu>
    </Sider>
    <Layout>
      <router-view />
    </Layout>
  </Layout>
</template>

<style lang="scss" scoped>
.menu-item {
  span {
    display: inline-block;
    overflow: hidden;
    width: calc(100% - 30px);
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: bottom;
    transition: width 0.2s ease 0.2s;
  }
  i {
    transform: translateX(0px);
    transition:
      font-size 0.2s ease,
      transform 0.2s ease;
    vertical-align: middle;
    font-size: 16px;
  }
}
.collapsed-menu {
  span {
    width: 0;
    transition: width 0.2s ease;
  }

  i {
    transform: translateX(5px);
    transition:
      font-size 0.2s ease 0.2s,
      transform 0.2s ease 0.2s;
    vertical-align: middle;
    font-size: 22px;
  }
}

#app {
  .ivu-layout-sider {
    background: #fff;
  }
  .ivu-layout-sider.dark-theme {
    background-color: #001529;
  }
}
</style>
