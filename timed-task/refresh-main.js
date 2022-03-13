const http = require('http')
const { getNow } = require('./utils')

exports.main_handler = async (event, context) => {
    http.get('http://github-trending-api.liuxianyu.cn', (data) => {
        let str = ''
        data.on('data', (chunk) => {
            str+=chunk;//监听数据响应，拼接数据片段
        })
        data.on('end', () => {
            console.log(getNow(), str.toString())
            return event
        })
    })
}

// 0 0/2 * * * ?
// 或 每两分钟
