import { createApp } from 'vue'
import App from './App.vue'
import ViewUIPlus from 'view-ui-plus'
import router from './router'
import i18n from './i18n'
import pinia from './store'

import './design/style.scss'

const app = createApp(App)

app.use(ViewUIPlus)
app.use(pinia)
app.use(router)
app.use(i18n)

app.mount('#app')
