'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Invitations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      eventId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
<<<<<<< HEAD
        defaultValue: Sequelize.fn('now')
=======
        defaultValue: Sequelize.NOW
>>>>>>> 454b993c7504e622b3d12f44a3cf999f29ed510b
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
<<<<<<< HEAD
        defaultValue: Sequelize.fn('now')
=======
        defaultValue: Sequelize.NOW
>>>>>>> 454b993c7504e622b3d12f44a3cf999f29ed510b
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('invitations');
  }
};