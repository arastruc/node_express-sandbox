const { DataTypes } = require("sequelize");

const sequelize = require("../config/postgre-config");

const User = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: DataTypes.STRING(100),
    email: DataTypes.STRING(100),
  },
  {
    tableName: "user",
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  }
);

module.exports = User;
