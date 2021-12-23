/**
 * create by zhangxiang on 2021-12-17 22:18
 * 类注释：00小说
 * 备注：
 */

const router = require('koa-router')()
const {search} = require('../controller/lingling')

router.get('/lingling/search', async (ctx, next) => {
    ctx.body = await search(ctx.query.name)
})

module.exports = router
