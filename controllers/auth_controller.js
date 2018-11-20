'use strict';

let credential = require('credential')
let jwt = require("jwt-simple")
let config = require("../config/strategy-config")
let pw = credential()
let models = require( '../models' )
let Sequelize = require( 'sequelize' )


module.exports.controller = function( app, strategy ) {
	app.post('/login', function( req, res ) {
		console.log( 'login' )
		if (req.body.email && req.body.password ) {
	        
	        models.User.findOne({
	        			where: { email: req.body.email }
	        		}).then( user => {
	        			if (user) {
	        				pw.verify( user.password, req.body.password, function( err, isValid ) {
	        				  	if (err) { 
	        				  		console.log(err)
	        				  		throw err; 
	        				  	}
	        				  	console.log(isValid)
	        				  	if ( isValid ) {
	        				  		var payload = {
	        				  	    	id: user.id
	        				  		}
	        				  		var token = jwt.encode(payload, config.jwtSecret);
	        				  		res.json( token )
	        				  	} else {
	        				  		
	        				  		res.sendStatus( 401 )
	        				  	}
	        				})
				            
				        } else {
				            res.sendStatus(401);
				        }
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
						res.json( token )
						
						
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
};
