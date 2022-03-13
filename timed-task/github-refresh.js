const axios = require('axios')
const { getNow } = require('./utils')

exports.main_handler = async (event, context) => {
    const paramsList = [
        { language: 'javascript' },
        { language: 'typescript' },
        { language: 'java' },
        { language: '' },
    ]

    for (let params of paramsList) {
        axios.get(`http://github-trending-api.liuxianyu.cn/repository/list?isCache=false&language=${ params.language }`).then((res) => {
            const { code, data, message } = res.data
            delete data.list
            console.log(getNow(), params.language, JSON.stringify({ code, data, message }))
        }).catch((error) => {
            console.log(getNow(), params.language, error.toString())
        })
    }
}

// 0 0 6-23 * * ? // 6点到23点每小时执行一次
// 0 0/30 6-23 * * ? // 6点到23点每半小时执行一次
// 0 0 */1 * * ? // 每小时执行一次
// 0/10 * * * * ? // 10秒执行一次
// 0 0/30 * * * ? // 每半个小时执行一次
