const router = require('koa-router')()

const docController = require('../controllers/doc')

const routers = router
  .get('/createDoc', docController.createDoc)
  .get('/downloadDoc', docController.downloadDoc)

module.exports = routers