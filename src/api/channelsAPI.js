import request from '@/utils/request'

// 获取频道列表
export const getchannelsList = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/channels'
  })
}
