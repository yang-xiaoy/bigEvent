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

// 格式化日期对象插件
import dayjs from 'dayjs'

// 定义时间格式化函数，在Vue原型上
Vue.prototype.$formatDate = (dateObj) => {
  return dayjs(dateObj).format('YYYY-MM-DD HH:MM:ss')
}

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
