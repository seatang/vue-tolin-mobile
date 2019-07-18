import store from '@/store'
import router from '@/router'
import { Dialog } from 'vant'

export default () => {
  const { user } = store.state
  if (user) {
    return true
  }
  Dialog.confirm({
    title: '操作提示',
    message: '该操作需要登录，是否登录'
  }).then(() => {
    // 确定，跳转到登录界面
    router.push({
      name: 'login',
      query: {
        redirect: router.currentRoute.fullPath
      }
    })
  }).catch(() => {
    // 取消，什么都不做
  })
}
