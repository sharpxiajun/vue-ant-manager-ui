/*
 * @Author: sharpxiajun 
 * @Date: 2020-11-20 20:03:42 
 * @Last Modified by: sharpxiajun
 * @Last Modified time: 2020-11-20 22:32:01
 */
const {
  chainWebpack,
  styleVars,
  config
} = require('./build/')

const { IS_PROD } = config

const path = require('path')

module.exports = {
  outputDir: process.env.outputDir,
  // 如果你不需要使用eslint，把lintOnSave设为false即可
  lintOnSave: !IS_PROD,
  // 设为false打包时不生成.map文件
  // productionSourceMap: false,
  devServer: {
    port: 28080,
    useLocalIp: true,
    open: true,
    overlay: {
      warnings: true,
      errors: true
    }
  },
  chainWebpack(config) {
    chainWebpack(config)
  },
  css: {
    loaderOptions: {
      less: {
        modifyVars: styleVars,
        javascriptEnabled: true
      }
    }
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.resolve(__dirname, './node_modules/ant-design-vue/es/style/themes/default.less')
      ]
    }
  }
}
