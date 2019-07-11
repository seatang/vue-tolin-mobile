/**
 * 文章接口api
 */
import request from '@/utils/request'

// 获取文章列表
export const getArticlesList = ({ channelId, timestamp, withTop }) => {
  return request({
    method: 'GET',
    url: '/app/v1_1/articles',
    params: {
      channel_id: channelId,
      timestamp,
      with_top: withTop
    }
  })
}
