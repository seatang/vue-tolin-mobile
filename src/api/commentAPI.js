/**
 * 评论接口
 */
import request from '@/utils/request'

// 获取文章列表或评论回复列表
export const getComments = ({
  isType = true, // true为获取文章评论， false 为获取评论回复
  source,
  offset = null, // 为空，axios不会发送
  limit = 10 // 每页大小
}) => {
  return request({
    method: 'GET',
    url: '/app/v1_0/comments',
    params: {
      type: isType ? 'a' : 'c', // 评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
      source, // 源id，文章id或评论id
      offset, // 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
      limit // 获取的评论数据个数，不传表示采用后端服务设定的默认每页数据量
    }
  })
}

// 对评论进行点赞
export const likings = (commentId) => {
  return request({
    method: 'POST',
    url: '/app/v1_0/comment/likings',
    data: {
      target: commentId
    }
  })
}
// 取消评论进行点赞
export const unLikings = (commentId) => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/comment/likings/${commentId}`
  })
}
