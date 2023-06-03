import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { Message } from 'element-ui'

export const baseURL = 'http://big-event-vue-api-t.itheima.net'
const myAxios = axios.create({
  baseURL: baseURL
})

/**
 * 定义请求拦截器
 *  请求拦截器的作用是，因为在除了login和register的页面不需要token之外，其余页面都需要带token，如果写完请求拦截携带token，后面请求接口就可以不用携带token
 */
myAxios.interceptors.request.use(
  function (config) {
    // 判断，登录页和注册页不需要token，其余的页面需要token
    if (store.state.token) {
      config.headers.Authorization = store.state.token
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

/**
 * 定义响应拦截器
 */
myAxios.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    if (error.response.status === 401) {
      // 本次响应是 token 过期了
      // 1. 需要返回到登录页面重新登录
      // 2. 还需要清空vuex里面的token，过期token，这个相当于是被动退出登录
      store.commit('updateToken', '')
      store.commit('updateUserInfo', {})
      router.push('/login')
      Message.error('用户身份已过期，请重新登录！！！') // 提示未弹出
    }
    return Promise.reject(error)
  }
)
export default myAxios
