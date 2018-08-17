'use strict';
module.exports = (sequelize, DataTypes) => {
  var Event = sequelize.define('Event', {
    userId: DataTypes.INTEGER
  }, {});
  Event.associate = function(models) {
    models.Event.belongsTo( models.User )
  };
  return Event;
};

