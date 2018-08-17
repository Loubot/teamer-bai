'use strict';

let models = require('../models')


module.exports.controller = function( app, strategy ) {

	app.get('/user', function( req, res ) {
		console.log( '/user user_controller')
        
        

		models.User.findOne({
			where: { id: 1 }, include: [{all:true}]
		}).then( user => {
			console.log( user )
			res.json( user )
		}).catch( function( err ) {
			console.log( 'error' )
			console.log( err )
			res.status( 500 ).json( err )
		})
		
	})


	
}