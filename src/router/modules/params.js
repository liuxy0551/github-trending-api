/**
 * 请求参数相关
 */
const Router = require('koa-router')
const ParamsController = require('../../controller/params')
const Params = new Router()

Params.get('/getSpokenLanguageList', ParamsController.getSpokenLanguageList)
Params.get('/getLanguageList', ParamsController.getLanguageList)

module.exports = Params
