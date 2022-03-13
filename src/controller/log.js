const LogService = require("../service/log");

class LogController {
    async create (ctx) {
        try {
            ctx.body = await LogService.create(ctx);
        } catch (error) {
            ctx.body = error;
        }
    }
}

module.exports = new LogController();
