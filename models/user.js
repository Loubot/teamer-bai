'use strict';
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        email: 
            {
                type: DataTypes.STRING,
                unique: true
            },
        password: DataTypes.STRING,
        phone: DataTypes.STRING
    }, {
        // defaultScope: {
        //   attributes: { exclude: [ 'password' ] }
        // }
    });
    User.associate = function(models) {

        //Event
        User.hasMany(models.Event, {
            foreignKey: 'creatorId',
            sourceKey: 'id'
        })
        User.belongsToMany(models.Event, {
            through: 'EventJoins'
        })

        //Invitation
        User.hasMany(models.Invitation, {
            foreignKey: 'userId',
            sourceKey: 'id'
        })
    };
    return User;
};