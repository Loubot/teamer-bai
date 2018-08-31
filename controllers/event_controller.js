'use strict'

let winston = require('../config/winston-config').load_winston()
let models = require( '../models' )


module.exports.controller = function( app, strategy ) {

    app.post( '/event', strategy.authenticate(), function( req, res ) {
        
        winston.debug( '/event post')
        winston.debug( JSON.stringify( req.body ) )
        // res.json( req.body.data, req.body.user )
        // models.Event.create( req.body.data ).then( function( event ) {
        //     winston.debug( 'Created event' )
        //     winston.debug( event )
        //     res.json( event )
        // }).catch( function( err ) {
        //     winston.debug( 'Event creation failed' )
        //     winston.debug( err )
        // })
        res.json( req.body )
    })

    app.get( '/event/:id', strategy.authenticate(), function( req, res ) {
        winston.debug( '/event/1 association' )
        winston.debug( req.user.id )
        models.Event.findOne({
            where: { id: req.params.id }, include: [{ all: true }]
        }).then( event => {
            winston.debug( 'Got event' )
            winston.debug( event )
            res.json( req.user.id )
        }).catch( err => {
            winston.debug( 'Find event err' )
            winston.debug( err )
            res.json( err )
        })
    })
}