import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 1. 用来存储登录成功之后，得到token值
    token: ''
  },
  getters: {},
  mutations: {
    // 2. 更新token的mutations函数
    updateToken(state, newToken) {
      state.token = newToken
    }
  },
  actions: {},
  modules: {},
  // 配置vuex持久化插件
  plugins: [createPersistedState()]
})
