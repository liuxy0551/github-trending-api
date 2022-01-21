const RepositoryService = require("../service/repository");
const { defaultPageSize } = require('../config/app.config')
const { list } = require('../../static/language.json')

class RepositoryController {
    // 列表
    async list (ctx) {
        try {
            let { language = '', dateRange = 'daily', current = 1, pageSize = defaultPageSize } = ctx.query
            // 处理 language
            language = list.map(item => item.value).includes(language) ? `/${ language }` : ''

            // 处理 dateRange
            const dateRangeList = ['daily', 'weekly', 'monthly']
            dateRange = dateRangeList.includes(dateRange) ? dateRange : dateRangeList[0]

            // 处理 current
            current = Number(current)
            current = isNaN(current) ? 1 : (current ? current : 1)

            // 处理 pageSize
            pageSize = isNaN(Number(pageSize)) ? defaultPageSize : Number(pageSize)

            ctx.body = await RepositoryService.list(language, dateRange, current, pageSize);
        } catch (error) {
            ctx.body = error;
        }
    }
}

module.exports = new RepositoryController();
