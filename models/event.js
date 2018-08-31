'use strict';
module.exports = (sequelize, DataTypes) => {
    var Event = sequelize.define('Event', {
        creatorId: DataTypes.INTEGER,
        startTime: DataTypes.DATE,
        endTime: DataTypes.DATE
    }, {});
    Event.associate = function(models) {
        Event.belongsToMany(models.User, {
            through: 'EventJoins'
        })
    };
    return Event;
};