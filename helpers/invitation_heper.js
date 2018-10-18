'use strict'

let winston = require('../config/winston-config').load_winston()
let messenger = require('../helpers/message_sender.js')

module.exports = {

    create_invitation: function( users ) {
        winston.debug( 'Invitation helper create_invitation' )
    }
}