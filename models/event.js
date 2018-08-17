'use strict';
module.exports = (sequelize, DataTypes) => {
  var Event = sequelize.define('Event', {
    creator: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function( models ) {
        Event.belongsTo( models.User, {
          foreignKey: 'creator',
          as: 'events'
        } ) 
      }
    }
  });
  
  return Event;
};
