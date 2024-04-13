const { DataTypes } = require("sequelize");
const sequelize = require("../config/postgre-config");

const Cart = sequelize.define(
  "cart",
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
    tableName: "cart",
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  }
);

module.exports = Cart;
