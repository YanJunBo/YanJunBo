import Vue from 'vue'
import Router from 'vue-router'

import home from '@/page/indexPage/home'
import classify from '@/page/indexPage/classify'
import Main from '@/page/indexPage/main'
import film from '@/page/indexPage/film'
import productDetails from '@/page/goods/product_details'
import confirm_order from '@/page/goods/confirm_order'
import goodsComment from '@/page/goods/goods_comment'
import orderList from '@/page/order/orderList'
import orderDetails from '@/page/order/order_details'
import search from '@/page/search/search'
import filmDetails from '@/page/filmPage/film_details'
import shopDetalis from '@/page/shop/shop_details'
import goodsSearch from '@/page/goods/goods_search'
import goodsList from '@/page/goods/goods_list'
import login from '@/page/user/login'
import userAddressList from '@/page/user/user_address_list'
import userAddAddress from '@/page/user/user_add_address'
import userShopCar from '@/page/user/user_shop_car'
import setting from '@/page/user/setting'
import goodsFavorites from '@/page/user/goods_favorites'
import footprint from '@/page/user/footprint'
import groupBuying from '@/page/groupBuying/groupBuying'
Vue.use(Router)
export default new Router({
  routes: [{
    path: '/',
    name: 'home',
    component: home

  }, {
    path: '/film',
    name: 'film',
    component: film

  }, {
    path: '/classify',
    name: 'classify',
    component: classify

  }, {
    path: '/page/goods/product_details',
    name: 'product_details',
    component: productDetails
  }, {
    path: '/page/goods/confirm_order',
    name: 'confirm_order',
    component: confirm_order
  }, {
    path: '/Main',
    name: 'Main',
    component: Main

  }, {
    path: '/page/goods/goods_comment',
    name: 'goodsComment',
    component: goodsComment

  }, {
    path: '/page/goods/goods_search',
    name: 'goods_search',
    component: goodsSearch
  }, {
    path: '/page/goods/goods_list',
    name: 'goodsList',
    component: goodsList
  }, {
    path: '/page/order/orderList',
    name: 'orderList',
    component: orderList
  }, {
    path: '/page/order/order_details',
    name: 'orderDetails',
    component: orderDetails
  }, {
    path: '/page/search/search',
    name: 'search',
    component: search
  }, {
    path: '/page/filmPage/film_details',
    name: 'filmDetails',
    component: filmDetails
  }, {
    path: '/page/shop/shop_details',
    name: 'shop_details',
    component: shopDetalis
  }, {
    path: '/page/user/login',
    name: 'login',
    component: login
  }, {
    path: '/page/user/user_address_list',
    name: 'user_address_list',
    component: userAddressList
  }, {
    path: '/page/user/user_add_address',
    name: 'user_add_address',
    component: userAddAddress
  }, {
    path: '/page/user/user_shop_car',
    name: 'user_shop_car',
    component: userShopCar
  }, {
    path: '/page/user/setting',
    name: 'setting',
    component: setting
  }, {
    path: '/page/user/goods_favorites',
    name: 'goodsFavorites',
    component: goodsFavorites
  }, {
    path: '/page/user/footprint',
    name: 'footprint',
    component: footprint
  }, {
    path: '/page/groupBuying/groupBuying',
    name: 'groupBuying',
    component: groupBuying
  }]
})
