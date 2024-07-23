<template>
  <Form ref="formRef" :model="formItem" :label-width="150" :label-colon="true" :rules="rules">
    <FormItem label="Start on Open">
      <Tooltip content="Toggle to start on open" placement="top">
        <i-switch v-model="formItem.startOnOpen" size="large">
          <template #open>
            <span>On</span>
          </template>
          <template #close>
            <span>Off</span>
          </template>
        </i-switch>
      </Tooltip>
    </FormItem>

    <FormItem label="Steam Proxy">
      <Tooltip content="Select the Steam proxy to use" placement="top">
        <Select v-model="formItem.steamProxy">
          <Option value="proxy1">Steam socks Proxy (Free)</Option>
          <Option value="proxy2">Steam socks Proxy (Paid)</Option>
        </Select>
      </Tooltip>
    </FormItem>

    <FormItem label="Update Orders">
      <Tooltip content="Specify the time to update orders">
        <DatePicker v-model="formItem.updateOrdersTime" placeholder="Select date" style="width: 200px" />
      </Tooltip>
    </FormItem>

    <FormItem label="Search for Sales" prop="searchSalesTime">
      <Tooltip content="Specify the time to search for sales">
        <Row>
          <Col span="11">
            <InputNumber v-model="formItem.searchSalesValue" placeholder="Enter value"></InputNumber>
          </Col>
          <Col span="2" style="text-align: center">:</Col>
          <Col span="11">
            <TimePicker v-model="formItem.searchSalesTime" type="time" placeholder="Select time"></TimePicker>
          </Col>
        </Row>
      </Tooltip>
    </FormItem>

    <FormItem label="Update on Sales" prop="updateSalesTime">
      <Tooltip content="Specify the time to update sales">
        <Row>
          <Col span="11">
            <Input v-model="formItem.updateSalesValue" placeholder="Enter value"></Input>
          </Col>
          <Col span="2" style="text-align: center">:</Col>
          <Col span="11">
            <TimePicker v-model="formItem.updateSalesTime" type="time" placeholder="Select time"></TimePicker>
          </Col>
        </Row>
      </Tooltip>
    </FormItem>

    <FormItem label="Delay (ms)">
      <Tooltip content="Delay in ms">
        <InputNumber v-model="formItem.delay" :min="10" placeholder="Enter delay in ms" />
      </Tooltip>
    </FormItem>

    <FormItem label="Markup Percentage">
      <Tooltip content="Percentage and fixed value">
        <Row>
          <Col span="11">
            <InputNumber v-model="formItem.markupPercentage" placeholder="Enter percentage"></InputNumber>
          </Col>
          <Col span="5" style="text-align: center; min-width: 20px">%</Col>
          <Col span="7">
            <InputNumber v-model="formItem.markupFixed" placeholder="Enter fixed value"></InputNumber>
          </Col>
        </Row>
      </Tooltip>
    </FormItem>

    <FormItem label="Do Not Sell if Sticker Value Above">
      <Tooltip content="Maximum value for selling">
        <Input v-model="formItem.stickerValueLimit" placeholder="Enter value"></Input>
      </Tooltip>
    </FormItem>

    <FormItem label="Do Not Sell if Streak Above">
      <Tooltip content="Maximum streak for selling">
        <InputNumber v-model="formItem.streakLimit" placeholder="Enter value"></InputNumber>
      </Tooltip>
    </FormItem>

    <FormItem label="Proxies">
      <Tooltip content="Specify the proxies to use">
        <Input v-model="formItem.proxies" placeholder="Enter proxies"></Input>
      </Tooltip>
    </FormItem>

    <FormItem>
      <Button type="primary" @click="handleSubmit">Save</Button>
    </FormItem>
  </Form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Message } from 'view-ui-plus'
// import { Form, FormItem, Input, Select, Option, TimePicker, Button, iSwitch, Tooltip, Message, Row, Col, DatePicker } from 'view-design';

const formRef = ref()
const formItem = ref({
  startOnOpen: true,
  steamProxy: 'proxy2',
  updateOrdersTime: '',
  searchSalesValue: 4,
  searchSalesTime: '00:02:00',
  updateSalesValue: 8,
  updateSalesTime: '00:02:01',
  delay: 10,
  markupPercentage: 5,
  markupFixed: 0.5,
  stickerValueLimit: 5700,
  streakLimit: 100,
  proxies: '',
})

const rules = ref({
  steamProxy: [{ required: true, message: 'Please select a Steam Proxy', trigger: 'blur' }],
  searchSalesValue: [
    {
      required: true,
      message: 'Please enter the search sales value',
      trigger: 'blur',
    },
  ],
  searchSalesTime: [
    {
      required: true,
      message: 'Please specify the search sales time',
      trigger: 'blur',
    },
  ],
  updateSalesValue: [
    {
      required: true,
      message: 'Please enter the update sales value',
      trigger: 'blur',
    },
  ],
  updateSalesTime: [
    {
      required: true,
      message: 'Please specify the update sales time',
      trigger: 'blur',
    },
  ],
  delay: [{ required: true, message: 'Please specify the delay', trigger: 'blur' }],
})

const handleSubmit = () => {
  formRef.value.validate((valid: boolean) => {
    if (valid) {
      Message.info(`Ready for REST API call \n ${JSON.stringify(formItem.value, null, 4)}`)
    } else {
      console.error('Validation failed')
    }
  })
}
</script>

<style scoped>
.ivu-form {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;

  .ivu-form-item {
    flex: 1 1 calc(30% - 20px); /* Adjust the width as necessary */
    min-width: 300px;
  }

  .wider {
    flex: 1 1 calc(45% - 20px); /* Adjust the width as necessary */
  }
}
</style>
