'use strict'

let winston = require('../config/winston-config').load_winston()
let models = require('../models')

module.exports.controller = function( app, strategy ) {

    app.get( '/invitations', strategy.authenticate(), function( req, res ) {
        winston.debug( '/invitations invitation_controller' )
        models.Invitation.findAll().then( invitations => {
            winston.debug( 'got all invites' )
            winston.debug( invitations )
            res.json( invitations )
        }).catch( err => {
            winston.debug( 'Get all invites failed' )
            winston.debug( err )
            res.status( 500 ).json( err )
        })
    })

    app.post( '/invitation/event/:id', strategy.authenticate(), function( req, res ) {
        winston.debug( '/invitation/:id invitation_controller' )
        winston.debug( req.params )
        winston.debug( req.body )
        models.Event.findOne({
            where: { id: req.params.id }
        }).then( event => {
            winston.debug( 'Found event' )
            winston.debug( event )
            res.json( event )
        }).catch( err => {
            winston.debug( 'Failed to find event' )
            winston.debug( err )
            res.status( 500 ).json( err )
        })
    })
}