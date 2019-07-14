import axios from 'axios'
import store from '@/store'
import JSONbig from 'json-bigint'

const request = axios.create({
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
}, function (error) {
  return Promise.reject(error)
})

export default request
