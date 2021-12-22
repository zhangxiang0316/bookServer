/**
 * create by zhangxiang on 2021-12-18 10:22
 * 类注释：笔趣网
 * 备注：
 */
const router = require('koa-router')()
const {search} = require('../controller/biquwang')

router.get('/biquwang/search', async (ctx, next) => {
  ctx.body = await search(ctx.query.name)
})

module.exports = router
