/*
 * @Author: sharpxiajun 
 * @Date: 2021-02-03 15:50:28 
 * @Last Modified by: sharpxiajun
 * @Last Modified time: 2021-02-03 17:47:00
 */
const TerserPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const { IS_PROD } = require('./config')

module.exports = {
  minimize: IS_PROD,
  minimizer: [
    // 压缩js
    new TerserPlugin({
      parallel: true,
      terserOptions: {
        warnings: false,
        // https://github.com/terser/terser#compress-options
        compress: {
          // 移除console.*
          drop_console: true,
          drop_debugger: true
          // pure_funcs: ['console.log'] // 移除console.log
        }
      }
    }),
    // 优化样式文件，去重、压缩等处理，无效？？
    new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: [
          'default',
          {
            discardComments: {
              removeAll: true
            },
            normalizeUnicode: false
          }
        ]
      },
      // 是否打印处理过程中的日志
      canPrint: false
    })
  ],
  // 分割文件
  splitChunks: {
    minChunks: 1,
    chunks: 'all',
    maxInitialRequests: 5,
    minSize: 30000,
    cacheGroups: {
      // highlight: {
      //   test: /highlight\.js/,
      //   name: 'highlight',
      //   priority: 1
      // }
    }
  }
}