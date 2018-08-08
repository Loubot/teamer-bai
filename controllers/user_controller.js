'use strict'

var models = require('../models')
var fs = require( 'fs')






module.exports.controller = function( app, strategy ) {

	app.get('/user', strategy.authenticate(), function( req, res ) {
		console.log( '/user user_controller')
		// console.log( req.query)
		// var params = { 
		//   Bucket: config.Bucket,
		//   Prefix: 'stuff/'
		// }
		// s3.listObjects( params, function( err, resp ) {
		// 	if ( err ) {
		// 		winston.debug( err )
		// 		res.json( err )
		// 	} else {
		// 		winston.debug( resp )
		// 		res.json( resp )
		// 	}
			
		// })

		winston.debug( "User " + req.user )
		res.json( req.user )
		return

		models.User.findOne({
			where: { id: 1 }, include: [ {model: models.Photo, as: 'photos' }]
		}).then( user => {
			res.json( user )
		}).catch( function( err ) {
			res.staus( 500 ).json( err )
		})
		
	})


	
}