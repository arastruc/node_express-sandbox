const { DataTypes } = require("sequelize");
const sequelize = require("../config/postgre-config");

const OrderItem = sequelize.define(
  "orderItem",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    tableName: "order_item",
  }
);

module.exports = OrderItem;
