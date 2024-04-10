const { DataTypes } = require("sequelize");

const sequelize = require("../config/postgre-config");

const User = sequelize.define("user", {
  id: {
    type: DataTypes.UUID,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: DataTypes.STRING(100),
  email: DataTypes.STRING(100),
});

module.exports = User;
