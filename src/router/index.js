import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('../components/Layout.vue'),
    redirect: '/home',
    children:[
      {
        path: '/home',
        component: () => import('../components/pages/home/Index.vue')
      },
      {
        path: '/admin',
        component: () => import('../components/pages/admin/Index.vue')
      },
      {
        path: '/menu',
        component: () => import('../components/pages/menu/Index.vue')
      },
      {
        path: '/role',
        component: () => import('../components/pages/role/Index.vue')
      }
    ]
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