import axios from 'axios'
import store from '@/store'
import JSONbig from 'json-bigint'
import router from '@/router'

const request = axios.create({
  // baseURL: 'http://toutiao.course.itcast.cn'
  baseURL: 'http://ttapi.research.itcast.cn/'
})
// 重新创建一个axios请求，用于刷新token令牌
const refreshToken = axios.create({
  // baseURL: 'http://toutiao.course.itcast.cn'
  baseURL: 'http://ttapi.research.itcast.cn/'
})
// 处理后台返回数据超出js安全数字范围
request.defaults.transformResponse = [function (data) {
  try {
    // 如果是 json 格式字符串，那就转换并返回给后续使用
    return JSONbig.parse(data)
  } catch (err) {
    // 报错就意味着 data 不是 json 格式字符串，这里就直接原样返回给后续使用
    return data
  }
}]

// 请求拦截器
request.interceptors.request.use(function (config) {
  const { user } = store.state
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

// 响应拦截器
request.interceptors.response.use(function (response) {
  return response.data.data || response.data
}, async (error) => {
  // 拦截响应状态码为401
  if (error.response && error.response.status === 401) {
    const { user } = store.state
    // 判断用户是否登录，没有登录直接跳转到登录页
    if (!user) {
      return router.push({ name: 'login' })
    }
    // 如果用户已登录，需要刷新token令牌
    try {
      const res = await refreshToken({
        method: 'PUT',
        url: '/app/v1_0/authorizations',
        headers: {
          Authorization: `Bearer ${user.refresh_token}`
        }
      })
      // 将重新获取的token更新到本地
      store.commit('changUser', {
        token: res.data.data.token,
        refresh_token: user.refresh_token
      })
      // 将请求失败的请求，重新发起请求
      return request(error.config)
    } catch (error) {
      return router.push({ name: 'login' })
    }
  }
  return Promise.reject(error)
})

export default request
