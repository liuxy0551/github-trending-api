const Koa = require('koa')
const logger = require('koa-logger')
const compress = require('koa-compress')
const koaBody = require('koa-body')
const { appPort } = require('./src/config/app.config')
const middles = require('./src/middleWares')
const router = require('./src/router')
const { redisInit } = require('./src/utils/redis')

const app = new Koa()

// 连接 redis
redisInit()

app.use(logger())
app.use(compress({
  threshold: 1024 // 超过大小即压缩，bytes
}))

app.use(koaBody({
  multipart: true, // 支持文件上传
  formidable: {
    maxFileSize: 100 * 1024 * 1024    // 设置上传文件大小最大限制，默认100M
  }
}))

// 启动自定义中间件
middles(app)

// 启动路由
router(app)

// app错误监听
app.on('error', (err) => {
  console.error('Server error: \n%s\n%s ', err.stack || '')
})

app.listen(process.env.PORT || appPort, () => {
  console.log(`app runs on port ${ appPort }`)
})
