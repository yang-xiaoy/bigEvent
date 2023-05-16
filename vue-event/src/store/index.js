import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import { getUserInfoAPI } from '@/api/index.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 1. 用来存储登录成功之后，得到token值
    token: '',
    // 定义对象保存用户信息
    userInfo: {}
  },
  getters: {
    // 简写的形式
    // username: state => state.userInfo.username
    username(state) {
      return state.userInfo.username
    },
    nickname(state) {
      return state.userInfo.nickname
    },
    user_pic(state) {
      return state.userInfo.user_pic
    }
  },
  mutations: {
    // 2. 更新token的mutations函数
    updateToken(state, newToken) {
      state.token = newToken
    },
    updateUserInfo(state, val) {
      state.userInfo = val
    }
  },
  actions: {
    // 请求用户信息
    async getUserInfoAction(store) {
      const res = await getUserInfoAPI()
      console.log(res)
      store.commit('updateUserInfo', res.data.data)
    }
  },
  modules: {},
  // 配置vuex持久化插件
  plugins: [createPersistedState()]
})
