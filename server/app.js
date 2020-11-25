/* eslint-disable */
const path = require('path')
const Koa = require('koa')
const koaBody = require('koa-body')
const session = require('koa-session')
const cors = require('koa2-cors')
const koaStatic = require('koa-static')

// 路由文件
const routers = require('./routes/index')

const app = new Koa()

// 解析 POST 请求
app.use(koaBody({
  multipart: true, // 支持文件上传
  jsonLimit: '5mb',
  formidable: {
    keepExtensions: true// 保持文件的后缀
  }
}))
app.keys = ['FastDataViusal act UI'];
const CONFIG = {
  key: 'FastDataVisual:sess',
  maxAge: 86400000,
  overwrite: true,
  httpOnly: false,
  signed: false,
  rolling: false,
  renew: false
}
app.use(session(CONFIG, app))

app.use(koaStatic(path.join(__dirname, '../public')))
app.use(cors({
  origin: (ctx) => {
    const origin = ctx.headers.origin  // 实际生产请根据具体情况来进行规则配置
    return origin
  }
}))

// 初始化路由中间件
app.use(routers.routes()).use(routers.allowedMethods())

app.listen(3000)