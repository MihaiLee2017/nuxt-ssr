// const Koa = require('koa')
import Koa from 'koa'
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
/**
 * 自定义中间件
 * */
import { TestRegExp } from './utils/fn'
import onerror from 'koa-onerror'
import json from 'koa-json'
import bodyParser from 'koa-bodyparser'
import logUtil from './middlewares/log/log'
import initLogPath from './middlewares/log/init_log_path'
import response_formatter from './middlewares/req_formatter/formatter'
import session from 'koa-generic-session'
import Redis from 'koa-redis'
import passport from './utils/passport'
// mongoose
import mongoose from 'mongoose'
import dbConfig from './dbs/config'
import apiRouter from './routes/api/index'
/* *************************************************** */

const app = new Koa()

app.keys = ['mt', 'keyskeys']
app.proxy = true
app.use(session({ key: 'mt', prefix: 'mt:uid', store: new Redis() }))
/**
  * 自定义 middlewares
  * */
initLogPath()
onerror(app)
app.use(bodyParser({
  extendTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(passport.initialize())
app.use(passport.session())
// 连接数据库
mongoose.connect(dbConfig.dbs, {
  useNewUrlParser: true
})
/* *************************************************** */


// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(app.env === 'production')

async function start() {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 3000
  } = nuxt.options.server

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }
  // 日志
  app.use(async (ctx, next) => {
    if (TestRegExp("^/api", ctx.originalUrl)) {
      const start = new Date()
      var ms;
      try {
        await next()
        ms = new Date() - start
        logUtil.logResponse(ctx, ms)
      } catch (error) {
        ms = new Date - start
        logUtil.logError(ctx, error, ms)
      }
    } else {
      await next()
    }
  })
  // 统一返回格式
  app.use(response_formatter("^/api"))
  // routes
  app.use(apiRouter.routes(), apiRouter.allowedMethods())
  app.use(ctx => {
    ctx.status = 200
    ctx.respond = false // Bypass Koa's built-in response handling
    ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    nuxt.render(ctx.req, ctx.res)
  })

  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()
