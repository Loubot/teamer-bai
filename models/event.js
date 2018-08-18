'use strict';
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    userId: DataTypes.INTEGER
  }, {});
  Event.associate = function(models) {
    Event.belongsTo( models.User )
  };
  return Event;
};