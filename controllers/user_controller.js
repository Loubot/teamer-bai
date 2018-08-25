'use strict';

let winston = require('../config/winston-config').load_winston()
let models = require('../models')


module.exports.controller = function( app, strategy ) {

	app.get('/user', strategy.authenticate(), function( req, res ) {
		console.log( '/user user_controller')

		models.User.findAll({
			where: { id: 2 },
			include: [{
				  	model: models.Event,
				  	attributes: [ 'createdAt'],
					through: {
						where: { userId: 2 }
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

	app.post( '/add-user', strategy.authenticate(), function( req, res ) {
		winston.debug( 'user_controller /add-user' )
		winston.debug( req.body )
		models.User.create({
			phone: req.body.phone, 
			firstName: req.body.firstName,
			lastName: req.body.lastName
		}).then( user => {
			winston.debug( 'User created' )
			winston.debug( user )
			res.json( user )
		}).catch( err => {
			winston.debug( 'Failed to create user' )
			winston.debug( err )
			res.status( 500 ).json( err )
		})
	})


	
}