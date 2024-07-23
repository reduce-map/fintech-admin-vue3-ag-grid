<template>
  <div class="overflow-hidden min-h-screen">
    <Form ref="formRef" :model="formItem" :label-width="180" :rules="rules" class="flex p-3 flex-wrap gap-3">
      <Card class="w-full">
        <h3 class="mb-3">{{ $t('interfaceSettings') }}</h3>
        <Space split>
          <FormItem class="mb-0" :label="$t('themeSwitcher')" :label-width="140">
            <ThemeSwitcher />
          </FormItem>

          <FormItem class="mb-0" :label="$t('languageSwitcher')" :label-width="140">
            <LanguageSwitcher />
          </FormItem>

          <Button size="lg" type="dashed" icon="logo-octocat" @click="handleSubmit">{{ $t('save') }}</Button>
        </Space>
      </Card>
      <Row :gutter="16">
        <Col :xs="24" :xl="12">
          <Card>
            <h3 class="mb-3">{{ $t('appSettings') }}</h3>

            <FormItem :label="$t('enterNickName')" prop="nickName">
              <Input v-model="formItem.nickName" :placeholder="$t('yourNickName')" />
            </FormItem>

            <FormItem :label="$t('inputCustom')">
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

            <FormItem :label="$t('selectCustom')">
              <Select v-model="selectedInstruments" multiple clearable style="width: 260px">
                <OptionGroup v-for="group in instrumentsGrouped" :key="group.source" :label="group.source">
                  <Option v-for="item in group.instruments" :key="item.symbol" :value="item.symbol">
                    <span>{{ item.label }}</span>
                    <Trend :flag="item.trend" class="float-right mr-2">{{ item.change }}%</Trend>
                  </Option>
                </OptionGroup>
              </Select>
            </FormItem>

            <FormItem :label="$t('inputNumberMinMax')" prop="profitValue">
              <InputNumber
                v-model="formItem.profitValue"
                controls-outside
                :min="1000"
                :max="50000"
                :step="2000"
                size="small"
              />
            </FormItem>

            <FormItem :label="$t('sliderCustom')">
              <div class="px-5">
                <Slider v-model="backTestPercentageRange" :marks="backTestPercentageMarks" :step="5" show-stops range />
              </div>
            </FormItem>
          </Card>
        </Col>
        <Col :xs="24" :xl="12">
          <Card>
            <h3 class="mb-3">{{ $t('indeterminateCheckboxGroup') }}</h3>

            <FormItem :label="$t('password')">
              <Input type="password" password :placeholder="$t('password')" />
            </FormItem>

            <FormItem :label="$t('timeAndPickerValidation')" prop="statisticsCollectionTime">
              <TimePicker v-model="formItem.statisticsCollectionTime" type="time" :placeholder="$t('selectTime')" />
            </FormItem>

            <FormItem :label="$t('datePicker')">
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

            <FormItem :label="$t('radioGroupButtonType')">
              <RadioGroup v-model="formItem.performanceMetrics" type="button">
                <Radio v-for="option in statisticsOptions" :key="option.label" :label="option.label">
                  {{ option.label }}
                </Radio>
              </RadioGroup>
            </FormItem>

            <FormItem :label="$t('checkBoxCustom')">
              <Space direction="horizontal" type="flex" split>
                <Checkbox :indeterminate="indeterminate" :model-value="checkAll" @click.prevent="handleCheckAll">
                  {{ $t('selectAll') }}
                </Checkbox>
                <CheckboxGroup v-model="checkAllGroup" @on-change="checkAllGroupChange">
                  <Checkbox v-for="option in options" :key="option" :label="option">
                    {{ option }}
                  </Checkbox>
                </CheckboxGroup>
              </Space>
            </FormItem>
          </Card>
        </Col>
      </Row>
    </Form>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'
import ThemeSwitcher from '@/components/ThemeSwitcher.vue'
import { Form, Message, Space } from 'view-ui-plus'

const { t } = useI18n()

const formRef = ref()

// Form data. Assuming backend
const formItem = ref({
  autoIncrementOrder: false,
  desiredProfitPercentage: 10,
  profitValue: 10000,
  statisticsCollectionTime: '02:01:02',
  urlProtocol: 'http',
  domainOption: 'com',
  performanceMetrics: null,
  nickName: 'reduceMap | Nikita',
})

export interface FinancialInstrument {
  symbol: string
  label: string
  source: string
  trend: 'up' | 'down'
  change: number
}

const instruments = ref<FinancialInstrument[]>([
  {
    symbol: 'EURUSD',
    label: 'Euro (USD)',
    source: 'OANDA',
    trend: 'down',
    change: 1.08,
  },
  {
    symbol: 'GBPUSD',
    label: 'Pound (USD)',
    source: 'OANDA',
    trend: 'up',
    change: 1.29,
  },
  {
    symbol: 'XAUUSD',
    label: 'Gold (USD)',
    source: 'OANDA',
    trend: 'up',
    change: 0.52,
  },
  {
    symbol: 'SPX',
    label: 'S&P 500',
    source: 'NASDAQ',
    trend: 'up',
    change: 5.56,
  },
  {
    symbol: 'NDX',
    label: 'NASDAQ 100',
    source: 'NASDAQ',
    trend: 'up',
    change: 5.57,
  },
  {
    symbol: 'ETHBTC',
    label: 'Ethereum (BTC)',
    source: 'Binance',
    trend: 'up',
    change: 0.05,
  },
  {
    symbol: 'ETHUSD',
    label: 'Ethereum (USD)',
    source: 'Binance',
    trend: 'up',
    change: 3.51,
  },
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

// validation rules, place for adjustments
// https://www.iviewui.com/view-ui-plus/component/form/form#validate
// https://github.com/yiminghe/async-validator
const rules = ref({
  nickName: [{ required: true, message: t('enterNickName'), trigger: 'blur' }],
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
const backTestPercentageRange = ref<[number, number]>([25, 75])

const backTestPercentageMarks = {
  0: '0%',
  20: '20%',
  40: '40%',
  60: {
    style: {
      color: '#ff0000',
    },
    label: '60%',
  },
  80: '80%',
  100: '100%',
}
</script>
