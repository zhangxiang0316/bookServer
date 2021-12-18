/**
 * create by zhangxiang on 2021-12-17 22:18
 * 类注释：墨缘文学
 * 备注：
 */

const router = require('koa-router')()
const {search} = require('../controller/moyuan')

router.get('/moyuan/search', async (ctx, next) => {
  ctx.body = await search(ctx.query.name)
})

module.exports = router
