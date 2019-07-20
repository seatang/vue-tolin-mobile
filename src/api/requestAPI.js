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

// 编辑用户个人资料，上传图片为base64格式
export const updateUserProfile = ({
  name = null,
  photo = null,
  gender = null,
  birthday = null,
  realName = null,
  idNumber = null,
  idCardFront = null,
  idCardBack = null,
  idCardHandheld = null,
  intro = null
}) => {
  return request({
    method: 'GET',
    url: `/app/v1_0/user/profile`,
    data: {
      name, // string非必须昵称
      photo, // string非必须头像base64编码处理
      gender, // intege非必须性别，0-男，1-女
      birthday, // string非必须生日，格式'2018-12-20'
      real_name: realName, // string 非必须真实姓名
      id_number: idNumber, // string 非必须身份证号
      id_card_front: idCardFront, // string非必须身份证正面照片base64编码处理
      id_card_back: idCardBack, // string非必须身份证背面照片base64编码处理
      id_card_handheld: idCardHandheld, // string非必须手持身份证照片base64编码处理
      intro
    }
  })
}
