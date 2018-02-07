const CONSTANTS = require('../../constants.js')
const SECRETS = require('dotenv').config().parsed

module.exports = {
    'Register user' : function (browser) {
        browser
            .loadPage(CONSTANTS.MAIN_URL)
            .waitForElementVisible('a[class=markSignIn]', CONSTANTS.DEFAULT_MILLISECONDS)
            .click('a[class=markSignIn]')
            .waitForElementVisible('li[ng-class="registerClass"]', CONSTANTS.DEFAULT_MILLISECONDS)
            .click('li[ng-class="registerClass"]')
            .waitForElementVisible('button[id="registerSubmit"]', CONSTANTS.DEFAULT_MILLISECONDS)
            .setValue('input[ng-model="registerEmail"]', CONSTANTS.USER_FOR_REGISTER)
            .setValue('input[ng-model="fullName"]', 'User Testov')
            .setValue('input[ng-model="registerUserName"]', 'annoumous')
            .setValue('input[ng-model="registerPassword"]', CONSTANTS.USER_PASSWORD)
            .setValue('input[ng-model="confirmPassword"]', CONSTANTS.USER_PASSWORD)
            .click('label[id="termsLabel"]')
            .click('button[id="registerSubmit"]')
            .pause(CONSTANTS.DEFAULT_MILLISECONDS)
            .verify.containsText('div[id="notificationDiv"]', 'Thank you! We have just sent you an email, ' +
             'please check your inbox and follow the instructions there to activate your account.')
            // verify email adress  
            .url('https://www.office.com/')
            .waitForElementVisible('div[id="meControl"]', CONSTANTS.DEFAULT_MILLISECONDS)
            .click('div[id="meControl"]')
            .setValue('input[id="i0116"]', CONSTANTS.USER_FOR_REGISTER)
            .click('input[id="idSIButton9"]')
            .setValue('input[id="i0118"]', SECRETS.EMAIL_PASS)
            .pause(CONSTANTS.DEFAULT_MILLISECONDS_PAUSE)
            .execute("document.getElementById('idSIButton9').click()")
            .pause(CONSTANTS.DEFAULT_MILLISECONDS_PAUSE)
            .execute("document.getElementById('idSIButton9').click()")
            .url('https://outlook.office.com/owa/?realm=students.softuni.bg&exsvurl=1&ll-cc=1026&modurl=0')
            .waitForElementVisible('span[id="_ariaId_25"]', CONSTANTS.DEFAULT_MILLISECONDS)
            .click('span[id="_ariaId_25"]')
            .waitForElementVisible('div[autoid="_lvv_9"]', CONSTANTS.DEFAULT_MILLISECONDS)
            .click('div[autoid="_lvv_9"] > div:nth-of-type(2)')
            .waitForElementVisible('input[value="activation"]', CONSTANTS.DEFAULT_MILLISECONDS)
            .click('input[value="activation"]')
            .pause(CONSTANTS.DEFAULT_MILLISECONDS)
            .end()
    }
}