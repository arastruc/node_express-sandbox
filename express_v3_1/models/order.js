const { DataTypes } = require("sequelize");
const sequelize = require("../config/postgre-config");

const Order = sequelize.define(
  "order",
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },

    totalPrice: {
      type: DataTypes.FLOAT,
    },
  },
  {
    tableName: "order",
  }
);

module.exports = Order;
