const router = require('koa-router')()
const biquge = require('../controller/biquge')
const xbiquge = require('../controller/xbiquge')
const xihongshi = require('../controller/xihongshi')
const wudi = require('../controller/wudi')
const fanqie = require('../controller/fanqie')
const yongsheng = require('../controller/yongsheng')
const xbiqupao = require('../controller/xbiqupao')
const biququ = require('../controller/biququ')
const bayi = require('../controller/bayi')

router.get('/getMenuList', async (ctx, next) => {
    const bookUrl = ctx.query.bookUrl
    let menuDetail = {}
    if (!bookUrl) {
        return menuDetail
    }
    switch (ctx.query.type) {
        case '笔趣阁':
            menuDetail = await biquge.getMenuList(ctx.query.bookUrl)
            break
        case '新笔趣阁':
            menuDetail = await xbiquge.getMenuList(ctx.query.bookUrl)
            break
        case '西红柿':
            menuDetail = await xihongshi.getMenuList(ctx.query.bookUrl)
            break
        case "无敌小说网":
            menuDetail = await wudi.getMenuList(ctx.query.bookUrl)
            break
        case "番茄小说":
            menuDetail = await fanqie.getMenuList(ctx.query.bookUrl)
            break
        case "永生文学":
            menuDetail = await yongsheng.getMenuList(ctx.query.bookUrl)
            break
        case "笔趣泡":
            menuDetail = await xbiqupao.getMenuList(ctx.query.bookUrl)
            break
        case "笔趣趣":
            menuDetail = await biququ.getMenuList(ctx.query.bookUrl)
            break
        case "八一小说":
            menuDetail = await bayi.getMenuList(ctx.query.bookUrl)
            break
        default:
            break
    }
    ctx.body = menuDetail
})

router.get('/getBookDetail', async (ctx, next) => {
    const detailUrl = ctx.query.detailUrl
    let bookDetail = {}
    if (!detailUrl) {
        return bookDetail
    }
    switch (ctx.query.type) {
        case '笔趣阁':
            bookDetail = await biquge.getBookDetail(detailUrl)
            break
        case '新笔趣阁':
            bookDetail = await xbiquge.getBookDetail(detailUrl)
            break
        case '西红柿':
            bookDetail = await xihongshi.getBookDetail(detailUrl)
            break
        case '无敌小说网':
            bookDetail = await wudi.getBookDetail(detailUrl)
            break
        case '番茄小说':
            bookDetail = await fanqie.getBookDetail(detailUrl)
            break
        case '永生文学':
            bookDetail = await yongsheng.getBookDetail(detailUrl)
            break
        case '笔趣泡':
            bookDetail = await xbiqupao.getBookDetail(detailUrl)
            break
        case '笔趣趣':
            bookDetail = await biququ.getBookDetail(detailUrl)
            break
        case '八一小说':
            bookDetail = await bayi.getBookDetail(detailUrl)
            break
        default:
            break
    }
    ctx.body = bookDetail
})

module.exports = router
