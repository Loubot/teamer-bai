'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return [
      queryInterface.addColumn( 'Users', 'password', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn( 'Users', 'firstName', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn( 'Users', 'lastName', {
        type: Sequelize.STRING
      })
    ]

  },

  down: (queryInterface, Sequelize) => {
    return [
      queryInterface.removeColumn( 'Users', 'password'),
      queryInterface.removeColumn( 'Users', 'firstnName'),
      queryInterface.removeColumn( 'Users', 'lastName')
    ]
  }
};
