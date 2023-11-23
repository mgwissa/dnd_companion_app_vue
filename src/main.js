import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { setupFirebase, database } from './lib/FirebaseConfig'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

setupFirebase()

app.config.globalProperties.$database = database

app.mount('#app')
