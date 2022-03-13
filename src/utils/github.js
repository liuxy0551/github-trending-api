const cheerio = require('cheerio')
const axios = require('axios')
const { redis } = require('./redis')
const timeout = 60_000

/**
 * github trending language list
 */
const getGithubLanguageList = async () => {
    try {
        const { data } = await axios.get(`https://github.com/trending`, { timeout })

        let result = []
        const $ = cheerio.load(data)
        const items = $('#languages-menuitems').find('a.select-menu-item')
        items.each((index, item) => {
            let href = $(item).attr('href')
            result.push({
                label: $(item).text().replace(/\s*/g, ''),
                value: href.includes('?since') ? href.split('?since')[0].split('trending/')[1] : ''
            })
        })
        return result
    } catch (err) {
        throw JSON.stringify(err)
    }
}

const getGithubTrendingWithRetry = async (language, dateRange, current, pageSize, isCache) => {
    // 最多重试5次
    let retryCount = 0, maxCount = 5

    const loop = async (language, dateRange, current, pageSize, isCache) => {
        try {
            let list = []
            if (isCache) {
                // 从 Redis 中拿数据，没有就请求接口并重新赋值到 Redis
                const value = await redis.get(`${ language }-list`)
                if (value) {
                    list = JSON.parse(value)
                } else {
                    list = await getGithubTrending(language, dateRange)
                }
            } else { // 不使用缓存则从 github 拿数据
                list = await getGithubTrending(language, dateRange)
            }
            return {
                list: list.slice((current - 1) * pageSize, current * pageSize),
                total: list.length,
                current,
                pageSize,
                isCache
            }
        } catch (error) {
            if (!JSON.stringify(error).includes('timeout')) throw error
            if (retryCount < maxCount) {
                retryCount++
                console.log(`${ language || '/any' } 请求失败, 重试第 ${ retryCount } 次, ${ getNow() }`)
                await loop(language, dateRange, current, pageSize, isCache)
            } else {
                throw error
            }
        }
    }
    
    const result = await loop(language, dateRange, current, pageSize, isCache)
    return result
}

/**
 * github trending from github
 */
const getGithubTrending = async (language, dateRange) => {
    try {
        const { data } = await axios.get(`https://github.com/trending${ language }?since=${ dateRange }`, { timeout })
    
        let result = []
        const $ = cheerio.load(data)
        const items = $('article')
    
        items.each((index, item) => {
            const [username, repositoryName] = items.eq(index).find('h1.lh-condensed').text().replace(/\s*/g, '').split('/')
            const description = items.eq(index).find('p.pr-4').text().replace(/(^\s*)|(\s*$)/g, '')
            const url = `https://github.com/${ username }/${ repositoryName }`
    
            const [language, todayStar] = items.eq(index).find('div.f6').find('span.d-inline-block').text().replace(/\s*/g, '').split('Builtby')
    
            const list = items.eq(index).find('div.f6').find('a')
            let starCountStr = '', forkCountStr = ''
            list.each((idx, aEle) => {
                idx === 0 && (starCountStr = $(aEle).text().replace(/\s*/g, ''))
                idx === 1 && (forkCountStr = $(aEle).text().replace(/\s*/g, ''))
            })
            const time = getNow()
    
            result.push({
                username,
                repositoryName,
                description,
                url,
                language,
                starCountStr,
                starCount: Number(starCountStr.replace(/,/g, '')),
                forkCountStr,
                forkCount: Number(forkCountStr.replace(/,/g, '')),
                todayStarStr: todayStar.split('starstoday')[0],
                todayStar: Number(todayStar.split('starstoday')[0].replace(/,/g, '')),
                time
            })
        })
        console.log(`${ language || '/any' } 请求成功, ${ getNow() }`)
        await redis.set(`${ language || '/any' }-list`, JSON.stringify(result))
        return result
    } catch (error) {
        throw JSON.stringify(error)
    }
}

// 获取当前时间 2022-03-12 23:38:23
// Serverless 运行时使用 UTC 时间，比北京时间减少了8小时
const getNow = (hours = 8) => {
    const date = getDate()
    let hour = new Date().getHours() + hours
    let minute = new Date().getMinutes()
    let second = new Date().getSeconds()
    hour = hour < 10 ? '0' + hour : hour
    minute = minute < 10 ? '0' + minute : minute
    second = second < 10 ? '0' + second : second
  
    return `${ date } ${ hour }:${ minute }:${ second }`
}
// 获取日期，num 为 0 时返回今天，为 -1 时返回昨天，为 1 时返回明天，如 20210520
const getDate = (num = 0) => {
    const time = new Date().getTime() + 24 * 60 * 60 * 1000 * num
    const year = new Date(time).getFullYear()
    const month = new Date(time).getMonth() + 1
    const date = new Date(time).getDate()
  
    return `${ year }-${ month < 10 ? '0' + month : month }-${ date < 10 ? '0' + date : date }`
}

module.exports = {
    getGithubLanguageList,
    getGithubTrendingWithRetry,
    getGithubTrending,
    getNow,
}
