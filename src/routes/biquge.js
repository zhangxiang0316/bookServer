const router = require('koa-router')()
const {search,getHome} = require('../controller/biquge')

router.get('/biquge/search', async (ctx, next) => {
    ctx.body = await search(ctx.query.name)
})
router.get('/biquge/home', async (ctx, next) => {
    ctx.body = await getHome()
})

module.exports = router