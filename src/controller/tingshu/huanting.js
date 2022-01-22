/**
 * create by zhangxiang on 2022-01-15 14:04
 * 类注释：幻听网
 * 备注：
 */

const Http = require('../../http/huanting')
const cheerio = require('cheerio')
const {authcode, base64_decode} = require('../../utils/huanting')

const search = async (name) => {
    let res = await Http.get(`/pc/index/search.html?keyword=${encodeURI(name)}`)
    let $ = cheerio.load(res.toString())
    const bookArr = [];
    console.log(res)
    $('.module-content ul li').each(function (i, el) {
        const book = {}
        book.menuUrl = $(el).find('.yun-link').attr('href')
        book.name = $(el).find('.yun-link .text .name').text()
        book.from = '275听书'
        book.author = $(el).find('.yun-link .text .actor').text()
        book.imgUrl = $(el).find('.yun-link .img img').attr('data-original')
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
    info.imgUrl = $('#content .detail-pic img').attr('src')
    info.name = $('#content .detail-info .detail-title h1').text()
    info.author = '演播：' + $('#content .detail-info .info .fn-left').first().next().next().find('dd').text() +
        "作者：" + $('#content .detail-info .info .fn-right').first().next().next().find('dd').text()
    info.disc = $('#content .detail-info .info .juqing dd').text()
    info.status = '状态' + $('#content .detail-info .info .fn-left').last().find('dd').text()
    info.type = $('#content .detail-info .info .fn-right').first().text().replace(/\n/g, '')
    $('#stab1 .playul li').each(function (i, el) {
        const obj = {}
        obj.name = $(el).find('a').text()
        obj.url = $(el).find('a').attr('href')
        obj.from = '275听书'
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
            console.log('--------', matchNext)
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
