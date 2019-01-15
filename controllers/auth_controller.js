'use strict';

let credential = require('credential')
let jwt = require("jwt-simple")
let config = require("../config/strategy-config")
let pw = credential()
let models = require( '../models' )
let Sequelize = require( 'sequelize' )
let message = require('../helpers/message_sender' )
let winston = require('../config/winston-config').load_winston()


module.exports.controller = function( app, strategy ) {
	app.post('/login', function( req, res ) {
		console.log( 'login' )
		console.log( req.body )
		if (req.body.email && req.body.password ) {
	        
	        models.User.scope( 'withPassword' ).findOne({
				where: { email: req.body.email }
			}).then( user => {
				winston.debug( 'Found user' )
				winston.debug( user )
				if ( user ) {
					pw.verify( user.password, req.body.password, function( err, isValid ) {
						if (err) { 
							winston.debug( 'Password verify failed' )
							console.log(err)
							throw err; 
						}
						user.password = ""
						winston.debug( user )
						console.log(isValid)
						if ( isValid ) {
							winston.debug( 'Password is valid' )
							var payload = {
								id: user.id
							}
							var token = jwt.encode(payload, config.jwtSecret);
							res.json( [ token, user ] )
						} else {
							winston.debug( 'Password is invalid' )
							res.sendStatus( 401 )
						}
					})
					
				} else {
					winston.debug( 'Failed to find user' )
					res.sendStatus(401);
				}
			}).catch( err => {
				winston.debug( 'Failed to find user' )
				winston.debug( err )
			})
		        
	    } else {
	        res.sendStatus(401);
	    }

		
	})


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

						

						var token = jwt.encode(payload, config.jwtSecret)
						res.json( [ token, user ] )
						
						
					} else {
						console.log( 'not created' )
						res.sendStatus( 400 )
					}
					
				}).catch(Sequelize.ValidationError, function (err) {
					res.status(422).json( err )
					console.log( err )
				}).catch(errs => { 
					console.log( errs )
					res.status( 422).json( errs)
				
				});
			}
		})
		
	})

	app.post( '/update-password', ( req, res ) => {
		console.log( '/update-password auth_controller' )
		console.log( req.body )
		// message.reset_password( req.body.email )
		models.User.findOne({ 
			where: { email: req.body.email }
		}).then( user => {
			pw.hash( 'pass', function( err, hash ) {
				user.update( { password: hash } ).then( update => {
					res.json( update )
				}).catch( err => {
					res.status( 500 ).json( err )
				})
			})
		})
	})
};
