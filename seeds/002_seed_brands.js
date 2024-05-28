const { parseCSV } = require("../lib/parse_csv");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("brands").del();

  const records = await parseCSV("./lib/csv/brands.csv");
  await knex("brands").insert(records);
};
