'use strict'

let winston = require('../config/winston-config').load_winston()
let models = require( '../models' )


module.exports.controller = function( app, strategy ) {

    app.post( '/event', strategy.authenticate(), function( req, res ) {
        console.log( winston )
        winston.debug( '/event post')
        winston.debug( JSON.stringify( req.body ) )
        models.Event.create( { creatorId: req.body.creatorId } ).then( function( event ) {
            winston.debug( 'Created event' )
            winston.debug( event )
            res.json( event )
        }).catch( function( err ) {
            winston.debug( 'Event creation failed' )
            winston.debug( err )
        })
    })

    app.get( '/event/1', function( req, res ) {
        winston.debug( '/event/1 asspociation' )
        winston.debug( req.params )
        models.Event.findOne({
            where: { id: 1 }, include: [{ all: true }]
        }).then( event => {
            winston.debug( 'Got event' )
            winston.debug( event )
            res.json( event )
        }).catch( err => {
            winston.debug( 'Find event err' )
            winston.debug( err )
            res.json( err )
        })
    })
}