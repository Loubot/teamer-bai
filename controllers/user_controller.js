'use strict';

let models = require('../models')


module.exports.controller = function( app, strategy ) {

	app.get('/user', function( req, res ) {
		console.log( '/user user_controller')
        
        res.json( 'ok' )

		// winston.debug( "User " + req.user )
		// res.json( req.user )
		// return

		// models.User.findOne({
		// 	where: { id: 1 }, include: [ {model: models.Photo, as: 'photos' }]
		// }).then( user => {
		// 	res.json( user )
		// }).catch( function( err ) {
		// 	res.staus( 500 ).json( err )
		// })
		
	})


	
}