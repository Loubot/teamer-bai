'use strict';
module.exports = (sequelize, DataTypes) => {
  var Invitation = sequelize.define('Invitation', {
    userId: DataTypes.INTEGER,
    eventId: DataTypes.INTEGER,
    confirm: DataTypes.BOOLEAN
  }, {});
  Invitation.associate = function(models) {
    // associations can be defined here
  };
  return Invitation;
};