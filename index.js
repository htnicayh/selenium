const { Builder, By, Key, until } = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')
const chromedriver = require('chromedriver')
const proxy = require('selenium-webdriver/proxy')

chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build())

require('dotenv/config')

// const proxyParams = '123.25.15.209:9812'

const driver = new Builder()
    .forBrowser('chrome')
    // .setProxy(proxy.manual({
    //     http: proxyParams,
    //     https: proxyParams
    // }))
    .build()

const defaultPrefix = {
    SIMPLE_REGISTRATION: 'simple-registration',
    RADIO_BUTTON_FORM: 'radio-button-form',
    CHECKBOX_FORM: 'checkbox-form',
    DROPDOWN_FORM: 'dropdown-form',
    DATEPICKER_FORM: 'datepicker-form',
    FILE_FORM: 'file-form',
    IFRAME_FORM: 'iframe-form'
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
const url = process.env.URL || 'google.com'
const {
    SIMPLE_REGISTRATION,
    RADIO_BUTTON_FORM,
    CHECKBOX_FORM,
    DROPDOWN_FORM,
    DATEPICKER_FORM,
    FILE_FORM,
    IFRAME_FORM
} = defaultPrefix
let prefix = 'https://' + url

const env = process.env.ENV || 'simple-registration'

async function selenium() {
    try {
        if (/simple-registration/i.test(env)) {
            prefix = prefix + SIMPLE_REGISTRATION

            await driver.get(prefix)
            await delay(1500)

            await driver.findElement(By.name('email')).sendKeys('hieu.b.dao@gmail.com')

            await delay(1000)

            await driver.findElement(By.id('password')).sendKeys('htnicayh')

            await delay(2000)

            await driver.findElement(By.name('submit')).click()
            await delay(2000)

            await driver.close()
        } else if (/radio-button-form/i.test(env)) {
            prefix = prefix + RADIO_BUTTON_FORM
        } else if (/checkbox-form/i.test(env)) {
            prefix = prefix + CHECKBOX_FORM
        } else if (/dropdown-form/i.test(env)) {
            prefix = prefix + DROPDOWN_FORM
        } else if (/datepicker-form/i.test(env)) {
            prefix = prefix + DATEPICKER_FORM
        } else if (/file-form/i.test(env)) {
            prefix = prefix + FILE_FORM
        } else if (/iframe-form/i.test(env)) {
            prefix = prefix + IFRAME_FORM
        } else {
            
        }
    } catch (e) {
        console.log(e)
        throw e
    }
}

selenium()