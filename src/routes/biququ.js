const router = require('koa-router')()
const {search} = require('../controller/nunu')

router.get('/nunu/search', async (ctx, next) => {
    ctx.body = await search(ctx.query.name)
})

module.exports = router