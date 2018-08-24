'use strict';
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    creatorId: DataTypes.INTEGER,
    phone: DataTypes.STRING
  }, {});
  Event.associate = function(models) {
    Event.belongsToMany( models.User, { through: 'EventJoins' } )
  };
  return Event;
};

