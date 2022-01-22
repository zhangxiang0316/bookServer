/**
 * create by zhangxiang on 2022-01-15 14:04
 * 类注释：幻听网
 * 备注：
 */

const Http = require('../../http/huanting')
const cheerio = require('cheerio')
const {authcode, base64_decode} = require('../../utils/huanting')

const search = async (name) => {
    let res = await Http.get(`/search.php?searchword=${encodeURI(name)}`)
    let $ = cheerio.load(res.toString())
    const bookArr = [];
    $('.container .row .col-lg-wide-75 .stui-pannel_bd .stui-vodlist__media .activeclearfix').each(function (i, el) {
        const book = {}
        book.menuUrl = $(el).find('.detail .title .a').attr('href')
        book.name = $(el).find('.detail .title .a').text()
        book.from = '幻听网'
        book.author = $(el).find('.yun-link .text .actor').text()
        book.imgUrl = $(el).find('.thumb .a').attr('data-original')
        bookArr.push(book)
    })
    return bookArr
}

/**
 * 获取章节列表
 * @param menuUrl
 * @returns {Promise<{}>}
 */
const getMenuList = async (menuUrl) => {
    const bookDetail = {}
    const info = {}
    let arr = []
    const res = await Http.get(menuUrl)
    let $ = cheerio.load(res.toString())
    info.imgUrl = 'https://www.ting38.com' + $('.stui-content__thumb .stui-vodlist__thumb img').attr('data-original')
    info.name = $('.stui-content__detail .title').text()
    info.author = $('.stui-content__detail .data').eq(2).text() + $('.stui-content__detail .data').eq(3).text()
    info.disc = $('.stui-content__detail .desc ').text().replace(/\t/g,'').replace(/\n/g,'')
    info.status = '状态' + $('.stui-content__thumb .stui-vodlist__thumb .pic-text').text()
    info.type = $('.stui-content__detail .data').first().text().replace(/\t/g,'').replace(/\n/g,'')
    $('.stui-pannel_bd').first().find('ul li').each(function (i, el) {
        const obj = {}
        obj.name = $(el).find('a').text()
        obj.url = $(el).find('a').attr('href')
        obj.from = '幻听网'
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
    let res = await Http.get(detailUrl)
    const $ = cheerio.load(res.toString())
    let detail = {}
    detail.title = $('.stui-pannel_bd .stui-content__playlist .playon a').text()
    detail.from = "幻听网"
    $('.stui-pannel-bd .stui-player script').map(function (i, el) {
        if (i == 0) {
            const text = $(this)[0].children[0].data
            const matchNext = text.match(/var now=(.*);/);
            const url = eval(matchNext[1].split(';')[0])
            detail.url = url
        }
    })
    detail.previewUrl = $('.stui-player__detail ul li').eq(2).find('a').attr('href')
    detail.nextUrl = $('.stui-player__detail ul li').eq(3).find('a').attr('href')
    return detail
}


module.exports = {
    search,
    getMenuList,
    getBookDetail
}
