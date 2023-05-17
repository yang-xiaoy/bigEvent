import store from '@/store'
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/login'
  },
  {
    path: '/register',
    component: () => import('@/views/register/index.vue')
  },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/home',
    component: () => import('@/views/home/index.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

const whiteList = ['/login', '/reg']
// 全局路由导航守卫
router.beforeEach((to, from, next) => {
  const token = store.state.token
  // 有token就证明登录了，否则就未登录
  if (token) {
    if (token && !store.state.userInfo.username) {
      // 本地有token值了，才回去请求用户信息
      // 这个位置还是不太懂，dispatch这个函数是干啥的，为什么要在这个位置调用用户信息呢？
      store.dispatch('getUserInfoAction')
    }
    next()
  } else {
    if (whiteList.includes(to.path)) {
      // 未登录可以访问的路由地址，则放行（路由全局前置守卫不会再次触发了，而是匹配路由表）
      next()
    } else {
      // 没有登录强制跳转到登录页面
      next('/login')
    }
  }
})

export default router
