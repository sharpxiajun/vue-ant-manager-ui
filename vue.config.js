/*
 * @Author: sharpxiajun 
 * @Date: 2020-11-20 20:03:42 
 * @Last Modified by: sharpxiajun
 * @Last Modified time: 2021-02-03 17:38:07
 */
require('babel-register')({
  presets: [
    [
      'env',
      {
        targets: {
          node: 'current'
        }
      }
    ]
  ]
})

const {
  chainWebpack,
  optimization,
  configureWebpack,
  config,
  styleVars
} = require('./build/')
const fcfg = require('./client/config/').default
const { IS_PROD, cdnOpt } = config

const path = require('path')
const getcsspath = filename => path.resolve(__dirname, `./client/assets/less/${filename}.less`)

module.exports = {
  outputDir: './server/dist',
  // 如果你不需要使用eslint，把lintOnSave设为false即可
  lintOnSave: !IS_PROD,
  // 设为false打包时不生成.map文件
  productionSourceMap: false,
  devServer: {
    port: 28080,
    useLocalIp: true,
    open: true,
    overlay: {
      warnings: true,
      errors: true
    },
    proxy: fcfg.proxy
  },
  // 标签上启用 Subresource Integrity, 提供CDN额外的安全性
  integrity: cdnOpt.need,
  chainWebpack(config) {
    // 删除预加载
    // config.plugins.delete('preload');
    // config.plugins.delete('prefetch')
    chainWebpack(config)
  },
  configureWebpack(config) {
    config.entry.app = './client/main.js'
    if (cdnOpt.need && IS_PROD) {
      config.externals = cdnOpt.externals
    }
    configureWebpack(config)
    return {
      optimization,
      resolve: { extensions: ['.ts', '.tsx', '.js', '.json'] },
      module: {
        rules: [
          {
            test: /\.tsx?$/,
            loader: 'ts-loader',
            exclude: /node_modules/,
            options: {
              appendTsSuffixTo: [/\.vue$/]
            }
          }         
        ]
      }
    }
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
        getcsspath('var'),
        getcsspath('mixins')
        // path.resolve(__dirname, './node_modules/ant-design-vue/es/style/themes/default.less')
      ]
    }
  }
}
