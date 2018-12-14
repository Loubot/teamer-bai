'use strict';
module.exports = (sequelize, DataTypes) => {
    var Event = sequelize.define('Event', {
        creatorId: DataTypes.INTEGER,
        startTime: DataTypes.DATE,
        endTime: DataTypes.DATE,
        maxNumber: DataTypes.INTEGER
    }, {});
    Event.associate = function(models) {
        Event.belongsToMany(models.User, {
            through: 'EventJoins'
        })
        Event.hasMany( models.Invitation, { foreignKey: 'blaId', foreignKey: 'eventId' } )
    };
    return Event;
};