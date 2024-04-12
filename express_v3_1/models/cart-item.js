const { DataTypes } = require("sequelize");
const sequelize = require("../config/postgre-config");

const CartItem = sequelize.define(
  "cartItem",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },

    quantity: {
      type: DataTypes.INTEGER,
      default: 0,
    },
  },
  {
    tableName: "cart_item",
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  }
);

module.exports = CartItem;
