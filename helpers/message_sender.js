'use strict'

let winston = require('../config/winston-config').load_winston()

module.exports = {
    send_mail: function(data) {
        winston.debug('Attempting to send mail')
        winston.debug(data)

        let SibApiV3Sdk = require('sib-api-v3-sdk');
        let defaultClient = SibApiV3Sdk.ApiClient.instance;

        // Configure API key authorization: api-key
        let apiKey = defaultClient.authentications['api-key'];
        apiKey.apiKey = process.env.send_in_blue
        // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
        //apiKey.apiKeyPrefix = 'Token';

        let apiInstance = new SibApiV3Sdk.SMTPApi();

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
    }
}