const router = require('koa-router')()
const {search} = require('../controller/xbiquge')

router.get('/xbiquge/search', async (ctx, next) => {
    ctx.body = await search(ctx.query.name)
})

module.exports = router