const { DB_CONNECTION } = require("./lib/config");
const cartesianProduct = require("./lib/cartesianProduct");

const knex = require("knex")({
  client: "pg",
  connection: DB_CONNECTION,
});

async function extractEntities(searchTerm) {
  let words = searchTerm.split(" ");

  // Filter out "at", "in", etc
  words = words.filter((word) => word.length > 2);
  words = words.map((w) => w.replace("'", ""));

  // Generate raw sql comparison and remove '
  const whereString =
    "replace(name, '''', '') ilike any(array[" +
    words.map((_) => "?").join(",") +
    "]) ";

  const result = await knex
    .select(knex.raw("'cities' as entity"), "*")
    .from("cities")
    .whereRaw(knex.raw(whereString, [...words]))
    .unionAll([
      knex
        .select(knex.raw("'brands'"), "*")
        .from("brands")
        .whereRaw(knex.raw(whereString, [...words])),
      knex
        .select(knex.raw("'diets'"), "*")
        .from("diets as d")
        .whereRaw(knex.raw(whereString, [...words.map((w) => w + "%")])),
      knex
        .select(knex.raw("'dishTypes'"), "*")
        .from("dish_types as dt")
        .whereRaw(knex.raw(whereString, [...words])),
    ]);

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

const searchTerm = process.argv.slice(2);

if (searchTerm.length) {
  (async () => {
    const result = await extractEntities(searchTerm.join(" ").replace('"', ""));

    // Print combinations
    result.forEach((combo) => console.log(combo));
    process.exit(1);
  })();
} else {
  process.exit(1);
}

module.exports = {
  extractEntities,
};
