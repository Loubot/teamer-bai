'use strict'

let winston = require('../config/winston-config').load_winston()
let models = require('../models')
let invitation_helper = require('../helpers/invitation_helper')

module.exports.controller = function(app, strategy) {

    app.get('/invitations', strategy.authenticate(), function(req, res) {
        winston.debug('/invitations invitation_controller')
        models.Invitation.findAll({
            include: [{
                all: true
            }]
        }).then(invitations => {
            winston.debug('got all invites')
            winston.debug(invitations)
            res.json(invitations)
        }).catch(err => {
            winston.debug('Get all invites failed')
            winston.debug(err)
            res.status(500).json(err)
        })
    })

    app.post('/invitation/event/:id', strategy.authenticate(), function(req, res) {
        winston.debug('/invitation/event/:id invitation_controller')
        winston.debug(req.params)
        winston.debug(req.body)
        models.User.findAll({
            where: {
                id: req.body
            }
        }).then(users => {
            winston.debug('Found Users')
            winston.debug(users)
            invitation_helper.create_invitation(users, req.params)
            res.json(req.body)
        }).catch(err => {
            winston.debug('Find users failed')
            winston.debug(err)
            res.status(500).json(err)
        })


    })

    app.post('/invitation/add-event', strategy.authenticate(), function(req, res) {
        winston.debug('/invitation/add-event invitation_controller')
        winston.debug(req.params)
        winston.debug(req.body)
        models.Event.findOne({
            where: {
                id: 1
            }
        }).then(event => {
            models.Invitation.findOne({
                where: {
                    id: 1
                }
            }).then(invite => {
                winston.debug('Found invite')
                winston.debug(invite)
                event.addInvitation(invite)
            })
            winston.debug('Found event')
            winston.debug(event)
            res.json(event)
        }).catch(err => {
            winston.debug('Failed to find event')
            winston.debug(err)
            res.status(500).json(err)
        })
    })

    //Confirm attendance
    app.put('/invitations/:id/user/:userId', strategy.authenticate(), function(req, res) {
        winston.debug('/invitations/:id/user/:userId invitation_controller')
        winston.debug(req.params)
        winston.debug(req.body)
        models.Invitation.update(
                req.body, {
                    returning: true,
                    where: {
                        id: req.params.id
                    }
                }
            ).then(function( rows ) {
                winston.debug('Invitation updated')
                winston.debug( rows )
                models.Invitation.findAll({
                    where: {
                        userId: req.params.userId
                    },
                    include: [{
                        all: true,
                        where: { 
                            startTime: {
                                $gt: new Date()
                            }
                        }
                    }]
                }).then( invitations => {
                    winston.debug( 'Found invitations' )
                    winston.debug( invitations )
                    res.json( invitations )
                })
            })
            .catch(err => {
                winston.debug('Failed to update invitaion')
                winston.debug(err)
                res.status(500).json(err)
            })
    })

    app.get('/invitations/user/:userId', strategy.authenticate(), function(req, res) {
        winston.debug('/invitations/user/:userId invitation_controller')
        winston.debug(req.params)
        winston.debug(req.body)
        models.Invitation.findAll({
            where: {
                userId: req.params.userId
            },
            include: [{
                all: true
            }]
        }).then(invites => {
            winston.debug('Found invites by userId')
            winston.debug(invites)
            res.json(invites)
        }).catch(err => {
            winston.debug('Failed to find invites by userId')
            winston.debug(err)
            res.status(500).json(err)
        })
    })
}