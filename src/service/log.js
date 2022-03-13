const { setCtxBody } = require("../utils");

class LogService {
    async create (ctx) {
        try {
            const { text } = ctx.query
            console.log(text)
            return setCtxBody(200, text, '成功')
        } catch (error) {
            return setCtxBody(500, error, "系统错误");
        }
    }
}

module.exports = new LogService();
