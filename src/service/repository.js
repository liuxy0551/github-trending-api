const { setCtxBody, getGithubTrendingWithRetry } = require("../utils");

class RepositoryService {
    // 列表
    async list(language, dateRange, current, pageSize) {
        try {
            const result = await getGithubTrendingWithRetry(language, dateRange, current, pageSize)
            return setCtxBody(200, result, "成功");
        } catch (error) {
            return setCtxBody(500, error, "系统错误");
        }
    }
}

module.exports = new RepositoryService();
