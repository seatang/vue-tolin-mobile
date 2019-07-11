import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'vant/lib/index.css'
import '@/styles/index.less'
// 引入第三方表单校验
import VeeValidate, { Validator } from 'vee-validate'
import zhCN from 'vee-validate/dist/locale/zh_CN'

import 'amfe-flexible'
// 全部引入，后续再按需引入
import Vant from 'vant'
Vue.use(Vant)

Vue.use(VeeValidate, {
  events: ''
})
Validator.localize('zh_CN', zhCN)

// 定义全局定时器，控制数据加载
Vue.prototype.$sleep = time => {
  return new Promise((resolve, reject) => {
    setTimeout(() => { resolve() }, time)
  })
}

// import { Button, Field, CellGroup, Icon, Toast, Loading } from 'vant'

// Vue
//   .use(Button)
//   .use(Field)
//   .use(CellGroup)
//   .use(Icon)
//   .use(Toast)
//   .use(Loading)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
