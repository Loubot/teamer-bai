'use strict'

let winston = require('../config/winston-config').load_winston()
let models = require( '../models' )
let eventHelper = require( '../helpers/event_helper' )


module.exports.controller = function( app, strategy ) {

    app.post( '/event', strategy.authenticate(), function( req, res ) {
        
        winston.debug( '/event post')
        winston.debug( eventHelper.convertStartDate( req.body ) )
        
        models.Event.create( {
            startTime: eventHelper.convertStartDate( req.body ),
            endTime: eventHelper.convertEndDate( req.body ),
            creatorId: req.user.id
        } ).then( function( event ) {
            winston.debug( 'Created event' )
            winston.debug( event )
            res.json( event )
        }).catch( function( err ) {
            winston.debug( 'Event creation failed' )
            winston.debug( err )
            req.status( 500 ).json( err )
        })
        
    })

    app.get( '/event/:id', strategy.authenticate(), function( req, res ) {
        winston.debug( '/event/1 association' )
        winston.debug( req.body )
        models.Event.findOne({
            where: { id: req.params.id }, include: [{ all: true }]
        }).then( event => {
            winston.debug( 'Got event' )
            event.getUsers().then( users => { winston.debug( users )})
            winston.debug( event )
            res.json( event )
        }).catch( err => {
            winston.debug( 'Find event err' )
            winston.debug( err )
            res.json( err )
        })
    })
}