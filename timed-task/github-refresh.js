const http = require('http')
const { getNow } = require('./utils')

exports.main_handler = async (event, context) => {
    const paramsList = [
        { language: 'javascript' },
        { language: 'typescript' },
        { language: 'java' },
        { language: '' },
    ]

    for (let params of paramsList) {
        http.get(`http://github-trending-api.liuxianyu.cn/repository/list?language=${ params.language }`, (data) => {
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
}

// 0 0 6-23 * * ? // 6点到23点每小时执行一次
// 0 0/30 6-23 * * ? // 6点到23点每半小时执行一次
// 0 0 */1 * * ? // 每小时执行一次
// 0/10 * * * * ? // 10秒执行一次
// 0 0/30 * * * ? // 每半个小时执行一次
