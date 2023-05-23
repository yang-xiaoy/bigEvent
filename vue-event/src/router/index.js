import store from '@/store'
import Vue from 'vue'
import VueRouter from 'vue-router'
// import RouterConfig from './config'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/login'
  },
  {
    path: '/',
    component: () => import('@/views/home/home.vue'),
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: () => import('@/views/mains/mains.vue')
      },
      {
        path: 'user-info',
        component: () => import('@/views/user/userinfo.vue')
      },
      {
        path: 'user-avatar',
        component: () => import('@/views/user/userAvatar.vue')
      },
      {
        path: 'user-pwd',
        component: () => import('@/views/user/userPwd.vue')
      },
      {
        path: 'art-cate',
        component: () => import('@/views/article/articleCate.vue')
      },
      {
        path: 'art-list',
        component: () => import('@/views/article/articleList.vue')
      }
    ]
  },
  {
    path: '/register',
    component: () => import('@/views/register/register.vue')
  },
  {
    path: '/login',
    component: () => import('@/views/login/login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

const whiteList = ['/login', '/register']
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
    // configRouter()
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

/**
 * 定义遍历路由函数
 * 这个位置我是想采用遍历子路由的方式，将子路由追加到父组件中
 */
// const configRouter = () => {
//   // 遍历子路由（config.js文件中配置的子路由）
//   RouterConfig.forEach((item) => {
//     // 使用router.addRoute()方法，添加子路由给home组件
//     router.addRoute('home', item)
//   })
// }

export default router
