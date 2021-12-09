const router = require('koa-router')()
const {search} = require('../controller/xbiqupao')

router.get('/xbiqupao/search', async (ctx, next) => {
    ctx.body = await search(ctx.query.name)
})

module.exports = router