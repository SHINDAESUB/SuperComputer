import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: () => import(/* webpackChunkName: "about" */ '../views/Dashboard.vue')
  },
  {
    path: '/system',
    name: 'System',
    component: () => import(/* webpackChunkName: "about" */ '../views/System.vue')
  },
  {
    path: '/node',
    name: 'Node',
    component: () => import(/* webpackChunkName: "about" */ '../views/Node.vue')
  },
  {
    path: '/report',
    name: 'Report',
    component: () => import(/* webpackChunkName: "about" */ '../views/Report.vue')
  },
  {
    path: '/fru',
    name: 'FRU',
    component: () => import(/* webpackChunkName: "about" */ '../views/FRU.vue')
  },
  {
    path: '/remote',
    name: 'Remote',
    component: () => import(/* webpackChunkName: "about" */ '../views/Remote.vue')
  },
  {
    path: '/image',
    name: 'Image',
    component: () => import(/* webpackChunkName: "about" */ '../views/Image.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
