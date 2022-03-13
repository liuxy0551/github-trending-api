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
        console.log('Redis connect error!', error)
    }
    
    redis.on('connect', (err) => console.log('Redis connect success!', err));
    redis.on('ready', (err) => console.log('Redis client ready!', err));
    redis.on('end', (err) => console.log('Redis client end!', err));
    redis.on('error', (err) => console.log('Redis client error!', err));
}

module.exports = {
    redis,
    redisInit
}
