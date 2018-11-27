'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('EventJoins', [
            {
                EventId: 1,
                UserId: 1
            }
            

        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('EventJoins', null, {})
    }
};