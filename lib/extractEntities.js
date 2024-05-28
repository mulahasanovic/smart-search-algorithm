const cartesianProduct = require("./cartesianProduct");
const { getEntitiesByNames } = require("./database");

async function extractEntities(searchTerm) {
  let words = searchTerm.split(" ");

  // Filter out "at", "in", etc
  words = words.filter((word) => word.length > 2);
  words = words.map((w) => w.replace("'", ""));

  const result = await getEntitiesByNames(words);

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
