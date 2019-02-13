import Vue from 'vue'
import Router from 'vue-router'

// import home from '@/components/home'
// import indexTB from '@/page/indexTB'
// import home from '@/page/home'
import home from '@/page/home'
import order from '@/page/order'
Vue.use(Router)
console.log(home)
export default new Router({
  routes: [{
    path: '/',
    name: 'home',
    // redirect:'#',
    component: home,
    children: [{
      path: '/order',
      component: order
    }]
  }]
})
