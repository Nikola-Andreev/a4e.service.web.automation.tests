const CONSTANTS = require('../constants.js')

exports.command = function(url) {
    
    this
        .url(url)
        .pause(CONSTANTS.DEFAULT_MILLISECONDS_PAUSE)
        
    return this
}
