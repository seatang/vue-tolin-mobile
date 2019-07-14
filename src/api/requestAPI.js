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
