'use strict'

let winston = require('../config/winston-config').load_winston()
let models = require( '../models' )
let messenger = require('./message_sender.js')

module.exports = {

    create_invitation: function( users, event ) {
        winston.debug( 'Invitation helper create_invitation' )
        winston.debug( JSON.stringify( users ) )
        winston.debug( JSON.stringify( event ) )

        let count = 0
        
        let do_invite_create = function( users, count, event ) {
            if ( count === ( users.length ) ) return null
            
            winston.debug( 'Recursive invite create invitation_helper' )
            winston.debug( count )
            winston.debug( users.length )

            models.Invitation.create( {
                userId: users[ count ].id,
                eventId: event.id
            }).then( invite => {
                winston.debug( 'Invite created' )
                winston.debug( invite )
                messenger.invite_players( invite.id, users[ count ] )
                do_invite_create( users, ++count, event )
            }).catch( err => {
                winston.debug( err )
                do_invite_create( users, ++count, event )
            })
        }

        do_invite_create( users, count, event )
    }
}