const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const {info, error, debug} = require('./src/utils/log4j')
const Kcors = require('kcors')

const index = require('./src/routes/index')
const biquge = require('./src/routes/biquge')
const xiaoxiang = require('./src/routes/xiaoxiang')


// error handler
onerror(app)

// middlewares
app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(require('koa-static')(__dirname + '/public'))

// 跨域设置
const corsOptions = {
    'origin': function (ctx) {
        const whiteList = ['http://book.zhangmuchen.top', 'http://localhost:8089']; //可跨域白名单
        let url = ctx.header.referer.substr(0, ctx.header.referer.length - 1);
        if (whiteList.includes(url)) {
            return url //注意，这里域名末尾不能带/，否则不成功，所以在之前我把/通过substr干掉了
        }
        return 'http://localhost:8088' //默认允许本地请求8088端口可跨域
    },
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
    // debug(JSON.stringify(ctx.body))
    info("---method:" + ctx.method + "----url:" + decodeURI(ctx.url) + "----ms:" + `${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
    .use(biquge.routes(), biquge.allowedMethods())
    .use(xiaoxiang.routes(), xiaoxiang.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
    error(err)
    error(ctx)
});

module.exports = app
