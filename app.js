const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const Kcors = require('kcors')

const index = require('./src/routes/index')
const biquge = require('./src/routes/biquge')
const xbiquge = require('./src/routes/xbiquge')
const xihongshi = require('./src/routes/xihongshi')
const wudi = require('./src/routes/wudi')
const fanqie = require('./src/routes/fanqie')
const yongsheng = require('./src/routes/yongsheng')
const xbiqupao = require('./src/routes/xbiqupao')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

// 跨域设置
const corsOptions = {
    'origin': '*',
    'credentials': true,
    'maxAge': 3600
};
app.use(Kcors(corsOptions));

app.use(views(__dirname + '/views', {
    extension: 'ejs'
}))

// logger
app.use(async (ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(biquge.routes(), biquge.allowedMethods())
app.use(xbiquge.routes(), xbiquge.allowedMethods())
app.use(xihongshi.routes(), xihongshi.allowedMethods())
app.use(wudi.routes(), wudi.allowedMethods())
app.use(fanqie.routes(), fanqie.allowedMethods())
app.use(yongsheng.routes(), yongsheng.allowedMethods())
app.use(xbiqupao.routes(), xbiqupao.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
});

module.exports = app
