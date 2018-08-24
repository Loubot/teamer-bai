'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    User.hasMany( models.Event, { foreignKey: 'creatorId', sourceKey: 'id' } )
    User.belongsToMany( models.Event, { through: 'EventJoins' } )
  };
  return User;
};