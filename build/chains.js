const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

// 设置别名
function setResolve(config) {
  config.resolve.alias
    .set('@', resolve('../src'))
    .set('@c', resolve('../src/components'))
}

// 设计项目的title
const setTitle = config => {
  config
    .plugin('html')
    .tap(args => {
      args[0].title= 'Vue Ant Design 管理系统框架'
      return args
    })
}

function chainWebpack(config) {
  setResolve(config)
  setTitle(config)
}

module.exports = chainWebpack