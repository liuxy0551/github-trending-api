// https://www.npmjs.com/package/redis
const { createClient } = require('redis')
const { redis: { username, password, host, port, dbNumber } } = require('../config/app.config')

const config = {
    url: `redis://${ username }:${ password }@${ host }:${ port }/${ dbNumber }`
}
const redis = createClient(config)

const redisInit = async () => {
    try {
        await redis.connect()
    } catch (error) {
        console.log(`Redis connect error! ${ error }`)
    }
    
    redis.on('connect', (error) => console.log(`Redis connect success! ${ error }`));
    redis.on('ready', (error) => console.log(`Redis client ready! ${ error }`));
    redis.on('end', (error) => console.log(`Redis client end! ${ error }`));
    redis.on('error', (error) => console.log(`Redis client error! ${ error }`));
}

module.exports = {
    redis,
    redisInit
}
