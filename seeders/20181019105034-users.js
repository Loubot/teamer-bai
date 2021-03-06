'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Users', [{
                firstName: 'John',
                lastName: 'Doe',
                email: 'demo@demo.com',
                phone: '0851231558',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            // {
            //     firstName: 'Aidan',
            //     lastName: 'Angelini',
            //     email: 'lllouis@yahoo.com',
            //     phone: '0877553302'
            // },
            {
                firstName: 'Dan',
                lastName: 'Boobs',
                email: 'louisangelini@gmail.com',
                phone: '0877543302',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                firstName: 'Tim',
                lastName: 'Floppy',
                email: 'j@b.com',
                phone: '0877553502',
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Users', null, {})
    }
};