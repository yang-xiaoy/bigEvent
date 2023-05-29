import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// require element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/global.less'
import '@/assets/resize.css'

// require VueQuillEditor
import VueQuillEditor from 'vue-quill-editor'
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

ElementUI.Dialog.props.lockScroll.default = false
// 注意：在这里需要使用ElementUI框架
Vue.use(ElementUI)
// 此方法内会用Vue.commponent注册quillEditor名字全局组件
Vue.use(VueQuillEditor)

Vue.config.productionTip = true

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
