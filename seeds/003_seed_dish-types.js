const { parseCSV } = require("../lib/parse_csv");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("dish_types").del();

  const records = await parseCSV("dish-types");
  await knex("dish_types").insert(records);
};
