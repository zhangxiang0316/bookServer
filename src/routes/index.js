const router = require('koa-router')()
const biquge = require('../controller/biquge')
const xbiquge = require('../controller/xbiquge')
const xihongshi =require('../controller/xihongshi')

router.get('/getMenuList', async (ctx, next) => {
  const bookUrl = ctx.query.bookUrl
  let menuDetail = {}
  if (!bookUrl) {
    return menuDetail
  }
  switch (ctx.query.type) {
    case '笔趣阁':
      menuDetail = await biquge.getMenuList(ctx.query.bookUrl)
      break
    case '新笔趣阁':
      menuDetail = await xbiquge.getMenuList(ctx.query.bookUrl)
      break
    case '西红柿':
      menuDetail = await xihongshi.getMenuList(ctx.query.bookUrl)
      break
    default:
      break
  }
  ctx.body = menuDetail
})

router.get('/getBookDetail', async (ctx, next) => {
  const detailUrl = ctx.query.detailUrl
  let bookDetail = {}
  if (!detailUrl) {
    return bookDetail
  }
  switch (ctx.query.type) {
    case '笔趣阁':
      bookDetail = await biquge.getBookDetail(detailUrl)
      break
    case '新笔趣阁':
      bookDetail = await xbiquge.getBookDetail(detailUrl)
      break
    case '西红柿':
      bookDetail = await xihongshi.getBookDetail(detailUrl)
      break
    default:
      break
  }
  ctx.body = bookDetail
})

module.exports = router
