import axios from 'axios'
import qs from 'qs'
import config from '@/config'

// 创建axios实例
const service = axios.create({
  baseURL: config.baseurl,
  // timeout: 30000, // 请求超时时间
  headers: {
    Accept: 'application/json',
    // 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
    // 'Content-Type': 'application/json; charset=utf-8'
  }
})

// request拦截器
service.interceptors.request.use(config => {
  if (config.formData) config.headers['Content-Type'] = 'multipart/form-data'
  // Do something before request is sent
  if (config.headers['Content-Type'] !== 'multipart/form-data') {
    if (['post', 'put', 'patch', 'delete'].includes(config.method)) {
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=utf-8'
      if (!config.data) {
        config.data = {}
      }
      config.data = qs.stringify(config.data)
    }
  }
  return config  
}, error => {
  console.error(error) // for debug
  return Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => response.data,
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 500:
          /** 服务端报错 **/
          router.replace({
            path: '/error/500'
          })
          break
      }
    }
    console.error('Error', error)
    return Promise.reject(error)    
  }
)

export default service