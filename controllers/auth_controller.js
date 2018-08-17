'use strict';

let credential = require('credential')
let jwt = require("jwt-simple")
let config = require("../config/strategy-config")
let pw = credential()
let models = require( '../models' )
let Sequelize = require( 'sequelize' )


module.exports.controller = function( app, strategy ) {



    var hash_password = function( pass ) {
		pw.hash(pass, function (err, hash) {
			if (err) { throw err; }
			console.log( hash )
			return hash
		});
	}

	app.post( '/register', function( req, res ) {
		console.log('register')
		console.log( req.body )

		pw.hash( req.body.password, function( err, hash ) {
			if ( err ){
			
				res.sendStatus( 401 )
			} else {
			
				models.User.findOrCreate({
					where: { email: req.body.email, password: hash }
				}).spread( ( user, created ) => {
                    console.log( 'hup boi' )
					if ( created ) {
                        console.log( 'Created' )
						var payload = {
				  	    	id: user.id
						  }

						console.log( payload )
						  
						console.log( 'secret' )
						console.log( config )

						var token = jwt.encode(payload, config.jwtSecret)
						console.log( 'token' )
						console.log( token )
						res.json( token )
						
						
					} else {
						console.log( 'not created' )
						res.sendStatus( 400 )
					}
					
				}).catch(Sequelize.ValidationError, function (err) {
					res.status(422).json( err )
				}).catch(errs => res.status( 422).json( errs));
			}
		})
		
	})
};
