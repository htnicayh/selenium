const { Builder, By, Key } = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')
const chromedriver = require('chromedriver')

const chromeOptions = new chrome.Options()

chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build())

const driver = new Builder()
    .forBrowser('chrome')
    .setChromeOptions(chromeOptions)
    .build()

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

(async () => {
    await driver.get('https://google.com')

    await delay(1500)

    await driver.findElement(By.name('q')).sendKeys('selenium', Key.RETURN)
})()
