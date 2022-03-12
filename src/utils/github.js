const cheerio = require('cheerio')
const axios = require('axios')
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

const getGithubTrendingWithRetry = async (language, dateRange, current, pageSize) => {
    // 最多重试2次
    let retryCount = 0, maxCount = 5

    const loop = async (language, dateRange, current, pageSize) => {
        try {
            console.log(retryCount)
            const result = await getGithubTrending(language, dateRange, current, pageSize)
            return result
        } catch (error) {
            if (!error.includes('timeout')) throw error
            if (retryCount < maxCount) {
                retryCount++
                await loop(language, dateRange, current, pageSize)
            } else {
                throw error
            }
        }
    }
    
    const result = await loop(language, dateRange, current, pageSize)
    return result
}

/**
 * github trending from github
 */
const getGithubTrending = async (language, dateRange, current, pageSize) => {
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
            })
        })
        return {
            list: result.slice((current - 1) * pageSize, current * pageSize),
            total: result.length,
            current,
            pageSize
        }
    } catch (error) {
        throw JSON.stringify(error)
    }
}

module.exports = {
    getGithubLanguageList,
    getGithubTrendingWithRetry,
}
