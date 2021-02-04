/*
 * @Author: sharpxiajun 
 * @Date: 2021-02-03 17:32:45 
 * @Last Modified by: sharpxiajun
 * @Last Modified time: 2021-02-04 16:15:44
 */
const styleVars = require('../../build/style-vars')
const isDev = process.env.NODE_ENV === 'development',
      yapi = 'http://39.98.200.240:9090/mock/329',
      // yapi = 'http://172.30.132.144:9095',
      productPrefix = process.env.VUE_APP_CURRENTMODE === 'demo' ? yapi : ''
export default {
  isDev,
  // 项目名称
  name: 'AntV UI Manager',
  homeName: 'home',
  baseurl: isDev ? yapi : productPrefix,
  proxy: {
    '/test': {
      target: 'http://39.98.200.240:9090/mock/329',
      // target: 'http://localhost:9876',
      changeOrigin: true,
      pathRewrite: {
        '^/test': '/'
      }
    }
  },
  // 前后端交互时标记请求状态是否成功的字段
  markStatus: {
    key: 'success',
    success: true,
    error: false
  },
  styleVars,
  provide: {
    autoInsertSpaceInButton: false,
    prefixCls: styleVars['ant-prefix']
  }
}