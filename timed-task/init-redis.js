/**
 * 初始化 redis 中的数据
 */
const axios = require('axios')

const paramsList = [
    { language: 'javascript' },
    { language: 'typescript' },
    { language: 'java' },
    { language: '' },
]

for (let params of paramsList) {
    axios.get(`http://github-trending-api.liuxianyu.cn/repository/list?language=${ params.language }`)
}
