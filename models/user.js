'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    User.hasMany( models.Event, { foreignKey: 'creatorId', sourceKey: 'id' } )
    User.belongsToMany( models.Event, { as: 'userEvents', through: 'eventJoins', foreignKey: 'userId', otherKey: 'eventId' } )
  };
  return User;
};