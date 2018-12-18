'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Invitations', [
            {
                EventId: 1,
                UserId: 1,
                confirm: 1
            },            
            {
                EventId: 2,
                UserId: 1,
                confirm: 0
            }
            

        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Invitations', null, {})
    }
};