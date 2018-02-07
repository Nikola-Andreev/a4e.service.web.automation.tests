const CONSTANTS = require('../../constants.js')

module.exports = {
    
    beforeEach : function(browser) { // login before each test
        browser
        .loginUser(CONSTANTS.USER_FOR_REGISTER, CONSTANTS.USER_PASSWORD)
    },

    'Create organization' : function (browser) {
        browser
            .loadPage(CONSTANTS.ORGANIZATIONS_URL)
            .waitForElementPresent('li[ng-class="createOrganizationClass"]', CONSTANTS.DEFAULT_MILLISECONDS)
            .click('li[ng-class="createOrganizationClass"]')
            .waitForElementPresent('form[id="createOrganizationForm"]', CONSTANTS.DEFAULT_MILLISECONDS)
            .setValue('input[ng-model="organizationName"]', 'testOrg')
            .setValue('input[ng-model="organizationKey"]', CONSTANTS.ORGANIZATION_KEY)
            .setValue('input[ng-model="locationName"]', 'testLoc')
            .setValue('input[ng-model="locationKey"]', CONSTANTS.DEFAULT_LOCATION_KEY)
            .setValue('input[ng-model="locationAdress"]', CONSTANTS.LOCATION_ADDRESS)
            .click('button[id="createOrganizationButton"]')
            .pause(CONSTANTS.DEFAULT_MILLISECONDS_PAUSE)
            .verify.containsText('div[id="notificationDiv"]', 'Organization testOrg created.')
            .end()
    },

    'Create location' : function (browser) {
        browser
            .loadPage(CONSTANTS.ORGANIZATIONS_URL)
            .waitForElementVisible('select[id="selectOrganization"]', CONSTANTS.DEFAULT_MILLISECONDS)
            .waitForElementPresent('option[value="' + CONSTANTS.ORGANIZATION_KEY + '"]', CONSTANTS.DEFAULT_MILLISECONDS)
            .click('option[value="' + CONSTANTS.ORGANIZATION_KEY + '"]')
            .click('li[id="createLocation"]')
            .waitForElementVisible('form[id="createLocationForm"]', CONSTANTS.DEFAULT_MILLISECONDS)
            .setValue('input[ng-model="locationNewName"]', 'newLoc')
            .setValue('input[id="createLocationKey"]', CONSTANTS.NEW_LOCATION_KEY)
            .setValue('input[ng-model="locationNewAdress"]', CONSTANTS.LOCATION_ADDRESS)
            .click('button[id="createLocationButton"]')
            .pause(CONSTANTS.DEFAULT_MILLISECONDS_PAUSE)
            .verify.containsText('div[id="notificationDiv"]', 'Successfully created location.')
            .end()
    },

    'Subscribe for app with new location' : function (browser) {
        browser
            .loadPage(CONSTANTS.APPS_URL)
            .selectLocation(CONSTANTS.ORGANIZATION_KEY,  CONSTANTS.NEW_LOCATION_KEY)
            .pause(CONSTANTS.DEFAULT_MILLISECONDS_PAUSE)
            .click('li[id="addApps"]')
            .waitForElementVisible('li[ng-class="a4FurnitureClass"]', CONSTANTS.DEFAULT_MILLISECONDS)
            .click('li[ng-class="a4FurnitureClass"]')
            .pause(CONSTANTS.DEFAULT_MILLISECONDS_PAUSE)
            .waitForElementVisible('ul[id="userAppsMenu"]', CONSTANTS.DEFAULT_MILLISECONDS)
            .waitForElementVisible('li[id="addApps"]', CONSTANTS.DEFAULT_MILLISECONDS)
            .click('li[id="addApps"]')
            .pause(CONSTANTS.DEFAULT_MILLISECONDS_PAUSE)
            .waitForElementVisible('li[ng-class="a4RetailClass"]', CONSTANTS.DEFAULT_MILLISECONDS)
            .click('li[ng-class="a4RetailClass"]')
            .pause(CONSTANTS.DEFAULT_MILLISECONDS_PAUSE)
            .verify.containsText('div[id="notificationDiv"]', 'Successfully subscribe for app.')
            .end()
    },

    'Set default location and app' : function (browser) {
        browser
            .loadPage(CONSTANTS.SETTINGS_URL)
            .selectLocation(CONSTANTS.ORGANIZATION_KEY,  CONSTANTS.NEW_LOCATION_KEY)
            .pause(CONSTANTS.DEFAULT_MILLISECONDS_PAUSE)
            .click('select[id="selectApp"]')
            .waitForElementVisible('option[label="a4Furniture"]', CONSTANTS.DEFAULT_MILLISECONDS)
            .click('option[label="a4Furniture"]')
            .pause(CONSTANTS.DEFAULT_MILLISECONDS_PAUSE)
            .click('button[id="changeDefaultValuesButton"]')
            .pause(CONSTANTS.DEFAULT_MILLISECONDS_PAUSE)
            .verify.containsText('div[id="notificationDiv"]', 'Successfully updated default values.')
            .loadPage(CONSTANTS.APPS_URL)
            .pause(CONSTANTS.DEFAULT_MILLISECONDS_PAUSE)
            .verify.containsText('select[id="selectOrganization"]', '   newLoc')
            .loadPage(CONSTANTS.SETTINGS_URL)
            .pause(CONSTANTS.DEFAULT_MILLISECONDS_PAUSE)
            .verify.containsText('select[id="selectOrganization"]', '   newLoc')
            .end()
    },

    'Add users to location' : function (browser) {
        browser
            .loadPage(CONSTANTS.ORGANIZATIONS_URL)
            .selectLocation(CONSTANTS.ORGANIZATION_KEY,  CONSTANTS.NEW_LOCATION_KEY)
            .click('li[id="addUser"]')
            .waitForElementVisible('form[id="addUserForm"]', CONSTANTS.DEFAULT_MILLISECONDS)
            // add first user to newly created location
            .setValue('input[ng-model="addUserEmail"]', CONSTANTS.USER_FOR_ADD_EMAIL)
            .click('button[id="addUserButton"]')
            .pause(CONSTANTS.DEFAULT_MILLISECONDS_PAUSE)
            .verify.containsText('div[id="notificationDiv"]', 'Successfully added user.')
            // add second user to default location
            .click('option[value="' + CONSTANTS.ORGANIZATION_KEY + '$**##__##**$' + CONSTANTS.DEFAULT_LOCATION_KEY + '"]')
            .click('li[id="addUser"]')
            .waitForElementVisible('form[id="addUserForm"]', CONSTANTS.DEFAULT_MILLISECONDS)
            .setValue('input[ng-model="addUserEmail"]', CONSTANTS.SECOND_USER_EMAIL)
            .click('button[id="addUserButton"]')
            .pause(CONSTANTS.DEFAULT_MILLISECONDS_PAUSE)
            .verify.containsText('div[id="notificationDiv"]', 'Successfully added user.')
            .end()
    },

    'Delete location with newly added user' : function (browser) {
        browser
            .loadPage(CONSTANTS.ORGANIZATIONS_URL)
            // log out the old user
            .execute('document.getElementById("logout").click()')
            .pause(CONSTANTS.DEFAULT_MILLISECONDS_PAUSE)
            // log in the newly added user
            .loginUser(CONSTANTS.USER_FOR_ADD_EMAIL, CONSTANTS.USER_PASSWORD)
            .loadPage(CONSTANTS.ORGANIZATIONS_URL)
            // delete location
            .selectLocation(CONSTANTS.ORGANIZATION_KEY,  CONSTANTS.NEW_LOCATION_KEY)
            .click('li[id="removeLocation"]')
            .waitForElementVisible('form[id="removeLocationForm"]', CONSTANTS.DEFAULT_MILLISECONDS)
            .setValue('input[id="userLocationRemove"]', CONSTANTS.NEW_LOCATION_KEY)
            .click('input[id="removeLocationCheckbox"]')
            .click('button[id="removeLocationButton"]')
            .pause(CONSTANTS.DEFAULT_MILLISECONDS_PAUSE)
            .verify.containsText('div[id="notificationDiv"]', 'Successfully removed location.')
            .end()
    },

    'Remove user' : function (browser) {
        browser
            .loadPage(CONSTANTS.ORGANIZATIONS_URL)
            .selectLocation(CONSTANTS.ORGANIZATION_KEY,  CONSTANTS.DEFAULT_LOCATION_KEY)
            .click('li[id="removeUser"]')
            .waitForElementVisible('form[id="removeUserForm"]', CONSTANTS.DEFAULT_MILLISECONDS)
            .setValue('input[ng-model="userRemoveEmail"]', CONSTANTS.SECOND_USER_EMAIL)
            .click('button[id="removeUserButton"]')
            .pause(CONSTANTS.DEFAULT_MILLISECONDS_PAUSE)
            .verify.containsText('div[id="notificationDiv"]', 'Successfully removed user.')
            .end()
    },

    'Transfer ownership' : function (browser) {
        browser
            .loadPage(CONSTANTS.ORGANIZATIONS_URL)
            .waitForElementPresent('select[id="selectOrganization"]', CONSTANTS.DEFAULT_MILLISECONDS)
            .click('option[value="' + CONSTANTS.ORGANIZATION_KEY + '"]')
            .waitForElementPresent('li[id="changeOwner"]', CONSTANTS.DEFAULT_MILLISECONDS)
            .click('li[id="changeOwner"]')
            .waitForElementVisible('form[id="changeOwnerForm"]', CONSTANTS.DEFAULT_MILLISECONDS)
            .setValue('input[ng-model="newOwnerEmail"]', CONSTANTS.USER_FOR_ADD_EMAIL)
            .click('input[id="changeOwnerCheckbox"]')
            .click('button[id="changeOwnerButton"]')
            .pause(CONSTANTS.DEFAULT_MILLISECONDS_PAUSE)
            .verify.containsText('div[id="notificationDiv"]', 'Ownership transferred.')
            .end()
    },

    'Delete organization with newly added owner' : function (browser) {
        browser
            .loadPage(CONSTANTS.ORGANIZATIONS_URL)
            // log out the default user
            .execute('document.getElementById("logout").click()')
            .pause(CONSTANTS.DEFAULT_MILLISECONDS_PAUSE)
            // log in with the new organization owner
            .loginUser(CONSTANTS.USER_FOR_ADD_EMAIL, CONSTANTS.USER_PASSWORD)
            .loadPage(CONSTANTS.ORGANIZATIONS_URL)
            // delete organizatin
            .waitForElementVisible('select[id="selectOrganization"]', CONSTANTS.DEFAULT_MILLISECONDS)
            .click('option[value="' + CONSTANTS.ORGANIZATION_KEY + '"]')
            .click('li[id="deleteOrganization"]')
            .waitForElementVisible('form[id="removeOrganizationForm"]', CONSTANTS.DEFAULT_MILLISECONDS)
            .setValue('input[id="organizationsDelete"]', CONSTANTS.ORGANIZATION_KEY)
            .click('input[id="removeOrganizationCheckbox"]')
            .click('button[id="removeOrganizationButton"]')
            .pause(CONSTANTS.DEFAULT_MILLISECONDS_PAUSE)
            .verify.containsText('div[id="notificationDiv"]', 'Successfully removed organization.')
            .waitForElementNotPresent('option[value="' + CONSTANTS.ORGANIZATION_KEY + '"]', CONSTANTS.DEFAULT_MILLISECONDS)
            .end()
    }
}
