'use strict';

module.exports.controller = function( app, strategy ) {
    app.post( '/register', function( req, res ) {
        console.log( req.body )
        res.json( req.body )
    })
};
