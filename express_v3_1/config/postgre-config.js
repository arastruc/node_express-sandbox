const Sequelize = require("sequelize");

//{
//   user: "postgres",
//   host: "localhost",
//   database: "node",
//   password: "admin",
//   port: 5432,
// })/ ;

const sequelize = new Sequelize(
  "postgres://postgres:admin@localhost:5432/node"
);

module.exports = sequelize;
