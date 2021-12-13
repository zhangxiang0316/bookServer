const router = require('koa-router')()
const {search} = require('../controller/biququ')

router.get('/biququ/search', async (ctx, next) => {
    ctx.body = await search(ctx.query.name)
})

module.exports = router
