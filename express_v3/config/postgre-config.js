const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "node",
  password: "admin",
  port: 5432,
});

exports.pool = pool;