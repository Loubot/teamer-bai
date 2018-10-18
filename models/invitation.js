'use strict';
module.exports = (sequelize, DataTypes) => {
  var Invitation = sequelize.define('Invitation', {
    userId: DataTypes.INTEGER,
    eventId: DataTypes.INTEGER
  }, {});
  Invitation.associate = function(models) {
    // associations can be defined here
  };
  return Invitation;
};