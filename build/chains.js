/*
 * @Author: sharpxiajun 
 * @Date: 2021-02-03 15:14:21 
 * @Last Modified by: sharpxiajun
 * @Last Modified time: 2021-02-03 17:22:13
 */
const chalk = require('chalk')
const log = console.log
const { resolve } = require('./util')
const { IS_PROD, cdnOpt } = require('./config')
const webpack = require('webpack')

// 设置别名
const setResolve = config => {
  config.resolve.alias
    .set('@', resolve('../client'))
    .set('@c', resolve('../client/components'))
}

// 设计项目的title
const setTitle = config => {
  config
    .plugin('html')
    .tap(args => {
      log(chalk.red(`setTitle:${args}`))
      args[0].title= 'AntV UI Manager'
      return args
    })
}

const setCdn = (config) => {
  // 生产环境或本地需要cdn时，才注入cdn
  if (IS_PROD && cdnOpt.need) {
    config.plugin('html').tap(args => {
      log(chalk.red(`setCdn:${args}`))
      args[0].cdn = cdnOpt
      return args
    })
  }
}

// 打包完后打开分析页面
const addPlugin = (config) => {
  if (IS_PROD) {
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
      .BundleAnalyzerPlugin
    // const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
    config.plugin('webpack-report').use(BundleAnalyzerPlugin, [
      {
        analyzerMode: 'static'
      }
    ])
    config
      .plugin('ignore')
      .use(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)) // 忽略/moment/locale下的所有文件
    // 这里不能使用，ant-design form表单组件有用到lodash的方法，这里优化后，会导致打包后form表单不能显示
    // config.plugin('loadshReplace').use(new LodashModuleReplacementPlugin()) //优化lodash
  }
}

const chainWebpack = config => {
  setResolve(config)
  setTitle(config)
  setCdn(config)
  addPlugin(config)
}

module.exports = chainWebpack