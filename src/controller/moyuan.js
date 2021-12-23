/**
 * create by zhangxiang on 2021-12-17 22:18
 * 类注释：墨缘文学
 * 备注：
 */
const Http = require('../http/moyuan')
const cheerio = require('cheerio')

/**
 * 根据名称作者查询图书
 * @param name
 * @returns {Promise<*[]>}
 */
const search = async (name) => {
  const res = await Http.get('/book/Search.aspx', {params: {id: name}})
  const $ = cheerio.load(res)
  const bookArr = []
  $(".wraptwo .titone").each(function (i, el) {
    const obj = {}
    obj.menuUrl = $(el).find('.width369 a').attr('href')
    obj.name = $(el).find('.width369 a').text()
    obj.author = $(el).find('.width111').text()
    obj.from = '墨缘文学'
    obj.imgUrl = ""
    bookArr.push(obj)
  });
  return bookArr
}

/**
 * 获取图书章节
 * @param menuUrl
 * @returns {Promise<{}>}
 */
const getMenuList = async (menuUrl) => {
  let res = await Http.get(menuUrl)
  let $ = cheerio.load(res)
  const bookDetail = {}
  const info = {}
  const arr = []
  info.imgUrl = 'http:' + $('.box .ll1 .pic img').attr('src')
  info.name = $('.box .l2 h1').text()
  info.disc = $('.box .l2 .txt').text().replace(/\t/g, '').replace(/\n/g, '').toString().trim()
  info.status = ""
  info.last = {
    url: $('.box .l2 .la a').attr('href'),
    from: '墨缘文学',
    name: $('.box .l2 .la a').text()
  }

  menuUrl = $('.b2 .box .tit a').attr('href')
  res = await Http.get(menuUrl)
  $ = cheerio.load(res)

  $('.chapterList .chaper0').each(function (i, el) {
    const obj = {}
    obj.url = $(el).find('a').attr('href')
    obj.name = $(el).find('a').text()
    obj.from = '墨缘文学'
    arr.push(obj)
  })
  bookDetail.info = info
  bookDetail.list = arr
  return bookDetail
}

/**
 * 获取章节详情
 * @param detailUrl
 * @returns {Promise<{}>}
 */
const getBookDetail = async (detailUrl) => {
  const res = await Http.get(detailUrl)
  const $ = cheerio.load(res.toString())
  const detail = {}
  const arr = []
  $('.tb .txt').html().split('<br>').map(item => {
    item.toString().trim() && arr.push(item.toString().trim())
  })
  detail.title = $('.tb h2').text()
  detail.detail = arr
  detail.from = '墨缘文学'
  detail.previewUrl = $('.r_tools .l a').attr('href').indexOf('Index.htm') === -1 ? $('.r_tools .l a').attr('href') : ''
  detail.nextUrl = $('.r_tools .r a').attr('href').indexOf('Index.htm') === -1 ? $('.r_tools .r a').attr('href') : ''
  return detail
}

module.exports = {
  search,
  getMenuList,
  getBookDetail,
}
