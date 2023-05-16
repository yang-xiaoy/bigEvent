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

// 全局路由导航守卫
router.beforeEach((to, from, next) => {
  const token = store.state.token
  if (token && !store.state.userInfo.username) {
    // 本地有token值了，才回去请求用户信息
    // 这个位置还是不太懂，dispatch这个函数是干啥的，为什么要在这个位置调用用户信息呢？
    this.$store.dispatch('getUserInfoAction')
  }
  next()
})

export default router
