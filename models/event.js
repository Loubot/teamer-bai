'use strict';
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    creatorId: DataTypes.INTEGER
  }, {});
  Event.associate = function(models) {
    Event.belongsTo( models.User, { foreignKey: 'creatorId', sourceKey: 'id' } )
  };
  return Event;
};