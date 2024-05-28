require("dotenv").config();

const DB_CONNECTION = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PWD,
};

module.exports = { DB_CONNECTION };
