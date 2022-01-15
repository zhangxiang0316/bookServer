const router = require('koa-router')()
const {
  getHome,
  getTypeList,
  getPingShuList,
  getBookTypeList,
  search,
  getMenuList,
  getBookDetail
} = require('../controller/tingshubao')

router.prefix('/tingshubao')

router.get('/home', async (ctx, next) => {
  ctx.body = await getHome()
})

router.get('/typeList', async (ctx, next) => {
  ctx.body = await getTypeList(ctx.query.url)
})

router.get('/bookTypeList', async (ctx, next) => {
  ctx.body = await getBookTypeList(ctx.query.url)
})

router.get('/pingShuList', async (ctx, next) => {
  ctx.body = await getPingShuList(ctx.query.url)
})

router.get('/search', async (ctx, next) => {
  ctx.body = await search(ctx.query.name)
})

router.get('/menuList', async (ctx, next) => {
  ctx.body = await getMenuList(ctx.query.bookUrl)
})

router.get('/detail', async (ctx, next) => {
  ctx.body = await getBookDetail(ctx.query.detailUrl)
})

module.exports = router
