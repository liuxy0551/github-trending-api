const schedule = require("node-schedule");
const { getGithubTrending } = require('../utils/github')

const paramsList = [
    { language: 'javascript' },
    { language: 'typescript' },
    { language: 'java' },
    { language: '' },
]
// 处理 dateRange
const dateRangeList = ['daily', 'weekly', 'monthly']

// 定时方法
const scheduleInit = () => {
    // 0 0 6-23 * * ? // 6点到23点每小时执行一次
    // 0 0/30 6-23 * * ? // 6点到23点每半小时执行一次
    // 0 0 */1 * * ? // 每小时执行一次
    // 0/10 * * * * ? // 10秒执行一次
    
    schedule.scheduleJob('0 0 6-23 * * ?', () => {
        for (let params of paramsList) {
            console.log(params.language)
            getGithubTrending(params.language, dateRangeList[0])
        }
    });
}

module.exports = {
    scheduleInit
}
