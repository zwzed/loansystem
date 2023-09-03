import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/normalize.css';
import ElementUI, { Table } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 处理table宽度报错问题
const fixElTableErr = table => {
  const oldResizeListener = table.methods.resizeListener
  table.methods.resizeListener = function () {
    window.requestAnimationFrame(oldResizeListener.bind(this))
  }
}

fixElTableErr(Table)

Vue.config.productionTip = false
Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
