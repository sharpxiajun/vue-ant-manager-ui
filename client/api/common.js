import fetch from '@/libs/fetch'

// 获取用户信息
export const getUserinfo = (data = {}) => {
  return fetch({
    url: '/getUserInfo',
    method: 'get',
    params: data
  })  
}

// 获取项目列表
export const getProjectList = (data = {}) => {
  return fetch({
    url: '/getProjectList',
    method: 'get',
    params: data
  })
}