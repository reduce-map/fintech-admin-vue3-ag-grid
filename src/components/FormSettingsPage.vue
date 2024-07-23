<template>
  <Row>
    <Col :xs="2" :sm="4" :md="6" :lg="8">Col</Col>
    <Col :xs="20" :sm="16" :md="12" :lg="8">Col</Col>
    <Col :xs="2" :sm="4" :md="6" :lg="8">Col</Col>
  </Row>

  <Row justify="start" class="code-row-bg">
    <Col span="4">col-4</Col>
    <Col span="4">col-4</Col>
    <Col span="4">col-4</Col>
    <Col span="4">col-4</Col>
  </Row>
  <div class="form-container">
    <Form :model="formItem" :label-width="200" :rules="rules" ref="formRef" class="flex p-3 flex-wrap gap-3">
      <!-- Interface Settings Section -->

      <Card class="flex-1 flex-shrink flex-grow basis-[calc(100%-20px)]">
        <h3 class="mb-3">Interface Settings</h3>



        <FormItem label="Theme Swithcer">
          <ThemeSwitcher />
        </FormItem>

        <FormItem label="Language Swithcer">
          <LanguageSwitcher />
        </FormItem>

        <Divider />

        <Button type="primary" @click="handleSubmit">{{ $t('save') }}</Button>
      </Card>

      <Card class="flex-1 flex-shrink flex-grow basis-[calc(50%-20px)] min-w-[300px] p-2.5 rounded-md">
        <h3 class="mb-3">Controls</h3>

        <FormItem :label="'minimumProfitValue'" prop="minimumProfitValue">
          <Input v-model="formItem.minimumProfitValue" placeholder="Minimum Profit Value" />
        </FormItem>

        <FormItem label="Input Number & Min, Max etc">
          <InputNumber
            v-model="formItem.desiredProfitPercentage"
            controls-outside
            :min="5"
            :max="99"
            :step="0.1"
            size="small"
          />
        </FormItem>

        <FormItem label="Time Picker & Validation" prop="statisticsCollectionTime">
          <TimePicker v-model="formItem.statisticsCollectionTime" type="time" placeholder="Select time" />
        </FormItem>

        <FormItem label="Date Picker">
          <DatePicker
            type="daterange"
            split-panels
            show-week-numbers
            :start-date="new Date(2025, 0, 1)"
            :options="datePickerOptions"
            placement="bottom-end"
            placeholder="Select date"
            style="width: 200px"
          />
        </FormItem>
      </Card>

      <Card class="flex-1 flex-shrink flex-grow basis-[calc(50%-20px)] min-w-[300px] p-2.5 rounded-md">
        <h3 class="mb-3">Indeterminate Checkbox Group</h3>

        <FormItem label="Password">
          <Input type="password" password placeholder="Password" />
        </FormItem>

        <FormItem label="Radio Group Button Type">
          <RadioGroup v-model="formItem.performanceMetrics" type="button">
            <Radio v-for="option in statisticsOptions" :label="option.label" :key="option.label">
              {{ option.label }}
            </Radio>
          </RadioGroup>
        </FormItem>

        <FormItem label="Input custom">
          <Input>
            <template #prepend>
              <Select v-model="formItem.urlProtocol" style="width: 80px">
                <Option value="http">http://</Option>
                <Option value="https">https://</Option>
              </Select>
            </template>
            <template #append>
              <Select v-model="formItem.domainOption" style="width: 70px">
                <Option value="com">.com</Option>
                <Option value="org">.org</Option>
                <Option value="io">.io</Option>
              </Select>
            </template>
          </Input>
        </FormItem>

        <FormItem label="Select custom">
          <Select v-model="selectedInstruments" multiple clearable style="width: 260px">
            <OptionGroup v-for="group in instrumentsGrouped" :label="group.source" :key="group.source">
              <Option v-for="item in group.instruments" :value="item.symbol" :key="item.symbol">
                <span>{{ item.label }}</span>
                <Trend :flag="item.trend" class="float-right mr-2">{{ item.change }}%</Trend>
              </Option>
            </OptionGroup>
          </Select>
        </FormItem>

        <FormItem label="Checkbox custom">
          <Space direction="horizontal" type="flex" split>
            <Checkbox :indeterminate="indeterminate" :model-value="checkAll" @click.prevent="handleCheckAll">
              Select All
            </Checkbox>
            <CheckboxGroup v-model="checkAllGroup" @on-change="checkAllGroupChange">
              <Checkbox v-for="option in options" :label="option" :key="option">
                {{ option }}
              </Checkbox>
            </CheckboxGroup>
          </Space>
        </FormItem>

        <FormItem label="Slider custom">
          <Slider v-model="backtestPercentageRange" :marks="backtestPercentageMarks" :step="5" show-stops range />
        </FormItem>
      </Card>
    </Form>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  import LanguageSwitcher from '@/components/LanguageSwitcher.vue'
  import ThemeSwitcher from '@/components/ThemeSwitcher.vue'
  import {Form, Message} from "view-ui-plus";

  const { t } = useI18n()

  const formRef = ref()

  // Form data. Assuming backend
  const formItem = ref({
    autoIncrementOrder: false,
    desiredProfitPercentage: 10,
    minimumProfitValue: 'minimumProfitValue',
    statisticsCollectionTime: '02:01:02',
    urlProtocol: 'http',
    domainOption: 'com',
    performanceMetrics: null,
  })

  export interface FinancialInstrument {
    symbol: string
    label: string
    source: string
    trend: 'up' | 'down'
    change: number
  }

  const instruments = ref<FinancialInstrument[]>([
    { symbol: 'EURUSD', label: 'Euro (USD)', source: 'OANDA', trend: 'down', change: 1.08 },
    { symbol: 'GBPUSD', label: 'Pound (USD)', source: 'OANDA', trend: 'up', change: 1.29 },
    { symbol: 'XAUUSD', label: 'Gold (USD)', source: 'OANDA', trend: 'up', change: 0.52 },
    { symbol: 'SPX', label: 'S&P 500', source: 'NASDAQ', trend: 'up', change: 5.56 },
    { symbol: 'NDX', label: 'NASDAQ 100', source: 'NASDAQ', trend: 'up', change: 5.57 },
    { symbol: 'ETHBTC', label: 'Ethereum (BTC)', source: 'Binance', trend: 'up', change: 0.05 },
    { symbol: 'ETHUSD', label: 'Ethereum (USD)', source: 'Binance', trend: 'up', change: 3.51 },
  ])

  const statisticsOptions = ref([
    { label: 'Balance max' },
    { label: 'Profit Factor max' },
    { label: 'Expected Payoff max' },
    { label: 'Drawdown min' },
    { label: 'Recovery Factor max' },
    { label: 'Sharpe Ratio max' },
    { label: 'Custom max' },
    { label: 'Complex Criterion max' },
  ])

  const selectedInstruments = ref<string[]>([])

  const instrumentsGrouped = computed(() => {
    const groupedMap = instruments.value.reduce(
      (acc, instrument) => {
        if (!acc[instrument.source]) {
          acc[instrument.source] = []
        }
        acc[instrument.source].push(instrument)
        return acc
      },
      {} as Record<string, FinancialInstrument[]>
    )

    return Object.keys(groupedMap).map((source) => ({
      source,
      instruments: groupedMap[source],
    }))
  })

  // date picker options
  const datePickerOptions = ref({
    shortcuts: [
      {
        text: '1 week',
        value() {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
          return [start, end]
        },
      },
      {
        text: '1 month',
        value() {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
          return [start, end]
        },
      },
      {
        text: '3 months',
        value() {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
          return [start, end]
        },
      },
    ],
  })

  // validation rules
  const rules = ref({
    minimumProfitValue: [{ required: true, message: 'enter min prf value', trigger: 'blur' }],
    statisticsCollectionTime: [
      {
        required: true,
        message: 'enter statistics collection time',
        trigger: 'change',
      },
    ],
  })

  // form submit
  const handleSubmit = () => {
    formRef.value.validate((valid: boolean) => {
      if (valid) {
        Message.info('Data ready to be send: ' + JSON.stringify(formItem.value))
      } else {
        console.error('Validation failed')
      }
    })
  }

  // indeterminate checkbox group setup
  const indeterminate = ref(true)
  const checkAll = ref(false)
  const checkAllGroup = ref<string[]>(['m5m1', 'm5Rm1'])
  const options = ref<string[]>(['m5m1', 'm5qm1', 'm5Rm1'])

  const handleCheckAll = () => {
    if (indeterminate.value) {
      checkAll.value = false
    } else {
      checkAll.value = !checkAll.value
    }
    indeterminate.value = false

    if (checkAll.value) {
      checkAllGroup.value = [...options.value]
    } else {
      checkAllGroup.value = []
    }
  }

  const checkAllGroupChange = (data: string[]) => {
    if (data.length === options.value.length) {
      indeterminate.value = false
      checkAll.value = true
    } else if (data.length > 0) {
      indeterminate.value = true
      checkAll.value = false
    } else {
      indeterminate.value = false
      checkAll.value = false
    }
  }

  // slider setup
  const backtestPercentageRange = ref<[number, number]>([25, 75]);

  const backtestPercentageMarks = {
    0: '0%',
    20: '20%',
    40: '40%',
    60: {
      style: {
        color: '#ff0000'
      },
      label: '60%'
    },
    80: '80%',
    100: '100%'
  };
</script>
