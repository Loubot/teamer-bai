'use strict'

let winston = require('../config/winston-config').load_winston()
let models = require('../models')
let invitation_helper = require( '../helpers/invitation_helper' )

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
        winston.debug( '/invitation/event/:id invitation_controller' )
        winston.debug( req.params )
        winston.debug( req.body )
        models.User.findAll({
            where: { id: req.body }
        }).then( users => {
            winston.debug( 'Found Users' )
            winston.debug( users )
            invitation_helper.create_invitation( users, req.params )
            res.json( req.body )
        }).catch( err => {
            winston.debug( 'Find users failed' )
            winston.debug( err )
            res.status( 500 ).json( err )
        })
        
        
    })
}