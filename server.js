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

var SibApiV3Sdk = require('sib-api-v3-sdk');

var defaultClient = SibApiV3Sdk.ApiClient.instance;

// Configure API key authorization: api-key
var apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = "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"
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//apiKey.apiKeyPrefix['api-key'] = "Token"

var api = new SibApiV3Sdk.AccountApi()
api.getAccount().then(function(data) {
  console.log('API called successfully. Returned data: ' + data);
}, function(error) {
  console.error(error);
});


var request = require("request");
// console.log( request )
var options = { method: 'POST',
  url: 'https://api.sendinblue.com/v3/smtp/email',
  headers: { 'api-key': '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' },
  body: 
   { tags: [ 'sss' ],
     sender: { name: 'Louis', email: 'louisangelini@gmail.com' },
     to: [ { email: 'lllouis@yahoo.com', name: 'Aidan' } ],
     subject: 'Me balls',
     replyTo: { email: 'louisangelini@gmail.com', name: 'Louis' },
     textContent: 'Hell bollux' },
  json: true };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});

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



var port = process.env.PORT || 5000;
app.listen(port);
console.log('server started '+ port);