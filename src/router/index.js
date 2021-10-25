import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

Vue.use(VueRouter)

const router = new VueRouter({
  routes:[
    {
      path: '/',
      component: () => import('../components/Layout.vue'),
      redirect: '/home',
      meta:{loginAuthRequired: true},
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
          path: '/menu/add',
          component: () => import('../components/pages/menu/Edit.vue')
        },
        {
          path: '/menu/:id',
          component: () => import('../components/pages/menu/Edit.vue')
        },
        {
          path: '/role',
          component: () => import('../components/pages/role/Index.vue')
        },
        {
          path: '/role/add',
          component: () => import('../components/pages/role/Edit.vue')
        },
        {
          path: '/role/:id',
          component: () => import('../components/pages/role/Edit.vue')
        },
        {
          path: '/admin',
          component: () => import('../components/pages/admin/Index.vue')
        },
        {
          path: '/admin/add',
          component: () => import('../components/pages/admin/Edit.vue')
        },
        {
          path: '/admin/:id',
          component: () => import('../components/pages/admin/Edit.vue')
        },
      ]
    },
    {
      path:'/login',
      component: () => import('../components/Login.vue')
    }
  ]
})

// 路由守卫防止XSS攻击
router.beforeEach( (to,from,next) => {
  console.log(to)
  // 判断会匹配的路由中是否存在需要登陆验证的路由地址
  if (to.matched.some(item => item.meta.loginAuthRequired)){
    
    // 如果存在，则判断是否有登陆认证token
    if(store.state.userInfo.token){
      next()
    }else{
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      })
    }
  }
  next()
})

const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location){
  return originalPush.call(this,location).catch(err => err)
}

export default router
