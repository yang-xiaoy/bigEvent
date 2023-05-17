import request from '@/utils/request.js'
// 引入 store 对象
// import store from '@/store/index.js'

/**
 * 注册用户API
 * @param {*} param0
 * @returns
 */
export const registerAPI = ({ username, password, repassword }) => {
  return request({
    url: '/api/reg',
    method: 'POST',
    data: {
      username,
      password,
      repassword
    }
  })
}

/**
 * 用户登录API
 * @param {*} param0
 * @returns
 */
export const loginAPI = ({ username, password }) => {
  return request({
    url: '/api/login',
    method: 'POST',
    data: {
      username,
      password
    }
  })
}

/**
 * 获取用户信息，存储到vuex中
 * @returns
 */
export const getUserInfoAPI = () => {
  return request({
    url: '/my/userinfo'
    // 传参给后台三种情况：
    // 1. 传请求头，使用header
    // 2. params，传查询字符串query
    // 3. data，body请求体
    // headers: {
    //   // 注意：在这个位置不能使用 this.$store.state.token，因为this.$store的this指的是组件的对象，现在这里是js。
    //   Authorization: store.state.token
    // }
  })
}

/**
 * 请求菜单数据
 * @returns
 */
export const getMenuListAPI = () => {
  return request({
    url: '/my/menus'
    // headers: {
    //   Authorization: store.state.token
    // }
  })
}

// export const getListAPI = () => {
//   return request({
//     url: 'http://geek.itheima.net/v1_0/channels'
//   })
// }
