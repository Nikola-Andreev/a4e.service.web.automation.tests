const CONSTANTS = require('../../constants.js')

module.exports = {
    
    beforeEach : function(browser) { // login before each test
        browser
        .loginUser(CONSTANTS.USER_FOR_REGISTER, CONSTANTS.USER_PASSWORD)
    },

    'Change password' : function (browser) {
        browser
            .loadPage(CONSTANTS.SETTINGS_URL)
            .waitForElementVisible('li[ng-class="passwordClass"]', CONSTANTS.DEFAULT_MILLISECONDS)
            .click('li[ng-class="passwordClass"]')
            .waitForElementVisible('form[id="changePasswordForm"]', CONSTANTS.DEFAULT_MILLISECONDS)
            .setValue('input[ng-model="changePasswordOld"]', CONSTANTS.USER_PASSWORD)
            .setValue('input[ng-model="changePasswordNew"]', CONSTANTS.USER_NEW_PASSWORD)
            .setValue('input[ng-model="changePasswordNewRepeat"]', CONSTANTS.USER_NEW_PASSWORD)
            .click('button[id="changePasswordButton"]')
            .pause(CONSTANTS.DEFAULT_MILLISECONDS_PAUSE)
            .verify.containsText('div[id="notificationDiv"]', 'Password changed.')
            // log out 
            .execute('document.getElementById("logout").click()')
            // login with new password
            .loginUser(CONSTANTS.USER_FOR_REGISTER, CONSTANTS.USER_NEW_PASSWORD)
            // change back the old password
            .loadPage(CONSTANTS.SETTINGS_URL)
            .waitForElementVisible('li[ng-class="passwordClass"]', CONSTANTS.DEFAULT_MILLISECONDS)
            .click('li[ng-class="passwordClass"]')
            .waitForElementVisible('form[id="changePasswordForm"]', CONSTANTS.DEFAULT_MILLISECONDS)
            .setValue('input[ng-model="changePasswordOld"]', CONSTANTS.USER_NEW_PASSWORD)
            .setValue('input[ng-model="changePasswordNew"]', CONSTANTS.USER_PASSWORD)
            .setValue('input[ng-model="changePasswordNewRepeat"]', CONSTANTS.USER_PASSWORD)
            .click('button[id="changePasswordButton"]')
            .pause(CONSTANTS.DEFAULT_MILLISECONDS_PAUSE)
            .verify.containsText('div[id="notificationDiv"]', 'Password changed.')
            .end()
    }
}