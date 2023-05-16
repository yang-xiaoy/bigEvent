import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/global.less'
ElementUI.Dialog.props.lockScroll.default = false

// 注意：在这里需要使用ElementUI框架
Vue.use(ElementUI)

Vue.config.productionTip = true

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
