/**
 * create by zhangxiang on 2021-12-16 20:59
 * 类注释：全本小说网
 * 备注：
 */
const Http = require('../http/tingshubao')
const cheerio = require('cheerio')
const iconv = require('iconv-lite');
const gbk = require("../utils/gbk");
const axios = require("axios");
const {raw} = require("mysql");

const search = async (name) => {
    let res = await Http.get(`/modules/article/search.php?searchkey=${gbk.encode(name)}&submit=%CB%D1%CB%F7`, {responseType: 'arraybuffer'})
    res = iconv.decode(Buffer.from(res), 'gbk');
    const $ = cheerio.load(res.toString())
    const bookArr = []
    //只搜索到一本 返回为小说章节信息
    if ($('.zjbox').find('.zjlist').length > 0) {
        const obj = {}
        obj.menuUrl = $('link').first().attr('href')
        obj.imgUrl = $('#bookdetail #picbox .img_in img').attr('src')
        obj.name = $('#bookdetail #picbox .img_in img').attr('alt')
        obj.author = $('#bookdetail #info h1 small a').text()
        obj.from = '全本小说'
        bookArr.push(obj)
    } else {
        $('#main .grid tr').each(function (i, el) {
            if (i > 0) {
                const obj = {}
                obj.menuUrl = $(el).find('.odd a').attr('href')
                obj.name = $(el).find('.odd a').text()
                obj.author = $(el).find('.odd').first().next().next().text()
                obj.from = '全本小说'
                obj.imgUrl = ''
                bookArr.push(obj)
            }
        });
    }
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
    let data = await Http.get(menuUrl, {responseType: 'arraybuffer'})
    data = iconv.decode(Buffer.from(data), 'gbk');
    let $ = cheerio.load(data)
    info.imgUrl = $('#bookdetail #picbox .img_in img').attr('src')
    info.name = $('#bookdetail #picbox .img_in img').attr('alt')
    info.author = $('#bookdetail #info h1 small a').text()
    info.disc = $('#bookdetail #intro').text()
    info.updataTime = $('#bookdetail .update').text()
    info.status = '暂无'
    info.last = {
        url: menuUrl + $('#bookdetail .update a').attr('href'),
        from: '全本小说',
        name: $('#bookdetail .update a').text()
    }
    $('.zjbox .zjlist dd').each(function (i, el) {
        const obj = {}
        obj.name = $(el).find('a').text()
        obj.url = menuUrl + $(el).find('a').attr('href')
        obj.from = '全本小说'
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
    let res = await Http.get('/video/?2167-0-0.html', {responseType: 'arraybuffer'})
    res = iconv.decode(Buffer.from(res), 'gbk');
    const $ = cheerio.load(res.toString())
    let bookDetail = []
    let audioUrl = ''
    $('script').map(function (i, el) {
        if (i === 4) {
            const text = $(this)[0].children[0].data.split('var datas=(FonHen_JieMa(\'')[1].split('\').split(\'&\'))')[0]
            bookDetail = FonHen_JieMa(text).split('&')
        }
    })
    if (bookDetail[2] === 'tudou') {

    } else if (bookDetail[2] === 'tc') {
        audioUrl = await Http.get('https://www.gushiciju.com/player/key.php', {params: {url: bookDetail[0]}})
    } else {
        audioUrl = bookDetail[0]
    }
    return audioUrl
}

function FonHen_JieMa(u) {
    var tArr = u.split("*");
    var str = '';
    for (var i = 1, n = tArr.length; i < n; i++) {
        str += String.fromCharCode(tArr[i]);
    }
    return str;
}

module.exports = {
    search,
    getMenuList,
    getBookDetail
}
