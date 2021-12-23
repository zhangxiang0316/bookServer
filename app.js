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
const xiaoxiang = require('./src/routes/xiaoxiang')
const biququ = require('./src/routes/biququ')
const bayi = require('./src/routes/bayi')
const danshu = require('./src/routes/danshu')
const sanz = require('./src/routes/sanz')
const moyuan = require('./src/routes/moyuan')
const biquwang = require('./src/routes/biquwang')
const niaoshu = require('./src/routes/niaoshu')
const lingling = require('./src/routes/lingling')
const qiwu = require('./src/routes/qiwu')

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
    'origin': function (ctx) {
        const whiteList = ['http://book.zhangmuchen.top', 'http://localhost:8089']; //可跨域白名单
        let url = ctx.header.referer.substr(0, ctx.header.referer.length - 1);
        if (whiteList.includes(url)) {
            console.log(url)
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
    console.log('请求：', start, ctx.method, decodeURI(ctx.url), `${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
    .use(biquge.routes(), biquge.allowedMethods())
    .use(xbiquge.routes(), xbiquge.allowedMethods())
    .use(xihongshi.routes(), xihongshi.allowedMethods())
    .use(wudi.routes(), wudi.allowedMethods())
    .use(fanqie.routes(), fanqie.allowedMethods())
    .use(yongsheng.routes(), yongsheng.allowedMethods())
    .use(xbiqupao.routes(), xbiqupao.allowedMethods())
    .use(xiaoxiang.routes(), xiaoxiang.allowedMethods())
    .use(biququ.routes(), biququ.allowedMethods())
    .use(bayi.routes(), bayi.allowedMethods())
    .use(danshu.routes(), danshu.allowedMethods())
    .use(sanz.routes(), sanz.allowedMethods())
    .use(moyuan.routes(), moyuan.allowedMethods())
    .use(biquwang.routes(), biquwang.allowedMethods())
    .use(niaoshu.routes(), niaoshu.allowedMethods())
    .use(lingling.routes(), lingling.allowedMethods())
    .use(qiwu.routes(), qiwu.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
});

module.exports = app
