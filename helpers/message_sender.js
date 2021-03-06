'use strict'

let winston = require('../config/winston-config').load_winston()

// Configure API key authorization: api-key

// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//apiKey.apiKeyPrefix = 'Token';
let SibApiV3Sdk = require('sib-api-v3-sdk');
let defaultClient = SibApiV3Sdk.ApiClient.instance;
let apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.send_in_blue

let apiInstance = new SibApiV3Sdk.SMTPApi();

module.exports = {
    send_mail: function(data) {
        winston.debug('Attempting to send mail')
        winston.debug(data)

        var options = {
            method: 'POST',
            url: 'https://api.sendinblue.com/v3/smtp/email',
            tags: ['ddd'],
            sender: {
                name: 'Louis',
                email: 'louisangelini@gmail.com'
            },
            to: [{
                    email: 'lllouis@yahoo.com',
                    name: 'Aidan'
                },
                {
                    email: 'louisangelini@gmail.com',
                    name: 'Aidan'
                }
            ],
            textContent: 'Hello Bollux',
            replyTo: {
                email: 'louisangelini@gmail.com'
            },
            subject: 'Hello'
        }

        apiInstance.sendTransacEmail(options).then(function(data) {
            console.log('API called successfully. Returned data: ' + data);
        }, function(error) {
            console.error(error);
        });
    },

    

    send_email: function( users, event ) {
        winston.debug( 'send_email message_sender.js')
        winston.debug( users )
        winston.debug( event )

        
        var options = {
            method: 'POST',
            url: 'https://api.sendinblue.com/v3/smtp/email',
            tags: ['ddd'],
            sender: {
                name: 'Louis',
                email: 'louisangelini@gmail.com'
            },
            to: user.email,
            textContent: buildUrl( event, user.id ),
            replyTo: {
                email: 'louisangelini@gmail.com'
            },
            subject: 'Invite'
        }

        apiInstance.sendTransacEmail(options).then(function(data) {
            winston.debug('API called successfully. Returned data: ' + data)
        }, function(error) {
            winston.debug('Send in blue call failed')
            winston.debug(error)
        })
    },

    reset_password: function( email ) {
        winston.debug( 'reset_password message_sender.js' )
        winston.debug( email )

        var options = {
            method: 'POST',
            url: 'https://api.sendinblue.com/v3/smtp/email',
            tags: ['Password reset'],
            sender: {
                name: 'Louis',
                email: 'louisangelini@gmail.com'
            },
            to: [{ email: 'lllouis@yahoo.com', name: 'Louis' }],
            textContent: 'story kid',
            replyTo: {
                email: 'louisangelini@gmail.com'
            },
            subject: 'Password reset'
        }
        apiInstance.sendTransacEmail(options).then(function(data) {
            winston.debug('API called successfully. Returned data: ' + data)
        }, function(error) {
            winston.debug('Send in blue call failed')
            winston.debug(error)
        })
    },

    invite_players: function( invite_id, player ) {
        winston.debug('Attempting to send invite all mail')
        // winston.debug(   player )
        // winston.debug( eventId )
        

        winston.debug( '11111111111111111111111111111' )
        var options = {
            method: 'POST',
            url: 'https://api.sendinblue.com/v3/smtp/email',
            tags: ['ddd'],
            sender: {
                name: 'Louis',
                email: 'lllouis@yahoo.com'
            },
            to: createEmailList( player ),
            textContent: buildUrl( invite_id ),
            replyTo: {
                email: 'lllouis@yahoo.com'
            },
            subject: 'Invite'
        }
        winston.debug( '222222222222222222222222222222222' )
        apiInstance.sendTransacEmail(options).then(function(data) {
            winston.debug('API called successfully. Returned data: ' + data)
            // inviteEmailRecur( player, ++count)
        }, function(error) {
            winston.debug('Send in blue call failed')
            winston.debug(error);
            // inviteEmailRecur( player, ++count)
        })

    },
}



var createEmailList = function(player) {
    winston.debug('createmaillist called')
    winston.debug( player )

    
    if (player.email === 'lllouis@yahoo.com' || player.email === 'louisangelini@gmail.com') {
        return [{
            name: player.firstName,
            email: player.email
        }]
    } else {
        return 'lllouis@yahoo.com'
    }


}

var buildUrl = function( inviteId ) {
    winston.debug( 'buildUrl called' )
    winston.debug( inviteId )
    winston.debug ( 'https://teamer-bai.herokuapp.com/invitation/' + inviteId  + '/confirm' )
    return 'https://teamer-bai.herokuapp.com/invitation/' + inviteId + '/confirm'
}