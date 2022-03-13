/**
 * 初始化 redis 中的数据
 */
const http = require('http')
const { getNow } = require('./utils')

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
