// Update with your config settings.
const { DB_CONNECTION } = require("./lib/config");
const config = {
  client: "pg",
  connection: DB_CONNECTION,
};

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: config,

  staging: {
    ...config,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },

  production: {
    ...config,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};
