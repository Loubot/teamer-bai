'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    email: DataTypes.STRING
  }, {
    classMethods: {
      associate: function( models ) {
        User.hasMany( models.Event )
      }
    }
  });
  
  return User;
};