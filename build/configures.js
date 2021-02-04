/*
 * @Author: sharpxiajun 
 * @Date: 2021-02-03 14:15:42 
 * @Last Modified by: sharpxiajun
 * @Last Modified time: 2021-02-03 15:44:55
 */
/* eslint-disabled */
const { IS_PROD } = require('./config')
const { loadFonts, recoverFonturl } = require('./util')

// 在webpack compile.run执行之前做一些事
const doBeforeRun = config => {
  config.plugins.push({
    apply: compiler => {
      // https://webpack.docschina.org/api/plugins/
      // 这里使用VueLoaderPlugin作为插件名
      compiler.hooks.beforeRun.tap('VueLoaderPlugin', async compilation => {
        if (IS_PROD) {
          await loadFonts()
        } else {
          recoverFonturl()
        }
      })
    }
  })
}

const configureWebpack = config => {
  doBeforeRun(config)
  if (IS_PROD && !process.env.VUE_APP_CURRENTMODE) {
    // gzip(config)
  }
}

module.exports = configureWebpack