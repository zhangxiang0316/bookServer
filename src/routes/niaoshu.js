const router = require('koa-router')()
const {search} = require('../controller/niaoshu')

router.get('/niaoshu/search', async (ctx, next) => {
    ctx.body = await search(ctx.query.name)
})

module.exports = router