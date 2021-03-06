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

// 对文章不喜欢
export const dislikesArticle = (articleId) => {
  return request({
    method: 'POST',
    url: '/app/v1_0/article/dislikes',
    data: {
      target: articleId
    }
  })
}
// 取消对文章不喜欢
export const unDislikesArticle = (articleId) => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/article/dislikes/${articleId}`
  })
}
/**
 * 举报文章
 * articleId:文章id
 * type：举报类型 0-其他问题，1-标题夸张，2-低俗色情，3-错别字多，4-旧闻重复，5-广告软文，6-内容不实，7-涉嫌违法犯罪，8-侵权'
 * remark：其他问题 的附加说明
 *  */
export const reportsArticle = ({ articleId, type, remark }) => {
  return request({
    method: 'POST',
    url: '/app/v1_0/article/reports',
    data: {
      target: articleId,
      type,
      remark
    }
  })
}

/**
 * 获取文章详细信息
 */
export const getArticleItem = articleId => {
  return request({
    method: 'GET',
    url: '/app/v1_0/articles/' + articleId
  })
}

/**
 * 点赞文章
 */
export const likings = articleId => {
  return request({
    method: 'POST',
    url: '/app/v1_0/article/likings',
    data: {
      target: articleId
    }
  })
}

/**
 * 取消点赞文章
 */
export const unLikings = articleId => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/article/likings/${articleId}`
  })
}
