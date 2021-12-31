const router = require('koa-router')()
const {getBookDetail} = require('../controller/tingshubao')

router.prefix('/tingshubao')


router.get('/detail', async (ctx, next) => {
    ctx.body = await getBookDetail(ctx.query.detailUrl)
})

module.exports = router