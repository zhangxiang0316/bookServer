const router = require('koa-router')()
const {search} = require('../controller/zhuishu')

router.get('/zhuishu/search', async (ctx, next) => {
    ctx.body = await search(ctx.query.name)
})

module.exports = router