const { DB_CONNECTION } = require("./config");
const cartesianProduct = require("./cartesianProduct");

const knex = require("knex")({
  client: "pg",
  connection: DB_CONNECTION,
});

async function extractEntities(searchTerm) {
  let words = searchTerm.split(" ");

  // Filter out "at", "in", etc
  words = words.filter((word) => word.length > 2);
  words = words.map((w) => w.replace("'", ""));

  if (!words.length) return [];

  // Generate raw sql comparison and remove '
  const whereString =
    "replace(name, '''', '') ilike any(array[" +
    words.map((_) => "?").join(",") +
    "]) ";

  const result = await knex
    .select(knex.raw("'city' as entity"), "*")
    .from("cities")
    .whereRaw(knex.raw(whereString, [...words]))
    .unionAll([
      knex
        .select(knex.raw("'brand'"), "*")
        .from("brands")
        .whereRaw(knex.raw(whereString, [...words])),
      knex
        .select(knex.raw("'diet'"), "*")
        .from("diets as d")
        .whereRaw(knex.raw(whereString, [...words.map((w) => w + "%")])),
      knex
        .select(knex.raw("'dishType'"), "*")
        .from("dish_types as dt")
        .whereRaw(knex.raw(whereString, [...words])),
    ]);

  if (!result.length) return [];

  const groupedData = result.reduce((acc, item) => {
    const { entity, ...obj } = item;
    if (!acc[entity]) {
      acc[entity] = [];
    }

    acc[entity].push({ [entity]: obj });
    return acc;
  }, {});

  const categories = Object.values(groupedData);
  const combinations = cartesianProduct(categories);

  return combinations;
}

module.exports = extractEntities;
