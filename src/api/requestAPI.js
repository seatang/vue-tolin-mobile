import request from '@/utils/request'

// 登录
export const login = ({ mobile, code }) => {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data: {
      mobile,
      code
    }
  })
}

// 拉黑用户
export const blacklists = (autId) => {
  return request({
    method: 'POST',
    url: '/app/v1_0/user/blacklists',
    data: {
      target: autId
    }
  })
}

// 关注用户
export const followingsUser = (userId) => {
  return request({
    method: 'POST',
    url: '/app/v1_0/user/followings',
    data: {
      target: userId
    }
  })
}

// 取消关注用户
export const unfollowingsUser = (userId) => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/followings/${userId}`
  })
}

// 获取用户自己信息
export const getUserself = () => {
  return request({
    method: 'GET',
    url: `/app/v1_0/user`
  })
}

// 获取用户自己信息
export const getUserProfile = () => {
  return request({
    method: 'GET',
    url: `/app/v1_0/user/profile`
  })
}
