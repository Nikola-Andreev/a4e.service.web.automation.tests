const CONSTANTS = require('../../constants.js')

module.exports = {
    
    beforeEach : function(browser) { // login before each test
        browser
        .loginUser(CONSTANTS.USER_FOR_REGISTER, CONSTANTS.USER_PASSWORD)
    },

    'Subscribe for App with auto created configuration' : function (browser) {
        browser
            .loadPage(CONSTANTS.APPS_URL)
            .waitForElementVisible('li[ng-class="a4CoffeeShopsClass"]', CONSTANTS.DEFAULT_MILLISECONDS)
            .click('li[ng-class="a4CoffeeShopsClass"]')
            .waitForElementVisible('ul[id="userAppsMenu"]', CONSTANTS.DEFAULT_MILLISECONDS)
            .waitForElementPresent('li[id="addApps"]', CONSTANTS.DEFAULT_MILLISECONDS)
            .click('li[id="addApps"]')
            .waitForElementVisible('li[ng-class="a4FurnitureClass"]', CONSTANTS.DEFAULT_MILLISECONDS)
            .click('li[ng-class="a4FurnitureClass"]')
            .waitForElementVisible('li[ng-class="a4CoffeeShopsClass"]', CONSTANTS.DEFAULT_MILLISECONDS)
            .click('li[ng-class="a4CoffeeShopsClass"]')
            .waitForElementPresent('li[id="addApps"]', CONSTANTS.DEFAULT_MILLISECONDS)
            .click('li[id="addApps"]')
            .waitForElementVisible('li[ng-class="orderStrategyClass"]', CONSTANTS.DEFAULT_MILLISECONDS)
            .click('li[ng-class="orderStrategyClass"]')
            .pause(CONSTANTS.DEFAULT_MILLISECONDS_PAUSE)
            .end()
    },

    'Edit a4CoffeeShops configuration' : function (browser) {
        browser
            .loadPage(CONSTANTS.APPS_URL)
            .waitForElementVisible('li[ng-class="a4CoffeeShopsClass"]', CONSTANTS.DEFAULT_MILLISECONDS)
            .click('li[ng-class="a4CoffeeShopsClass"]')
            .waitForElementVisible('li[ng-class="mainConfigurationClass"]', CONSTANTS.DEFAULT_MILLISECONDS)
            .click('li[ng-class="mainConfigurationClass"]')
            .setValue('input[id="fileNameInArchieve"]', 'MySuperPrivateName')
            .setValue('input[id="lineSep"]', '_')
            .click('select[id="selectEncoding"]')
            .waitForElementVisible('option[value="UTF-8"]', CONSTANTS.DEFAULT_MILLISECONDS)
            .click('option[value="UTF-8"]')
            .click('button[id="saveConfigurationButton"]')
            .pause(CONSTANTS.DEFAULT_MILLISECONDS_PAUSE)
            .verify.containsText('div[id="notificationDiv"]', 'Successfully saved configuration.')
            .click('li[ng-class="orderStrategyClass"]')
            .click('li[ng-class="a4CoffeeShopsClass"]')
            .click('li[ng-class="mainConfigurationClass"]')
            .waitForElementVisible('input[value="MySuperPrivateName"]', CONSTANTS.DEFAULT_MILLISECONDS)
            .waitForElementVisible('input[value="_"]', CONSTANTS.DEFAULT_MILLISECONDS)
            .waitForElementVisible('select[value="UTF-8"]', CONSTANTS.DEFAULT_MILLISECONDS)
            .end()
    },

    'Edit orderStrategy items' : function (browser) {
        browser
            .loadPage(CONSTANTS.APPS_URL)
            .waitForElementVisible('li[ng-class="orderStrategyClass"]', CONSTANTS.DEFAULT_MILLISECONDS)
            .click('li[ng-class="orderStrategyClass"]')
            .waitForElementVisible('li[ng-class="editItemsClass"]', CONSTANTS.DEFAULT_MILLISECONDS)
            .click('li[ng-class="editItemsClass"]')
            .pause(CONSTANTS.DEFAULT_MILLISECONDS_PAUSE)
            .click('button[id="addItemRowButton"]')
            .pause(CONSTANTS.DEFAULT_MILLISECONDS_PAUSE)
            .setValue('#configRow:nth-of-type(3) > #orderIdCol > input', 'Id')
            .pause(CONSTANTS.DEFAULT_MILLISECONDS_PAUSE)
            .click('button[id="editConfigurationButton"]')
            .pause(CONSTANTS.DEFAULT_MILLISECONDS_PAUSE)
            .verify.containsText('div[id="notificationDiv"]', 'Items successfully edited.')
            .pause(CONSTANTS.DEFAULT_MILLISECONDS_PAUSE)
            .click('li[ng-class="a4CoffeeShopsClass"]')
            .pause(CONSTANTS.DEFAULT_MILLISECONDS_PAUSE)
            .click('li[ng-class="orderStrategyClass"]')
            .waitForElementVisible('li[ng-class="editItemsClass"]', CONSTANTS.DEFAULT_MILLISECONDS)
            .click('li[ng-class="editItemsClass"]')
            .verify.elementPresent('.ng-valid input[value="Id"]')
            .click('li[ng-class="editCoeficients"]')
            .verify.elementPresent('input[value="Id"]')
            .end()
    },

    'Edit orderStrategy coeficients' : function (browser) {
        browser
            .loadPage(CONSTANTS.APPS_URL)
            .waitForElementVisible('li[ng-class="orderStrategyClass"]', CONSTANTS.DEFAULT_MILLISECONDS)
            .click('li[ng-class="orderStrategyClass"]')
            .waitForElementVisible('li[ng-class="editCoeficients"]', CONSTANTS.DEFAULT_MILLISECONDS)
            .click('li[ng-class="editCoeficients"]')
            .pause(CONSTANTS.DEFAULT_MILLISECONDS_PAUSE)
            .setValue('input[ng-model="item.DowCoeficients[0]"]', '12345')
            .click('button[id="editCoeficientsButton"]')
            .pause(CONSTANTS.DEFAULT_MILLISECONDS_PAUSE)
            .verify.containsText('div[id="notificationDiv"]', 'Successfully edited coeficients.')
            .click('li[ng-class="a4CoffeeShopsClass"]')
            .pause(CONSTANTS.DEFAULT_MILLISECONDS_PAUSE)
            .click('li[ng-class="orderStrategyClass"]')
            .waitForElementVisible('li[ng-class="editCoeficients"]', CONSTANTS.DEFAULT_MILLISECONDS)
            .click('li[ng-class="editCoeficients"]')
            .pause(CONSTANTS.DEFAULT_MILLISECONDS_PAUSE)
            .verify.attributeContains('input[ng-model="item.DowCoeficients[0]"]', 'value', '1.412345')
            .end()
    },

    'Delete item' : function (browser) {
        browser
            .loadPage(CONSTANTS.APPS_URL)
            .waitForElementVisible('li[ng-class="orderStrategyClass"]', CONSTANTS.DEFAULT_MILLISECONDS)
            .click('li[ng-class="orderStrategyClass"]')
            .waitForElementVisible('li[ng-class="editItemsClass"]', CONSTANTS.DEFAULT_MILLISECONDS)
            .click('li[ng-class="editItemsClass"]')
            .waitForElementVisible('button[id="deleteItemRowButton"]', CONSTANTS.DEFAULT_MILLISECONDS)
            .click('button[id="deleteItemRowButton"]')
            .pause(CONSTANTS.DEFAULT_MILLISECONDS_PAUSE)
            .verify.containsText('div[id="notificationDiv"]', 'Successfully removed item.')
            .click('li[ng-class="a4CoffeeShopsClass"]')
            .pause(CONSTANTS.DEFAULT_MILLISECONDS_PAUSE)
            .click('li[ng-class="orderStrategyClass"]')
            .waitForElementVisible('li[ng-class="editItemsClass"]', CONSTANTS.DEFAULT_MILLISECONDS)
            .click('li[ng-class="editItemsClass"]')
            .verify.elementNotPresent('.ng-not-empty input[value="500"]')
            .end()
    }
}