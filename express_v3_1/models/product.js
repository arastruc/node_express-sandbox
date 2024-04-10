const { DataTypes } = require("sequelize");
const sequelize = require("../config/postgre-config");

const Product = sequelize.define(
  "product",
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imageurl: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    tableName: "product",
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  }
);

module.exports = Product;
