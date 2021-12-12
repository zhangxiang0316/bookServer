/**
 * create by zhangxiang on 2021-12-12 20:39
 * 类注释：潇湘书院
 * 备注：
 */
const router = require('koa-router')()
const {search} = require('../controller/xiaoxiang')

router.get('/xiaoxiang/search', async (ctx, next) => {
  ctx.body = await search(ctx.query.name)
})

module.exports = router
