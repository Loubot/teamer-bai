'use strict'

var winston = require('winston');
module.exports = {

    

    load_winston: function() {
        const logger = winston.createLogger({
            level: 'debug',
            format: winston.format.json(),
            transports: [
              //
              // - Write to all logs with level `info` and below to `combined.log` 
              // - Write all logs error (and below) to `error.log`.
              //
              new winston.transports.File({ filename: 'logfile.log', level: 'debug' })
            ]
          });
        return logger
    }
   
}