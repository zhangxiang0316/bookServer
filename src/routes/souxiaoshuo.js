/**
 * create by zhangxiang on 2021-12-18 10:22
 * 类注释：搜小说
 * 备注：
 */
const router = require('koa-router')()
const {search} = require('../controller/souxiaoshuo')

router.get('/souxiaoshuo/search', async (ctx, next) => {
  ctx.body = await search(ctx.query.name)
})

module.exports = router
