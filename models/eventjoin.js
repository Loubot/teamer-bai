'use strict';
module.exports = (sequelize, DataTypes) => {
  var eventJoin = sequelize.define('eventJoin', {
    eventId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  eventJoin.associate = function(models) {
    // associations can be defined here
  };
  return eventJoin;
};