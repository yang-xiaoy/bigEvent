import request from '@/utils/request.js'
// 引入 store 对象
// import store from '@/store/index.js'

/**
 * 注册用户API
 * @param {*} param0
 * @returns promise 对象
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
 * @returns promise 对象
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
 * @returns promise 对象
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
 * @returns promise 对象
 */
export const getMenuListAPI = () => {
  return request({
    url: '/my/menus'
    // headers: {
    //   Authorization: store.state.token
    // }
  })
}

/**
 *  更新用户信息
 * @param {*} param0
 * @returns promise 对象
 */
export const updateUserInfoAPI = ({
  id,
  username,
  nickname,
  email,
  user_pic
}) => {
  return request({
    url: '/my/userinfo',
    method: 'PUT',
    data: {
      id,
      username,
      nickname,
      email,
      user_pic
    }
  })
}

/**
 * 更新用户头像
 * @param {*} avatar : 用户头像
 * @returns promise 对象
 */
export const updataUserAvatarAPI = (avatar) => {
  return request({
    url: '/my/update/avatar',
    method: 'PATCH',
    data: {
      avatar
    }
  })
}

/**
 * 修改用户密码
 * @param {*} param0 { old_pwd：原密码, new_pwd:新密码, re_pwd:确认新密码 }
 * @returns promise 对象
 */
export const updatePwdAPI = ({ old_pwd, new_pwd, re_pwd }) => {
  return request({
    url: '/my/updatepwd',
    method: 'PATCH',
    data: {
      old_pwd,
      new_pwd,
      re_pwd
    }
  })
}

/**
 * 获取文章分类，默认请求类型get
 * @returns promise 对象
 */
export const getArtCateListAPI = () => {
  return request({
    url: '/my/cate/list'
  })
}

/**
 * 新增文章分类
 * @param {*} param0 { cate_name:文章分类名称, cate_alias:文章分类别名 }
 * @returns promise 对象
 */
export const addArtCateAPI = ({ cate_name, cate_alias }) => {
  return request({
    url: '/my/cate/add',
    method: 'POST',
    data: {
      cate_name,
      cate_alias
    }
  })
}

/**
 * 修改文章分类
 * @param {*} param0 { id:文章分类ID, cate_name:文章分类名称, cate_alias:文章分类别名 }
 * @returns promise 对象
 */
export const updateArtCateAPI = ({ id, cate_name, cate_alias }) => {
  return request({
    url: '/my/cate/info',
    method: 'PUT',
    data: {
      id,
      cate_name,
      cate_alias
    }
  })
}

/**
 * 删除文章分类
 * @param {*} id 文章分类id
 * @returns promise 对象
 */
export const deleteArtCateAPI = (id) => {
  return request({
    url: '/my/cate/del',
    method: 'DELETE',
    params: {
      id
    }
  })
}

/**
 * 发布文章
 * @param {*} fd 表单对象
 * @returns promise 对象
 */
export const pusArticleAPI = (fd) => {
  return request({
    url: '/my/article/add',
    method: 'POST',
    data: fd
    // {} 如果是一个普通对象，axios会把它转成JSON字符串在请求体里交给后台
    // 这个接口文档要求请求体里是一个FormData类型（表单数据对象）携带文件给后台
  })
}
