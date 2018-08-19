'use strict'

let winston = require('../config/winston-config').load_winston()
let models = require( '../models' )


module.exports.controller = function( app, strategy ) {

    app.post( '/event', function( req, res ) {
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
        models.Event.findAll({
            where: {
                id: 1
            }
        }).then( function( event ) {
            winston.debug( 'hu[' )
            winston.debug( event )
            res.json( event )
        }).catch( function( err ) {
            winston.debug( 'Find event failed' )
            winston.debug( err )
        })
    })
}