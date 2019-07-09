import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'vant/lib/index.css'
import '@/styles/index.less'

import 'amfe-flexible'
// 全部引入，后续再按需引入
import Vant from 'vant'
Vue.use(Vant)

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
