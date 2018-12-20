'use strict';
module.exports = (sequelize, DataTypes) => {
    var Invitation = sequelize.define('Invitation', {
        userId: DataTypes.INTEGER,
        eventId: DataTypes.INTEGER,
        confirm: DataTypes.BOOLEAN
    }, {});
    Invitation.associate = function(models) {
        Invitation.belongsTo( models.Event, { foreignKey: 'id' } )
        Invitation.belongsTo( models.User, { foreignKey: 'id' } )
    };
    return Invitation;
};