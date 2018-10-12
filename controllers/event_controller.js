'use strict'

let winston = require('../config/winston-config').load_winston()
let models = require( '../models' )
let eventHelper = require( '../helpers/event_helper' )
let text = require('textbelt')
let messenger = require( '../helpers/message_sender.js' )


module.exports.controller = function( app, strategy ) {

    app.post( '/event', strategy.authenticate(), function( req, res ) {
        
        winston.debug( '/event post')
        // eventHelper in ../helpers/        
        models.Event.create( {
            startTime: eventHelper.convertStartDate( req.body ),
            endTime: eventHelper.convertEndDate( req.body ),
            creatorId: req.user.id
        } ).then( function( event ) {
            winston.debug( 'Created event' )
            winston.debug( event )
            event.addUser( req.user.id ) // Add user to event
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
        var opts = {
            fromAddr: 'some@email.com',  // "from" address in received text
            fromName: 'joe smith',       // "from" name in received text
            region:   'ie',              // region the receiving number is in: 'us', 'canada', 'intl'
            subject:  'bla bla'        // subject of the message
          }
        winston.debug( opts )
        winston.debug( text )
        
    })

    app.get( '/events', strategy.authenticate(), function( req, res ) {
        winston.debug( '/events events_controller' )
        winston.debug( req.body )
        models.Event.findAll().then( events => {
            winston.debug( 'Got events' )
            winston.debug( events )
            res.json( events )
        }).catch( err => {
            winston.debug( 'Find events err' )
            winston.debug( err )
            res.json( err )
        })
    })

    app.post( '/event/:id/invite-all', strategy.authenticate(), function( req, res ) {
        winston.debug( '/invite-all events_controller' )
        winston.debug( req.params )
        models.User.findAll().then( users => {
            winston.debug( 'Found all users' )
            messenger.invite_players( users )
            res.json( 'hup' )
        }).catch(  err => {
            winston.debug( 'Find all users failed' )
            winston.debug( err )
            res.json( err )
        })

    })

    app.post( '/event/:id/add-user', strategy.authenticate(), function( req, res ) {
        winston.debug( '/event/:id/add-user' )
        winston.debug( req.params )
        
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