const { Builder, By, Key, until } = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')
const chromedriver = require('chromedriver')
const proxy = require('selenium-webdriver/proxy')
const dotenv = require('dotenv')

chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build())

dotenv.config({
    path: '../.env'
})

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
            /**
             * @property {string} registration
             */
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
            /**
             * @property {string} radio
             */
            prefix = prefix + RADIO_BUTTON_FORM

            await driver.get(prefix)
            await delay(1500)

            await driver.findElement(By.css('#title')).sendKeys('Title must be at least 20 characters!')
            await delay(1000)

            await driver.findElement(By.css('#description')).sendKeys('Description must be minimum 20 characters!')
            await delay(1000)

            await driver.findElement(By.css('div:nth-child(3) > div > div:nth-child(2) > label > span.custom-control-indicator')).click()
            await delay(1000)

            await driver.findElement(By.css('#submit')).click()
            await delay(1000)

            await driver.close()

        } else if (/checkbox-form/i.test(env)) {
            /**
             * @property {string} checkbox
             */
            prefix = prefix + CHECKBOX_FORM

            await driver.get(prefix)
            await delay(1000)

            await driver.findElement(By.xpath("//input[@id='name']")).sendKeys('Name is required!')
            await delay(1000)

            await driver.findElement(By.xpath("//input[@id='comment']")).sendKeys('Comment is optional!')
            await delay(1000)

            await driver.findElement(By.xpath("//input[@value='one-bed-appartment']/following::span")).click()
            await delay(1000)

            await driver.findElement(By.xpath("//nb-checkbox[@value='breakfast']/label/span")).click()
            await delay(1000)

            await driver.findElement(By.xpath("//nb-checkbox[@value='dinner']/label/span")).click()
            await delay(1000)

            await driver.findElement(By.xpath("//button[@id='submit']")).click()
            await delay(1000)

            await driver.close()

        } else if (/dropdown-form/i.test(env)) {
            /**
             * @property {string} dropdown
             */
            prefix = prefix + DROPDOWN_FORM

            await driver.get(prefix)
            await delay(1000)

            /**
             * @param {xpath} //nb-option[@value='1']
             * @param {xpath} //nb-select[@formcontrolname='select1']/button
             * @param {xpath} //select[@formcontrolname='select4']/option[@value='volvo']
             * @param {css} #submit
             */

            const dropdown = await driver.findElement(By.xpath("//nb-select[@formcontrolname='select1']/button"))
            dropdown.click()
            await delay(1000)

            await driver.findElement(By.xpath("//nb-option[@value='1']")).click()
            await delay(1000)

            await driver.findElement(By.xpath("//nb-option[@value='3']")).click()
            await delay(1000)

            dropdown.click()
            await delay(1000)

            await driver.findElement(By.xpath(`//select[@formcontrolname="select2"]/option[@value="2: 'opel'"]`)).click()
            await delay(1000)

            await driver.findElement(By.xpath("//nb-select[@formcontrolname='select3']/button")).click()
            await delay(1000)
            
            await driver.findElement(By.xpath("//nb-option[@value='4']")).click()
            await delay(1000)

            await driver.findElement(By.xpath(`//select[@formcontrolname='select4']/option[@value='opel']`)).click()
            await delay(1000)

            await driver.findElement(By.xpath("//button[@id='submit']")).click()
            await delay(1000)

            await driver.close()
        } else if (/datepicker-form/i.test(env)) {
            /**
             * @property {string} datepicker
             */
            prefix = prefix + DATEPICKER_FORM

            await driver.get(prefix)
            await delay(1000)

            /**
             * @param {xpath} //input[@formcontrolname='dateOne']
             * @param {xpath} //input[@formcontrolname='dateTwo']
             */

            await driver.findElement(By.xpath("//input[@formcontrolname='dateOne']")).sendKeys('Jul 23, 2022')
            await delay(1000)

            await driver.findElement(By.xpath("//input[@formcontrolname='dateTwo']")).sendKeys('Jul 5, 2022 - Jul 21, 2022')
            await delay(1000)

            await driver.findElement(By.xpath("//nb-card-header")).click()
            await delay(1000)

            await driver.findElement(By.xpath("//button[@id='submit']")).click()
            await delay(1000)

            await driver.close()
        } else if (/file-form/i.test(env)) {
            /**
             * @property {string} file
             */
            prefix = prefix + FILE_FORM

            await driver.get(prefix)
            await delay(1000)

            /**
             * @param {xpath} //input[@formcontrolname='file']
             */

            await driver.findElement(By.xpath("//input[@formcontrolname='file']")).sendKeys(__dirname + '/filename.txt')
            await delay(1000)

            await driver.findElement(By.xpath("//button[@id='submit']")).click()
            await delay(1000)

            await driver.close()

        } else if (/iframe-form/i.test(env)) {
            /**
             * @property {string} iframe
             */
            prefix = prefix + IFRAME_FORM

            await driver.get(prefix)
            await delay(1000)

            /**
             * @param {xpath} //input[@aria-labelledby='i1']
             */

            await driver.switchTo().frame(0)
            await driver.findElement(By.xpath("//input[@aria-labelledby='i1']")).sendKeys('MakeRounds')
            await delay(1000)

            await driver.actions().sendKeys(Key.TAB).perform()
            await driver.actions().sendKeys(Key.ARROW_DOWN).perform()
            await delay(500)

            await driver.actions().sendKeys(Key.ARROW_DOWN).perform()
            await delay(500)

            await driver.actions().sendKeys(Key.ARROW_DOWN).perform()
            await delay(500)

            await driver.actions().sendKeys(Key.TAB).perform()
            await delay(500)

            await driver.actions().sendKeys(Key.TAB).perform()
            await delay(500)

            await driver.actions().sendKeys(Key.TAB).perform()
            await delay(500)

            await driver.findElement(By.css('div > .ry3kXd')).click()
            await driver.actions().sendKeys(Key.ARROW_DOWN).perform()
            await delay(500)

            await driver.actions().sendKeys(Key.ARROW_DOWN).perform()
            await delay(500)

            await driver.actions().sendKeys(Key.ENTER).perform()
            await delay(1000)

            await driver.actions().sendKeys(Key.TAB).perform()
            await delay(500)

            await driver.actions().sendKeys('06').perform()
            await driver.actions().sendKeys('13').perform()
            await driver.actions().sendKeys('2000').perform()

            await delay(1000)

            await driver.actions().sendKeys(Key.TAB).perform()
            await delay(500)

            await driver.actions().sendKeys(Key.SPACE).perform()
            await delay(1000)

            await driver.actions().sendKeys(Key.TAB).perform()
            await driver.actions().sendKeys(Key.TAB).perform()
            await delay(500)

            await driver.actions().sendKeys(Key.SPACE).perform()
            await delay(1000)

            await driver.actions().sendKeys(Key.TAB).perform()
            await delay(500)

            await driver.actions().sendKeys('Something perfect!').perform()
            await delay(500)

            await driver.actions().sendKeys(Key.TAB).perform()
            await delay(500)

            await driver.actions().sendKeys(Key.ENTER).perform()
            await delay(5000)

            await driver.close()
            
        } else {
            console.log('No environment found')
        }
    } catch (e) {
        console.log(e)
        await driver.close()
        throw e
    }
}

selenium()