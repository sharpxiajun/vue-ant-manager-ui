const officegen = require('officegen')
const fs = require('fs')
const path = require('path')

const createWord = () => {
  const docx = officegen('docx')
  docx.on('finalize', function (written) {
    console.log('word创建完成.')
  })
  docx.on('error', function (err) {
    console.log(err)
  })
  // Create a new paragraph: 
  let pObj = docx.createP()
  pObj.addText('Simple')
  pObj.addText(' with color', { color: '000088' })
  pObj.addText(' and back color.', { color: '00ffff', back: '000088' })

  pObj = docx.createP()

  pObj.addText('Since ')
  pObj.addText('officegen 0.2.12', {
    back: '00ffff',
    shdType: 'pct12',
    shdColor: 'ff0000'
  })

  // Use pattern in the background.
  pObj.addText(' you can do ')
  pObj.addText('高亮 ', { highlight: true }) // Highlight!
  pObj.addText('填充!', { highlight: 'darkGreen' }) // Different highlight color.

  pObj = docx.createP()
  // 添加一个链接
  pObj.addText('这是一个链接 ')
  pObj.addText('点我', { underline: true, color: '000088', link: 'https://github.com' })
  pObj.addText('!')

  pObj = docx.createP()
  pObj.addText('加粗—+下划线', { bold: true, underline: true })

  pObj = docx.createP({ align: 'center' })

  pObj.addText('加边框', {
    border: 'dotted',
    borderSize: 12,
    borderColor: '88CCFF'
  })

  pObj = docx.createP()
  pObj.options.align = 'right'

  pObj.addText('Align this text to the right.')

  pObj = docx.createP()

  pObj.addText('Those two lines are in the same paragraph,')
  pObj.addLineBreak()// 换行
  pObj.addText('but they are separated by a line break.')

  docx.putPageBreak()//换页

  pObj = docx.createP()

  pObj.addText('Fonts face only.', { font_face: 'Arial' })
  pObj.addText(' 换字体并加大.', { font_face: 'Arial', font_size: 40 })

  pObj = docx.createP({align: 'center'})
  // pObj.options.align = 'center'
  pObj.addText('学生信息', { bold: true, font_face: 'Arial', font_size: 18 })
  let tableStyle = {
    tableColWidth: 2400,
    tableSize: 24,
    tableColor: "ada",
    tableAlign: "center",
    tableVAlign: "center",
    tableFontFamily: "Comic Sans MS",
    borders: true
  }
  let table = [
    [{
      val: '姓名',
      opts: {
        align: "center",
        vAlign: "center",
        sz: '36'
      }
    }, {
      val: '性别',
      opts: {
        align: "center",
        vAlign: "center",
        sz: '36',
      }
    }, {
      val: '年龄',
      opts: {
        align: "center",
        vAlign: "center",
        sz: '36',
      }
    }]
  ]

  let student1 = ['李四', '男', 12]
  let student2 = ['李四2', '男', 28]
  table.push(student1, student2)
  // 表格
  docx.createTable(table, tableStyle)

  docx.putPageBreak()

  pObj = docx.createP()   

  // // 添加图片
  pObj.addImage(path.resolve(__dirname, './logo.png'))

  return docx
}

const docService = {
  createLocalWord() {
    const docx = createWord()

    /* 服务器生成文件 */
    let out = fs.createWriteStream('./example.docx')

    out.on('error', function (err) {
      console.log(err)
    })

    // Async call to generate the output file:
    docx.generate(out) 
  },
  downloadWord() {
    const docx = createWord()

    /* 服务器生成文件 */
    let out = fs.createWriteStream('./example.docx')

    out.on('error', function (err) {
      console.log(err)
    })

    // Async call to generate the output file:
    docx.generate(out) 
  }
}

module.exports = docService