/**
 * create by zhangxiang on 2021-12-12 20:39
 * 类注释：潇湘书院
 * 备注：
 */
const Http = require('../http/xiaoxiang')
const cheerio = require('cheerio')

/**
 * 根据名称作者查询图书
 * @param name
 * @returns {Promise<*[]>}
 */
const search = async (name) => {
  console.log(name)
  const res = await Http.get(`/search`, {params: {s_wd: name}})
  const $ = cheerio.load(res)
  const bookArr = []
  $(".search-result .result-list ul li").each(function (i, el) {
    const obj = {}
    obj.imgUrl ='http:'+ $(el).find('.commonbook img').attr('data-src')
    obj.menuUrl = $(el).find('.info h4 a').attr('href')
    obj.name = $(el).find('.info h4 a font').text()
    $(el).find('.info h4 .subtitle a').each(function (i, el) {
      if (i == 0)
        obj.author = $(el).text()
    })
    obj.from = '潇湘书院'
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
  const res = await Http.get(menuUrl)
  const $ = cheerio.load(res)
  const bookDetail = {}
  const info = {}
  const arr = []
  info.imgUrl = $('#sidebar #fmimg img').attr('src')
  info.name = $('#maininfo #info h1').text()
  info.disc = $('#maininfo #intro').text().replace(/\n/, '')
  $('#maininfo #info p').each(function (i, el) {
    if (i === 0)
      info.author = $(el).text().replace(/&nbsp;/g, '').trim()
    if (i === 1)
      info.status = $(el).text().replace(/&nbsp;/g, '').trim()
    if (i === 2)
      info.updataTime = $(el).text()
    if (i === 3)
      info.last = {
        url: $(el).find('a').attr('href'),
        from: '笔趣泡',
        name: $(el).find('a').text()
      }
  })
  $('.box_con #list dd').each(function (i, el) {
    const obj = {}
    obj.url = $(el).find('a').attr('href')
    obj.name = $(el).find('a').text()
    obj.from = '笔趣泡'
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
  $('#content p').each(function (i, el) {
    arr.push($(el).text())
  })
  detail.title = $('.bookname h1').text()
  detail.detail = arr
  $('.bookname .bottem1 a').each(function (i, el) {
    if (i === 0)
      detail.previewUrl = $(el).attr('href').indexOf('.html') != -1 ? $(el).attr('href') : ''
    if (i === 2)
      detail.nextUrl = $(el).attr('href').indexOf('.html') != -1 ? $(el).attr('href') : ""
  })
  return detail
}

module.exports = {
  search,
  getMenuList,
  getBookDetail,
}
