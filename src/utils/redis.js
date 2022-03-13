// https://www.npmjs.com/package/redis
const { createClient } = require('redis')
const { showLog } = require('./index')
const { redis: { username, password, host, port, dbNumber } } = require('../config/app.config')

const config = {
    url: `redis://${ username }:${ password }@${ host }:${ port }/${ dbNumber }`
}
const redis = createClient(config)

const redisInit = async () => {
    try {
        await redis.connect()
    } catch (error) {
        showLog(`Redis connect error! ${ error }`)
    }
    
    redis.on('connect', (error) => showLog(`Redis connect success! ${ error }`));
    redis.on('ready', (error) => showLog(`Redis client ready! ${ error }`));
    redis.on('end', (error) => showLog(`Redis client end! ${ error }`));
    redis.on('error', (error) => showLog(`Redis client error! ${ error }`));
}

module.exports = {
    redis,
    redisInit
}
