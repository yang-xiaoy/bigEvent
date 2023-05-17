import axios from 'axios'
import store from '@/store'

const myAxios = axios.create({
  baseURL: 'http://big-event-vue-api-t.itheima.net'
})

// 请求拦截器
// 请求拦截器的作用是，因为在除了login和register的页面不需要token之外，其余页面都需要带token，如果写完请求拦截携带token，后面请求接口就可以不用携带token
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
export default myAxios
