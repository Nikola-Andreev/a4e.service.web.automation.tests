const CONSTANTS = require('../constants.js')

exports.command = function(username, password) {
    
    this
        .loadPage(CONSTANTS.MAIN_URL)
        .waitForElementVisible('a[class=markSignIn]', CONSTANTS.DEFAULT_MILLISECONDS)
        .click('a[class=markSignIn]')
        .waitForElementVisible('input[name=emailOrUserName]', CONSTANTS.DEFAULT_MILLISECONDS)
        .setValue('input[name=emailOrUserName]', username)
        .waitForElementVisible('input[name=password]', CONSTANTS.DEFAULT_MILLISECONDS)
        .setValue('input[name=password]', password)
        .click('button[id=loginButton]')
        .pause(CONSTANTS.DEFAULT_MILLISECONDS_PAUSE)
        
    return this
}