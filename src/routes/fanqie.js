const router = require('koa-router')()
const {search} = require('../controller/fanqie')

// router.prefix('/fanqie')

router.get('/fanqie/search', async (ctx, next) => {
    ctx.body = await search(ctx.query.name)
})

module.exports = router