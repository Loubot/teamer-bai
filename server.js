var express = require('express');
var path = require('path');
var serveStatic = require('serve-static');
app = express();
// var winston = require('./config/winston-config').load_winston()
var models = require('./models');
var fs = require( 'fs' );
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
app.use(serveStatic(__dirname + "/dist"));

app.use( bodyParser.urlencoded ({
    extended: true
}));
app.use(bodyParser.json())


// Initialise passport
var passport = require("passport");
app.use( passport.initialize() );
let strategy = require('./config/strategy')( passport );

var models = require('./models');


/* Include all express controllers */
fs.readdirSync('./controllers').forEach(function (file) {
    if(file.substr(-3) == '.js') {
        var route = require('./controllers/' + file);
        route.controller( app, strategy );
        // route.controller( app, jwt, strategy );
    }
});

app.use(function(req, res, next){
    var whitelist = ['localhost:8080', 'localhost:5000']
    var host = req.get('host');
  
    whitelist.forEach(function(val, key){
      if (host.indexOf(val) > -1){
        res.setHeader('Access-Control-Allow-Origin', host);
      }
    })
  
    next();
})

var port = process.env.PORT || 5000;
app.listen(port);
console.log('server started '+ port);