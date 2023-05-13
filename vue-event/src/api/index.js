import request from '@/utils/request.js'

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

// export const getListAPI = () => {
//   return request({
//     url: 'http://geek.itheima.net/v1_0/channels'
//   })
// }
