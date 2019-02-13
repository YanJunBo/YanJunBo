// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Mint from 'mint-ui'
import common from '../common/common'
import axios from 'axios'
import preview from 'vue-photo-preview'

// CSS
import 'mint-ui/lib/style.css'
import './assets/fontIcon/style.css'
import './assets/css/common.css'
/* 单独引用Swiper.min.css */
import 'swiper/dist/css/swiper.min.css'
import 'vue-photo-preview/dist/skin.css'
var $http = axios.create({
  baseURL: '',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  transformResponse: [function (data) {
    // 对 data 进行任意转换处理
    return JSON.parse(data)
  }]
})
Vue.use(Mint)
Vue.use(preview)
Vue.prototype.apiUrl = {
  shopUrl: 'https://mall.jscntech.com/',
  centerUrl: 'https://ucenter.jscntech.com/'
}

Vue.prototype.common = common
Vue.config.productionTip = false
Vue.prototype.$axios = $http
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
