const cheerio = require('cheerio')
const axios = require('axios')
const timeout = 30_000

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
        console.log('github trending language list error', err)
        throw err
    }
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
    } catch (err) {
        console.log('github trending error', err)
        throw err
    }
}

module.exports = {
    getGithubLanguageList,
    getGithubTrending,
}
