const fs = require('fs')
const docService = require('../service/docService')

module.exports = {
  async createDoc(ctx) {
    docService.createWordFile()
    ctx.body = {
      success: true,
      message: 'Word文档创建测试!',
      data: null      
    }
  },
  async downloadDoc(ctx) {
    docService.downloadWord()
    ctx.set('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')
    ctx.set('Content-disposition', 'attachment; filename=out-' + new Date().getTime() + '.docx')
    ctx.body = await fs.createReadStream('./example.docx')
  }
}