'use strict';

let winston = require('../config/winston-config').load_winston()
let models = require('../models')


module.exports.controller = function( app, strategy ) {

	app.get('/user', strategy.authenticate(), function( req, res ) {
		console.log( '/user user_controller')

		models.User.findOne({
			where: { id: 1 }, include: [{all:true}]
		}).then( user => {
			// console.log( user )
			// user.getEvents().then( function( res ) {
			// 	console.log( 'getevents' )
			// 	console.log( res )
			// })
			user.getEvents().then( function( up ) {
				winston.debug( 'getEvents()' )
				winston.debug( up )
			}).catch( function( bla ) {
				winston.debug( 'getEvents failed' )
				winston.debug( bla )
			})
			res.json( user )
		}).catch( function( err ) {
			console.log( 'error' )
			console.log( err )
			res.status( 500 ).json( err )
		})
		
	})


	
}