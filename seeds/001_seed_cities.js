const { parseCSV } = require("../lib/parse_csv");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("cities").del();

  const records = await parseCSV("cities");
  await knex("cities").insert(records);
};
