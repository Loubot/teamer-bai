'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        queryInterface.addColumn(
            'Invitation',
            'confirm',
            Sequelize.BOOLEAN
        );
    },

    down: (queryInterface, Sequelize) => {
        queryInterface.removeColumn(
            'Invitation',
            'confirm'
        );
    }
};