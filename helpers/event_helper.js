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

    add_to_event: function( id, invite ) {
        winston.debug( 'event_helper add_to_event( id )')
        models.Event.findOne({
            where: { id: id }
        }).then( event => {
            if( invite.confirm == true ){
                event.attending = ++event.attending 
            } else {
                event.attending = --event.attending 
            }
            
            event.save().then( updated => {
                return updated
            }).catch( fail => {
                winston.debug( 'Failed to update event' )
                winston.debug( fail )
                return fail
            })
        }).catch( err => {
            winston.debug( 'Failed to find event' )
            return err 
        })
    }
}