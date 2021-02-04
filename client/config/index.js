/*
 * @Author: sharpxiajun 
 * @Date: 2021-02-03 17:32:45 
 * @Last Modified by:   sharpxiajun 
 * @Last Modified time: 2021-02-03 17:32:45 
 */
const styleVars = require('../../build/style-vars')
const isDev = process.env.NODE_ENV === 'development'
const prefix = '/api'
export default {
  isDev,
  // 项目名称
  name: 'Vue Ant Design 管理系统框架',
  homeName: 'home',
  baseurl: prefix,
  proxy: {
    [prefix]: {
      target: 'http://localhost:9876',
      changeOrigin: true
    }
  },
  // 前后端交互时标记请求状态是否成功的字段
  markStatus: {
    key: 'errcode',
    msgKey: 'message',
    success: 0
  },
  styleVars,
  provide: {
    autoInsertSpaceInButton: false,
    prefixCls: styleVars['ant-prefix']
  }
}