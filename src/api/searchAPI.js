import request from '@/utils/request'

/**
 * 获取联想建议（自动补全）
 * q:搜索关键字
 */
export const getSuggestion = (q) => {
  return request({
    method: 'GET',
    url: '/app/v1_0/suggestion',
    params: {
      q
    }
  })
}

/**
 * 获取联想建议（自动补全）
 * page:页数，不传默认为1
 * per_page:每页数量，不传每页数量由后端决定
 * q:搜索关键字
 */
export const getSearch = ({ page, q, perPage }) => {
  return request({
    method: 'GET',
    url: '/app/v1_0/search',
    params: {
      page,
      per_page: perPage,
      q
    }
  })
}
