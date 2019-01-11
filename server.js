let express = require('express');
let path = require('path');
let serveStatic = require('serve-static');
app = express();
// let winston = require('./config/winston-config').load_winston()
let models = require('./models');
let fs = require( 'fs' );
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');
const history = require('connect-history-api-fallback')

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin,Authorization, XMLHttpRequest, X-Requested-With, Content-Type, application/x-www-form-urlencoded, Accept");
    next();
  });
server.get('/*', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})
app.use(serveStatic(__dirname + "/dist"));

app.use( bodyParser.urlencoded ({
    extended: true
}));
app.use(bodyParser.json())




// Initialise passport
let passport = require("passport");
app.use( passport.initialize() );
let strategy = require('./config/strategy')( passport );


/* Include all express controllers */
fs.readdirSync('./controllers').forEach(function (file) {
    if(file.substr(-3) == '.js') {
        let route = require('./controllers/' + file);
        route.controller( app, strategy );
        // route.controller( app, jwt, strategy );
    }
});





let port = process.env.PORT || 5000;
app.listen(port);
console.log('server started '+ port);