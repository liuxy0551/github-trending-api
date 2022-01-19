const ParamsService = require("../service/params");

class ParamsController {
    // 口语语言列表
    async getSpokenLanguageList (ctx) {
        try {
            ctx.body = await ParamsService.getSpokenLanguageList(ctx);
        } catch (error) {
            ctx.body = error;
        }
    }
    
    // 编程语言列表
    async getLanguageList (ctx) {
        try {
            ctx.body = await ParamsService.getLanguageList(ctx);
        } catch (error) {
            ctx.body = error;
        }
    }
}

module.exports = new ParamsController();
