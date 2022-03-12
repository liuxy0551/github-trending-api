const schedule = require("node-schedule");
const RepositoryService = require('../service/repository')

const list = [
    { language: 'JavaScript' },
    { language: 'TypeScript' },
    { language: 'Java' },
    { language: '' },
]

// 定时方法
const scheduleInit = () => {
    // 0 0/30 6-23 * * ? // 6点到23点每半小时执行一次
    // 0 0 6-23 * * ? // 6点到23点每小时执行一次
    // 0 0 */1 * * ? // 每小时执行一次
    // 0/10 * * * * ? // 10秒执行一次
    
    schedule.scheduleJob("0/10 * * * * ?", () => {
        for (let i of list) {
            console.log(i)

            // ctx.body = await RepositoryService.list(language, dateRange, current, pageSize);
        }
    });
}

module.exports = {
    scheduleInit
}
