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
const danshu = require('../controller/danshu')
const sanz = require('../controller/sanz')
const moyuan = require('../controller/moyuan')
const biquwang = require('../controller/biquwang')
const niaoshu = require('../controller/niaoshu')
const lingling = require('../controller/lingling')
const qiwu = require('../controller/qiwu')
const souxiaoshuo = require('../controller/souxiaoshuo')
const youjiu = require('../controller/youjiu')
const miaobige = require('../controller/miaobige')
const qianqian = require('../controller/qianqian')
const quanben = require('../controller/quanben')
const weifeng = require('../controller/weifeng')
const jiutao = require('../controller/jiutao')


/**
 * 查找
 */
router.get('/search', async (ctx, next) => {
    const name = ctx.query.name
    let bookList = []
    if (!name) {
        return bookList
    }
    switch (ctx.query.type) {
        case '笔趣阁':
            bookList = await biquge.search(name)
            break
        case '新笔趣阁':
            bookList = await xbiquge.search(name)
            break
        case '西红柿':
            bookList = await xihongshi.search(name)
            break
        case "无敌小说网":
            bookList = await wudi.search(name)
            break
        case "番茄小说":
            bookList = await fanqie.search(name)
            break
        case "永生文学":
            bookList = await yongsheng.search(name)
            break
        case "笔趣泡":
            bookList = await xbiqupao.search(name)
            break
        case "笔趣趣":
            bookList = await biququ.search(name)
            break
        case "八一小说":
            bookList = await bayi.search(name)
            break
        case "丹书铁卷":
            bookList = await danshu.search(name)
            break
        case "3z中文":
            bookList = await sanz.search(name)
            break
        case "墨缘文学":
            bookList = await moyuan.search(name)
            break
        case "笔趣网":
            bookList = await biquwang.search(name)
            break
        case "鸟书网":
            bookList = await niaoshu.search(name)
            break
        case "00小说":
            bookList = await lingling.search(name)
            break
        case "起舞小说":
            bookList = await qiwu.search(name)
            break
        case "搜小说":
            bookList = await souxiaoshuo.search(name)
            break
        case "悠久小说":
            bookList = await youjiu.search(name)
            break
        case "妙笔阁":
            bookList = await miaobige.search(name)
            break
        case "千千小说":
            bookList = await qianqian.search(name)
            break
        case "全本小说":
            bookList = await quanben.search(name)
            break
        case "微风小说":
            bookList = await weifeng.search(name)
            break
        case "九桃小说":
            bookList = await jiutao.search(name)
            break
        default:
            break
    }
    ctx.body = bookList
})


/**
 * 获取章节
 */
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
        case "丹书铁卷":
            menuDetail = await danshu.getMenuList(ctx.query.bookUrl)
            break
        case "3z中文":
            menuDetail = await sanz.getMenuList(ctx.query.bookUrl)
            break
        case "墨缘文学":
            menuDetail = await moyuan.getMenuList(ctx.query.bookUrl)
            break
        case "笔趣网":
            menuDetail = await biquwang.getMenuList(ctx.query.bookUrl)
            break
        case "鸟书网":
            menuDetail = await niaoshu.getMenuList(ctx.query.bookUrl)
            break
        case "00小说":
            menuDetail = await lingling.getMenuList(ctx.query.bookUrl)
            break
        case "起舞小说":
            menuDetail = await qiwu.getMenuList(ctx.query.bookUrl)
            break
        case "搜小说":
            menuDetail = await souxiaoshuo.getMenuList(ctx.query.bookUrl)
            break
        case "悠久小说":
            menuDetail = await youjiu.getMenuList(ctx.query.bookUrl)
            break
        case "妙笔阁":
            menuDetail = await miaobige.getMenuList(ctx.query.bookUrl)
            break
        case "千千小说":
            menuDetail = await qianqian.getMenuList(ctx.query.bookUrl)
            break
        case "全本小说":
            menuDetail = await quanben.getMenuList(ctx.query.bookUrl)
            break
        case "微风小说":
            menuDetail = await weifeng.getMenuList(ctx.query.bookUrl)
            break
        case "九桃小说":
            menuDetail = await jiutao.getMenuList(ctx.query.bookUrl)
            break
        default:
            break
    }
    ctx.body = menuDetail
})

/**
 * 获取详情
 */
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
        case '丹书铁卷':
            bookDetail = await danshu.getBookDetail(detailUrl)
            break
        case '3z中文':
            bookDetail = await sanz.getBookDetail(detailUrl)
            break
        case '墨缘文学':
            bookDetail = await moyuan.getBookDetail(detailUrl)
            break
        case '笔趣网':
            bookDetail = await biquwang.getBookDetail(detailUrl)
            break
        case '鸟书网':
            bookDetail = await niaoshu.getBookDetail(detailUrl)
            break
        case '00小说':
            bookDetail = await lingling.getBookDetail(detailUrl)
            break
        case '起舞小说':
            bookDetail = await qiwu.getBookDetail(detailUrl)
            break
        case '搜小说':
            bookDetail = await souxiaoshuo.getBookDetail(detailUrl)
            break
        case '悠久小说':
            bookDetail = await youjiu.getBookDetail(detailUrl)
            break
        case '妙笔阁':
            bookDetail = await miaobige.getBookDetail(detailUrl)
            break
        case '千千小说':
            bookDetail = await qianqian.getBookDetail(detailUrl)
            break
        case '全本小说':
            bookDetail = await quanben.getBookDetail(detailUrl)
            break
        case '微风小说':
            bookDetail = await weifeng.getBookDetail(detailUrl)
            break
        case '九桃小说':
            bookDetail = await jiutao.getBookDetail(detailUrl)
            break
        default:
            break
    }
    ctx.body = bookDetail
})

module.exports = router
