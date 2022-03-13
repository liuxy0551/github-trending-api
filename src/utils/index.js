const axios = require('axios')
const { getGithubLanguageList, getGithubTrendingWithRetry, getNow } = require('./github')

/**
 * setCtxBody 设置 ctx.body
 */
const setCtxBody = (code = 200, data, message = '成功', extraParams) => {
	code !== 200 && console.log(code, data)
	return { code, data, message, ...extraParams }
}

/**
 * Serverless 打印日志
 */
const showLog = async (text) => {
	await axios.get(`http://github-trending-api.liuxianyu.cn/log/create?text=${ text }`, { timeout })
}

module.exports = {
	setCtxBody,
	getGithubLanguageList,
	getGithubTrendingWithRetry,
	getNow,
	showLog
}
