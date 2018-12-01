'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        
        return queryInterface.bulkInsert('Events', [
            {
                creatorId: 1,
                startTime: setDate( 1 ),
                endTime: addHour( setDate( 1 ) ),
                maxNumber: 10
            },
            {
                creatorId: 1,
                startTime: setDate( 2 ),
                endTime: addHour( setDate( 2 ) ),
                maxNumber: 10
            },
            {
                creatorId: 1,
                startTime: setDate( 3 ),
                endTime: addHour( setDate( 3 ) ),
                maxNumber: 10
            },
            {
                creatorId: 1,
                startTime: setDate( 4 ),
                endTime: addHour( setDate( 4 ) ),
                maxNumber: 10
            }

        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Events', null, {})
    }
};

let setDate = function( days ) {
    let date = new Date()
    return roundMinutes( new Date( date.setDate( date.getDate() + days ) ) )
}

let addHour = function( date ) {
    date.setTime(date.getTime() + (1*60*60*1000) )
    return date
}

let roundMinutes = function ( date ) {

    let p = 60 * 60 * 1000; // milliseconds in an hour
    return new Date(Math.round(date.getTime() / p ) * p);
}