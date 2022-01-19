const { setCtxBody, getGithubLanguageList, getGithubTrending } = require("../utils");

class ParamsService {
    // 口语语言列表
    async getSpokenLanguageList (ctx) {
        try {
            const result = await getGithubLanguageList()
            return setCtxBody(200, result, '成功')
        } catch (error) {
            return setCtxBody(500, error, "系统错误");
        }
    }

    // 口语语言列表
    async getLanguageList (ctx) {
        try {
            const result = await getGithubLanguageList()
            return setCtxBody(200, result, '成功')
        } catch (error) {
            return setCtxBody(500, error, "系统错误");
        }
    }
}

module.exports = new ParamsService();
