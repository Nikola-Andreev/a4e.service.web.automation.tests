const CONSTANTS = require('../constants.js')

exports.command = function(orgKey, locKey) {
    
    this
        .waitForElementVisible('select[id="selectOrganization"]', CONSTANTS.DEFAULT_MILLISECONDS)
        .click('select[id="selectOrganization"]')
        .pause(CONSTANTS.DEFAULT_MILLISECONDS_PAUSE)
        .waitForElementVisible('option[value="' + orgKey + '$**##__##**$' + locKey + '"]', CONSTANTS.DEFAULT_MILLISECONDS)
        .click('option[value="' + orgKey + '$**##__##**$' + locKey + '"]')
        .pause(CONSTANTS.DEFAULT_MILLISECONDS_PAUSE)
    return this
}