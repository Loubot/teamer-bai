'use strict',

module.exports = {
  development: {
    username: 'loubot',
    password: 'pass',
    database: 'teamer_bai',
    host: 'localhost',
    dialect: 'mysql',
    logging: true
  },
  production: {
    username: process.env.PORT_DB_USERNAME,
    password: process.env.PORT_DB_PASSWORD,
    host: process.env.PORT_DB_HOST,
    database: process.env.PORT_DB_NAME,
    dialect: 'mysql',
  },
}
;
