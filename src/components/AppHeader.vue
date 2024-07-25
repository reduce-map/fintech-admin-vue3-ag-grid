<script setup lang="ts">
import { useAuthStore } from '@/store/auth.ts'
import { useSettingsStore } from '@/store/settings.ts'
import { useRouter } from 'vue-router'

const settingsStore = useSettingsStore()
const authStore = useAuthStore()
const router = useRouter()
import { computed, ref, watch } from 'vue'

const collapsedSider = () => {
  settingsStore.toggleCollapsed()
}

const isCollapsed = ref(settingsStore.isCollapsed)

watch(
  () => settingsStore.isCollapsed,
  (newValue) => {
    isCollapsed.value = newValue
  }
)

const rotateIcon = computed(() => [isCollapsed.value ? 'rotate-90' : ''])

const previewList = ref([
  'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExOTZvaDdzdXRsNnlpY2pyOWR2djR5MjZ1dXg3NjE1azBnOXVsMzUxeCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/6KYPwNChIl8DRZL2TJ/giphy.webp',
])

const onLogOutClick = async () => {
  authStore.logOut()
  await router.push({ name: 'login' })
}
</script>

<template>
  <Header class="bg-white py-0 px-0 m-0">
    <Card class="m-0 px-4">
      <Row>
        <Col span="12">
          <Space split>
            <Icon
              :class="[rotateIcon, 'transform transition duration-500 inline-block align-middle cursor-pointer']"
              type="md-menu"
              size="18  "
              @click="collapsedSider"
            />
            <slot />
          </Space>
        </Col>
        <Col span="12" class="flex justify-end">
          <Dropdown placement="bottom-end">
            <Image
              :preview-list="[previewList]"
              preview
              lazy
              src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExbjBrMnVtcTczOXhjaXB6YW56NHVobDZlY3JzYzN1MzQwaGZqaTFsbSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/yr6VVsb27K0es/giphy.webp"
              fit="fit"
              width="36px"
              height="36px"
              alt="Hello world from reduce-map"
            />
            <Icon type="ios-arrow-down" size="18" />
            <template #list>
              <DropdownMenu>
                <DropdownItem>
                  <a href="https://github.com/reduce-map/fintech-admin-vue3" target="_blank">
                    Github
                    <Icon type="logo-github" />
                  </a>
                </DropdownItem>
                <DropdownItem @click="onLogOutClick">
                  Log Out
                  <Icon type="ios-log-out" />
                </DropdownItem>
              </DropdownMenu>
            </template>
          </Dropdown>
        </Col>
      </Row>
    </Card>
  </Header>

  <slot name="breadcrumb" />
</template>
