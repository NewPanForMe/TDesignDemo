import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import TDesign from 'tdesign-vue-next';
import http from './utils/http'
import cookies from './utils/cookies'
import api from './api/index'
import { MessagePlugin } from 'tdesign-vue-next';


const app = createApp(App)




app.use(router)
app.use(TDesign);
app.provide('$message',MessagePlugin)
app.provide('$http',http)
app.provide('$cookies',cookies)
app.provide('$api',api)



app.config.globalProperties.$message = MessagePlugin;
 app.config.globalProperties.$http = http;
app.config.globalProperties.$cookies = cookies;
 app.config.globalProperties.$api = api;


app.mount('#app')
