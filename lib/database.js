const { DB_CONNECTION } = require("./config");

const knex = require("knex")({
  client: "pg",
  connection: DB_CONNECTION,
});

const getEntitiesByNames = async (names) => {
  if (!names.length) return [];

  // Generate raw sql comparison and remove '
  const whereString =
    "replace(name, '''', '') ilike any(array[" +
    names.map((_) => "?").join(",") +
    "]) ";

  const result = await knex
    .select(knex.raw("'city' as entity"), "*")
    .from("cities")
    .whereRaw(knex.raw(whereString, [...names]))
    .unionAll([
      knex
        .select(knex.raw("'brand'"), "*")
        .from("brands")
        .whereRaw(knex.raw(whereString, [...names])),
      knex
        .select(knex.raw("'diet'"), "*")
        .from("diets as d")
        .whereRaw(knex.raw(whereString, [...names.map((w) => w + "%")])),
      knex
        .select(knex.raw("'dishType'"), "*")
        .from("dish_types as dt")
        .whereRaw(knex.raw(whereString, [...names])),
    ]);

  return result;
};

module.exports = {
  dbClient: knex,
  getEntitiesByNames,
};
