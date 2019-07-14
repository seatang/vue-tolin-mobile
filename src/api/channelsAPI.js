/**
 * 频道接口api
 */
import request from '@/utils/request'

// 获取频道列表
export const getUserChannelsList = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/channels'
  })
}
// 获取全部频道列表
export const getAllChannelsList = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/channels'
  })
}

/**
 * 增加全部用户频道
 * id:频道id（integer）
 * seq:频道顺序序号（integer）
 */
export const addUserAllChannelsList = ([{ id, seq }]) => {
  return request({
    method: 'POST',
    url: '/app/v1_0/user/channels',
    data: {
      id,
      seq
    }
  })
}

/**
 * 删除用户频道
 * target:频道id（integer）
 */
export const deleteUserChannel = target => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/channels/${target}`
  })
}

/**
 * 批量修改用户频道列表（部分覆盖）
 * channels:[]
 * id:频道的id
 * seq：频道的序号
 */
export const updateUserChannels = channels => {
  return request({
    method: 'PATCH',
    url: `/app/v1_0/user/channels`,
    data: {
      channels
    }
  })
}
