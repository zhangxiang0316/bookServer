const router = require('koa-router')()
const {search, getHome, getBookListByType,getTopFifty} = require('../controller/biquge')

router.get('/biquge/search', async (ctx, next) => {
    ctx.body = await search(ctx.query.name)
})

router.get('/biquge/home', async (ctx, next) => {
    ctx.body = await getHome()
})

router.get('/biquge/bookListByType', async (ctx, next) => {
    ctx.body = await getBookListByType(ctx.query.page,ctx.query.sortid)
})
router.get('/biquge/top', async (ctx, next) => {
    ctx.body = await getTopFifty()
})

module.exports = router