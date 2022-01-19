/**
 * 仓库相关
 */
const Router = require('koa-router')
const RepositoryController = require('../../controller/repository')
const Repository = new Router()

Repository.get('/list', RepositoryController.list)

module.exports = Repository
