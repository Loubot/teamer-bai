'use strict';

let winston = require('../config/winston-config').load_winston()
let models = require('../models')
let credential = require('credential')
let pw = credential()


module.exports.controller = function( app, strategy ) {

	app.get('/user', strategy.authenticate(), function( req, res ) {
		console.log( '/user user_controller')

		models.User.findAll({
			where: { id: 1 },
			include: [{
				  	model: models.Event,
				  	attributes: [ 'createdAt'],
					through: {
						where: { userId: 1 }
					}
			}]
		}).then( user => {
			res.json( user )
		}).catch( err => {
			winston.debug( 'findall error' )
			winston.debug( err )
			res.status( 500 ).json( err )
		})
		
	})

	app.get( '/users', strategy.authenticate(), ( req, res ) => {
		winston.debug( '/users user_controller' )

		models.User.findAll().then( users => {
			winston.debug( 'users' )
			winston.debug( users )
			res.json( users )
		}).catch( err => {
			winston.debug( 'Find all users error' )
			winston.debug( err )
			res.status( 500 ).json( err )
		})
	})

	app.post( '/add-user', strategy.authenticate(), function( req, res ) {
		winston.debug( 'user_controller /add-user' )
		winston.debug( req.body )

		pw.hash( 'pass', function( err, hash ) {
			if( err ){
				return res.status( 500 ).json( 'Failed to hash password' )
			} else {
				models.User.create({
					phone: req.body.phone, 
							firstName: req.body.firstName,
							lastName: req.body.lastName,
							email: req.body.email,
							password: hash
				}).then( user => {
					res.json( user )
				}).catch( err => {
					res.status( 500 ).json( err )
				})
			}
		})

		
		// models.User.findOne({
		// 	where: { id: req.body.id }
		// }).then( user => {
		// 	winston.debug( 'findOne success' )
		// 	winston.debug( user )
		// 	if( user ) {
		// 		user.update({
		// 			phone: req.body.phone, 
		// 			firstName: req.body.firstName,
		// 			lastName: req.body.lastName,
		// 			email: req.body.email
		// 		}).then( userUp => {
		// 			winston.debug( 'User updated' )
		// 			winston.debug( userUp )
		// 			models.User.findAll().then( users => {
		// 				res.json( users )
		// 			})
		// 		}).catch( failedUp => {
		// 			winston.debug( 'Failed to update user' )
		// 			winston.debug( failedUp )
		// 			res.status( 500 ).json( failedUp )
		// 		})
		// 	}
		// }).catch( err => {
		// 	winston.debug( 'Find one failed' )
		// 	winston.debug( err )
		// 	res.status( 500 ).json( err )
		// })
		
	})


	
}