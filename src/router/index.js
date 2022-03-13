/**
 * 模块化处理router
 */
const Router = require('koa-router')
const RepositoryController = require('./modules/repository')
const ParamsController = require('./modules/params')
const LogController = require('./modules/log')
const { version } = require('../../package.json')

const router = new Router()

/**
 * 启动路由
 * allowedMethods, 在所有路由中间件最后调用, 此时根据 ctx.status 设置 response 响应头
 */
module.exports = app => {
  router.get('/', ctx => { ctx.body = `github trending api v${ version }` })
  
  router.use('/repository', RepositoryController.routes(), RepositoryController.allowedMethods())
  router.use('/params', ParamsController.routes(), ParamsController.allowedMethods())
  router.use('/log', LogController.routes(), LogController.allowedMethods())

  app.use(router.routes(), router.allowedMethods())
}
