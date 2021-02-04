import fetch from '@/libs/fetch'

// 获取用户信息
export const getUserinfo = (data = {}) => {
  return fetch({
    url: '/getUserInfo',
    method: 'get',
    params: data
  })  
}