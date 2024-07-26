<template>
  <PageHeader class="bot-header" title="Trading Bot Admin Panel">
    <template #logo>
      <img src="@/assets/reducemap.jpeg" alt="reducemap" />
    </template>
    <template #action>
      <ButtonGroup>
        <Button @click="toggleStatus">{{ isBotEnabled ? 'Deactivate Bot' : 'Activate Bot' }}</Button>
        <Button type="primary" @click="isDrawerOpened = true">Open Bot Setting</Button>
        <Button type="dashed">Make Money</Button>
      </ButtonGroup>
    </template>
    <template #content>
      <DescriptionList layout="horizontal" :col="4">
        <Description :term="isBotEnabled ? 'Big boss:' : 'Small boss:'">Boss</Description>
        <Description term="Department:">Trading</Description>
        <Description term="Purpose:">FTMO Bot</Description>
        <Description term="Deadline:">
          <strong>
            <CountDown v-font="16" :target="deadlineCountDown" @on-end="handleEnd" />
          </strong>
        </Description>
        <Description term="Duration:">
          <Time :time="duration" type="datetime" />
        </Description>
        <Description term="Total Trades:">
          <strong>1111</strong>
        </Description>
        <Description term="Profit:">
          <Numeral value="1111.11" format="0,0.00">
            <template #prefix>
              <strong>$</strong>
            </template>
          </Numeral>
        </Description>
        <Description term="Last Operation:">Buy 101 shares of ABC at $50</Description>
        <Description term="System Status:">All systems operational</Description>
        <Description term="User:">Kevin</Description>
        <Description term="Bot Status:">{{ isBotEnabled ? 'Active' : 'Inactive' }}</Description>
        <Description term="Bot Version:">1.0.0</Description>
      </DescriptionList>
    </template>
    <template #extra>
      <Space split wrap>
        <div class="flex items-center align-circle">
          <Circle v-if="isBotEnabled" :percent="100" :size="30" :stroke-width="8" stroke-color="#5cb85c">
            <Icon type="ios-checkmark" size="30" style="color: #5cb85c" />
          </Circle>

          <Circle v-if="!isBotEnabled" :percent="100" :size="30" :stroke-width="8" stroke-color="#ff5500">
            <Icon type="ios-close" size="30" style="color: #ff5500" />
          </Circle>
        </div>

        <Poptip
          confirm
          title="Are you sure to change the status"
          ok-text="Change status"
          placement="right-end"
          transfer
          word-wrap
          padding="0"
          cancel-text="Keep the same"
          @on-ok="ok"
          @on-cancel="cancel"
        >
          <Button type="dashed" class="m-0">Change Status</Button>
        </Poptip>
      </Space>
    </template>
  </PageHeader>

  <Drawer
    v-model="isDrawerOpened"
    title="Bot Settings | Basic Right Drawer "
    draggable
    :closable="false"
    placement="right"
    width="600"
  >
    <DashboardBasicSettings />
  </Drawer>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Message } from 'view-ui-plus'
import DashboardBasicSettings from './BotBasicSettings.vue'

const isDrawerOpened = ref(false)
const isBotEnabled = ref(true)
const deadlineCountDown = ref(new Date().getTime() + 11.111 * 1000) // 11.111 seconds : magic number for example
const duration = ref(new Date().getTime() - 86400 * 854 * 1000)

const toggleStatus = () => {
  isBotEnabled.value = !isBotEnabled.value
  Message.info(`Bot status changed to ${isBotEnabled.value}`)
}

// Handlers
const ok = () => {
  isBotEnabled.value = !isBotEnabled.value
  Message.info(`Bot status changed to ${isBotEnabled.value}`)
}

const cancel = () => {
  Message.info('Bot status remains the same')
}

// CountDown
const handleEnd = () => {
  deadlineCountDown.value = new Date().getTime() + 111.111 * 1000
  Message.info('Time is up!')
}
</script>

<style lang="scss">
.bot-header .ivu-page-header-action {
  overflow: hidden; // adding old school clearfix to the action buttons
}
</style>
