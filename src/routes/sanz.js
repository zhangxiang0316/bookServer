/**
 * create by zhangxiang on 2021-12-16 20:59
 * 类注释：
 * 备注：
 */
const router = require('koa-router')()
const {search} = require('../controller/sanz')

router.get('/sanz/search', async (ctx, next) => {
  ctx.body = await search(ctx.query.name)
})

module.exports = router
