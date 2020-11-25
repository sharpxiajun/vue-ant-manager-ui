const router = require('koa-router')()

const doc = require('./doc')

router.use('/doc', doc.routes(), doc.allowedMethods())

module.exports = router