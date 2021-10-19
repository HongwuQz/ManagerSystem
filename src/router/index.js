import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('../components/Layout.vue')
  },
  {
    path:'/login',
    component: () => import('../components/Login.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
