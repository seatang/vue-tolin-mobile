// 加载第三方时间处理包，时间过滤器
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'
dayjs.extend(relativeTime)
dayjs.locale('zh-cn')

export default (value) => {
  return dayjs().from(dayjs(value))
}
