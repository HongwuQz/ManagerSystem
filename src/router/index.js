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
          path: '/user',
          component: () => import('../components/pages/admin/Index.vue')
        },
        {
          path: '/user/add',
          component: () => import('../components/pages/admin/Edit.vue')
        },
        {
          path: '/user/:id',
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
    store.dispatch('getLoginInfo')
    let userToken = store.state.userInfo.token
    if(userToken){
      next()
    }else{
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      })
    }
  }
  // 如果用户的token在缓存中已存在，则直接跳转到home
  if (to.fullPath === '/login') {
    if (sessionStorage.USERINFO && JSON.parse(sessionStorage.USERINFO).token) {
      next({
        path: '/home'
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

/**
 * bug1 :管理员先使用user网址，清除sessionStorage后。
 * 再用客服账号登陆依然可以看到系统管理页面
 */ 

/**
 * 如果用户已经登陆，直接输入/login路由还是会显示登录页面
 * 修复1：路由守卫中判断sessionStorage中是否有用户的token，有则直接跳转到home
 * 
 * 修复1延申bug：会导致退出登录不跳转页面
 * 猜测：由于EvenBus中退出登录→定向login页面部分的代码比清空USERINFO更早执行
 * 
 * 修复2：将$router.push语句放到removeItem后面
 */