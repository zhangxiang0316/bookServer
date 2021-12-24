const router = require('koa-router')()
const {search} = require('../controller/youjiu')

router.get('/youjiu/search', async (ctx, next) => {
    ctx.body = await search(ctx.query.name)
})

module.exports = router