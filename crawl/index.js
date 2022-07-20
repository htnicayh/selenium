const dotenv = require('dotenv')
const { Builder, Key, By, until } = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')
const chromedriver = require('chromedriver')

chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build())

dotenv.config({
    path: '../.env'
})

const driver = new Builder()
    .forBrowser('chrome')
    .build()

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))
const url = (process.env.URL_CRAWL).toString()

async function crawl() {
    try {
        /**
         * @property {string} table
         */
        await driver.get(url)
        await delay(1000)
        
        const resC = {
            title: 'Smart Table',
            listInfo: []
        }
        const pagination = 6

        for (let i = 0; i < pagination; i++) {
            const rows = await driver.findElements(By.xpath('//tbody//tr'))
            for (const row of rows) {
                const rowData = await row.getText()
                const info = rowData.split(/\n/)

                const [id, firstName, lastName, username, email, age] = info
                
                resC.listInfo.push({
                    id: id,
                    firstName,
                    lastName,
                    username,
                    email,
                    age
                })
            }

            await delay(2000)
            if (i !== 5) {
                await driver.findElement(By.css(`.page-link-next`)).click()
            }
        }

        await driver.close()

        return resC
    } catch (e) {
        console.log(e)
        await driver.close()
        throw e
    }
}

crawl().then((res) => console.table(res.listInfo))
// console.table(resC.listInfo)
