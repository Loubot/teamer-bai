'use strict';
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    creatorId: DataTypes.INTEGER
  }, {});
  Event.associate = function(models) {
    Event.belongsTo( models.User, { foreignKey: 'creatorId', sourceKey: 'id' } )
    Event.belongsToMany( models.User, { as: 'userEvents', through: 'eventJoins', foreignKey: 'eventId', otherKey: 'userId' })
  };
  return Event;
};