const router = require('koa-router')()
const {search} = require('../controller/wudi')

router.get('/wudi/search', async (ctx, next) => {
    ctx.body = await search(ctx.query.name)
})

module.exports = router