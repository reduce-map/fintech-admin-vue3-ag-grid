<script setup lang="ts">
  import { computed, Ref, ref, watch } from 'vue'
  import { useRoute } from 'vue-router'
  import { useSettingsStore } from '@/store/settings.ts'

  const settingsStore = useSettingsStore()
  const route = useRoute()

  const activeMenuItem = computed(() => route.name)
  const menuitemClasses = computed(() => ['menu-item', isCollapsed.value ? 'collapsed-menu' : ''])

  interface ToggleableHTMLElement extends HTMLElement {
    toggleCollapse: () => void
  }
  const sideBarRef: Ref<ToggleableHTMLElement | null> = ref(null)

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
    <Sider ref="sideBarRef" collapsible :collapsed-width="78" v-model="isCollapsed">
      <Menu :active-name="activeMenuItem" theme="dark" width="auto" :class="menuitemClasses">
        <MenuItem name="dashboard" :to="{ name: 'dashboard' }">
          <Icon type="ios-navigate" />
          <span>Dashboard</span>
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
  .layout-con {
    height: 100%;
    width: 100%;
  }
  .menu-item span {
    display: inline-block;
    overflow: hidden;
    width: calc(100% - 30px);
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: bottom;
    transition: width 0.2s ease 0.2s;
  }
  .menu-item i {
    transform: translateX(0px);
    transition:
      font-size 0.2s ease,
      transform 0.2s ease;
    vertical-align: middle;
    font-size: 16px;
  }
  .collapsed-menu span {
    width: 0;
    transition: width 0.2s ease;
  }
  .collapsed-menu i {
    transform: translateX(5px);
    transition:
      font-size 0.2s ease 0.2s,
      transform 0.2s ease 0.2s;
    vertical-align: middle;
    font-size: 22px;
  }
  .dev-run-preview .dev-run-preview-edit {
    display: none;
  }
</style>
