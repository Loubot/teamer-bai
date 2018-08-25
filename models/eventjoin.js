'use strict';
module.exports = (sequelize, DataTypes) => {
  const EventJoins = sequelize.define('eventJoins', {
    status: DataTypes.STRING
  })

  return EventJoins
};