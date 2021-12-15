const router = require('koa-router')()
const {search} = require('../controller/bayi')

router.get('/bayi/search', async (ctx, next) => {
    ctx.body = await search(ctx.query.name)
})

module.exports = router