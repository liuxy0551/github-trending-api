const schedule = require("node-schedule");
const RepositoryController = require('../controller/repository')
const { showLog, getNow } = require('../utils')

const paramsList = [
    { language: 'javascript' },
    { language: 'typescript' },
    { language: 'java' },
    { language: '' },
]

// 定时方法
const scheduleInit = () => {
    // 0 0 6-23 * * ? // 6点到23点每小时执行一次
    // 0 0/30 6-23 * * ? // 6点到23点每半小时执行一次
    // 0 0 */1 * * ? // 每小时执行一次
    // 0/10 * * * * ? // 10秒执行一次
    
    schedule.scheduleJob('0 0/32 * * * ?', () => {
        showLog(`执行定时任务, ${ getNow() }`)
        for (let params of paramsList) {
            RepositoryController.list({ query: { language: params.language } })
        }
    });
}

module.exports = {
    scheduleInit
}
