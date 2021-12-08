const router = require('koa-router')()
const biquge = require('../controller/biquge')
const xbiquge  = require('../controller/xbiquge')

router.get('/getMenuList', async (ctx, next) => {
    let menuDetail = {}
    if (ctx.query.type === '笔趣阁')
        menuDetail = await biquge.getMenuList(ctx.query.bookUrl)
    else if(ctx.query.type==='新笔趣阁')
        menuDetail = await xbiquge.getMenuList(ctx.query.bookUrl)
    ctx.body = menuDetail
})

router.get('/getBookDetail', async (ctx, next) => {
    let bookDetail = {}
    if (ctx.query.type === '笔趣阁')
        bookDetail = await biquge.getBookDetail(ctx.query.detailUrl)
    else if (ctx.query.type=='新笔趣阁')
        bookDetail = await xbiquge.getBookDetail(ctx.query.detailUrl)
    ctx.body = bookDetail
})


module.exports = router
