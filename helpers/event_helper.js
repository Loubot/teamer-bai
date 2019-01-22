'use strict'

let winston = require('../config/winston-config').load_winston()
let moment = require( 'moment' )
let models = require( '../models/index' )

module.exports = {
    // format time for sql
    convertStartDate:function( date ) {
        
        winston.debug( moment( date.startDate + 'T' + date.startTime + ':00Z').format( "YYYY-MM-DD HH:mm:ss" ) )
        return moment( date.startDate + 'T' + date.startTime + ':00Z').format( "YYYY-MM-DD HH:mm:ss" )
    },

    convertEndDate:function( date ) {
        
        winston.debug( moment( date.endDate + 'T' + date.endTime + ':00Z').format( "YYYY-MM-DD HH:mm:ss" ) )
        return moment( date.endDate + 'T' + date.endTime + ':00Z').format( "YYYY-MM-DD HH:mm:ss" )
    },

    add_to_event: function( id, invite, res ) {
        winston.debug( 'event_helper add_to_event( id )')
        models.Event.findOne({
            where: { id: id }
        }).then( event => {
            winston.debug( event.attending >= 10 )

            
            // Check if match is already full or empty and return errors if maths are wrong
            if ( event.attending >= 10 && event.confirm === true ) return res( 'Full' )
            if ( event.attending <= 0 && event.confirm === false ) return res( 'Empty' )


            if( invite.confirm == true ){
                event.attending = ++event.attending 
            } else {
                event.attending = --event.attending 
            }
            
            event.save().then( updated => {
                return res( null, updated )
            }).catch( fail => {
                winston.debug( 'Failed to update event' )
                winston.debug( fail )
                return res( fail )
            })
        }).catch( err => {
            winston.debug( 'Failed to find event' )
            return res( err )
        })
    }
}