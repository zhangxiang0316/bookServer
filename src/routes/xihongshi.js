/**
 * create by zhangxiang on 2021-12-08 20:06
 * 类注释：
 * 备注：
 */
const router = require('koa-router')()
const {search} = require('../controller/xihongshi')

router.get('/xihongshi/search', async (ctx, next) => {
  ctx.body = await search(ctx.query.name)
})

module.exports = router
