const { parseCSV } = require("../lib/parse_csv");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("diets").del();

  const records = await parseCSV("./lib/csv/diets.csv");
  await knex("diets").insert(records);
};
