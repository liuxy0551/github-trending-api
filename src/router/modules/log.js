/**
 * 打印日志相关
 */
const Router = require('koa-router')
const LogController = require('../../controller/log')
const Log = new Router()

Log.get('/create', LogController.create)

module.exports = Log
