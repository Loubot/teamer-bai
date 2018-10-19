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

    invite_players: function(player_list, eventId) {
        winston.debug('Attempting to send invite all mail')

        let count = 0

        let inviteEmailRecur = function(player_list, count) {
            winston.debug('createemaillist')
            winston.debug(createEmailList(player_list[count]))
            winston.debug('buildurl')
            winston.debug(buildUrl(eventId, player_list[count].id))
            if (count === (player_list.length - 1)) return null
            var options = {
                method: 'POST',
                url: 'https://api.sendinblue.com/v3/smtp/email',
                tags: ['ddd'],
                sender: {
                    name: 'Louis',
                    email: 'louisangelini@gmail.com'
                },
                to: createEmailList(player_list[count]),
                textContent: buildUrl(eventId, player_list[count].id),
                replyTo: {
                    email: 'louisangelini@gmail.com'
                },
                subject: 'Invite'
            }

            apiInstance.sendTransacEmail(options).then(function(data) {
                winston.debug('API called successfully. Returned data: ' + data)
                inviteEmailRecur(player_list, ++count)
            }, function(error) {
                winston.debug('Send in blue call failed')
                winston.debug(error);
                inviteEmailRecur(player_list, ++count)
            })


        }

        inviteEmailRecur(player_list, count)


    },

    send_email: function( body, event ) {
        winston.debug( 'message_sender.js')
        winston.debug( body )
        winston.debug( event )

        // models.User.findOne({
        //     where: { id: body.userId }
        // })
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
    }
}



var createEmailList = function(player) {
    // winston.debug('createmaillist called')
    // winston.debug( player )

    // winston.debug( 'createEmailList ' )
    // winston.debug( [{
    //     name: player.firstName,
    //     email: player.email
    // }])
    if (player.email === 'lllouis@yahoo.com' || player.email === 'louisangelini@gmail.com') {
        return [{
            name: player.firstName,
            email: player.email
        }]
    }


}

var buildUrl = function(eventId, playerId) {
    // winston.debug( 'buildUrl called' )
    // winston.debug( eventId + '   ' + playerId )
    // winston.debug ( 'http://localhost:5000/event/' + eventId + '/confirmation/' + playerId )
    return 'http://localhost:5000/event/' + eventId + '/confirmation/' + playerId
}