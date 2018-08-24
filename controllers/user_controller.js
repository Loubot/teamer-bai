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


	
}