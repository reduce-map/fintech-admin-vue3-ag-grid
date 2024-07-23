import { createI18n } from 'vue-i18n'
import enLocal from './locales/en.ts'
import uaLocal from './locales/ua.ts'

import en from 'view-ui-plus/dist/locale/en-US.js'
import ua from 'view-ui-plus/dist/locale/uk-UA.js'

const messages = {
  'en-US': {
    ...en,
    ...enLocal,
  },
  'uk-UA': {
    ...ua,
    ...uaLocal,
  },
}

const i18n = createI18n({
  allowComposition: true,
  globalInjection: true,
  legacy: false,
  locale: 'en-US',
  fallbackLocale: 'en-US',
  messages,
})

export default i18n

export interface I18nMessages {
  dark: string
  light: string
  save: string
}
