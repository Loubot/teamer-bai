'use strict';

let winston = require('../config/winston-config').load_winston()
let models = require('../models')


module.exports.controller = function( app, strategy ) {

	app.get('/user', strategy.authenticate(), function( req, res ) {
		console.log( '/user user_controller')

		models.User.findAll({
			include: [{
			  model: models.Event
			}]
		}).then( user => {
			res.json( user )
		}).catch( err => {
			res.status( 500 ).json( err )
		})
		
	})


	
}