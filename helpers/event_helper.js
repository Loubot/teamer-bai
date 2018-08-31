'use strict'

let winston = require('../config/winston-config').load_winston()
let moment = require( 'moment' )

module.exports = {
    
    convertStartDate:function( date ) {
        
        winston.debug( moment( date.startDate + 'T' + date.startTime + ':00Z').format( "YYYY-MM-DD HH:mm:ss" ) )
        return moment( date.startDate + 'T' + date.startTime + ':00Z').format( "YYYY-MM-DD HH:mm:ss" )
    },

    convertEndDate:function( date ) {
        
        winston.debug( moment( date.endDate + 'T' + date.endTime + ':00Z') )
        return moment( date.endDate + 'T' + date.endTime + ':00Z')
    }
}