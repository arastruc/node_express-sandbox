const Liquibase = require("liquibase").Liquibase;
const LiquibaseLogLevels = require("liquibase").LiquibaseLogLevels;

const POSTGRESQL_DEFAULT_CONFIG =
  require("liquibase").POSTGRESQL_DEFAULT_CONFIG;

const myConfig = {
  ...POSTGRESQL_DEFAULT_CONFIG,
  changeLogFile: "changelog.xml",
  url: "jdbc:postgresql://localhost:5432/node",
  username: "postgres",
  password: "admin",
  liquibaseSchemaName: "public",
  logLevel: LiquibaseLogLevels.Debug,
};
const instTs = new Liquibase(myConfig);

exports.instance = instTs;
