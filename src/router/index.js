import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import Stocks from '../views/Stocks.vue'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  {
    path: '/',
    name: 'Stocks',
    component: Stocks
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  // {
  //   path: '/trade',
  //   name: 'TradeTest',
  //   component: () => import('../views/Trade.vue')
  // },
  {
    path: '/proxy',
    name: 'ProxyTest',
    component: () => import('../views/Proxy.vue')
  },
  {
    path: '/filter',
    name: 'Filter',
    component: () => import('../views/Filter.vue')
  },
  {
    path: '/sort',
    name: 'Sort',
    component: () => import('../views/Sort.vue')
  },
  {
    path: '/agg',
    name: 'Agg',
    component: () => import('../views/Agg.vue')
  }

]

const router = new VueRouter({
  routes
})

export default router
