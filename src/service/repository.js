const { setCtxBody, getGithubTrending } = require("../utils");

class RepositoryService {
    // 列表
    async list(language, dateRange, current, pageSize) {
        try {
            const result = await getGithubTrending(language, dateRange, current, pageSize)
            return setCtxBody(200, result, "成功");
        } catch (error) {
            return setCtxBody(500, error, "系统错误");
        }
    }
}

module.exports = new RepositoryService();
