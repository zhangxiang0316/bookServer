const router = require('koa-router')()
const {search} = require('../controller/yongsheng')

router.get('/yongsheng/search', async (ctx, next) => {
    ctx.body = await search(ctx.query.name)
})

module.exports = router