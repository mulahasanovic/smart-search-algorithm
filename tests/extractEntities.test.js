const assert = require("node:assert/strict");
const { describe, it } = require("node:test");
const extractEntities = require("../lib/extractEntities");

const data = {
  "McDonald's": [
    {
      brand: { id: 4, name: "McDonald's" },
    },
  ],
  "McDonald's in London": [
    {
      city: { id: 1, name: "London" },
      brand: { id: 4, name: "McDonald's" },
    },
  ],
  "vegan sushi in London": [
    {
      city: { id: 1, name: "London" },
      diet: { id: 1, name: "Vegan" },
      dishType: { id: 72, name: "Sushi" },
    },
  ],
  "Veg sushi": [
    {
      diet: { id: 1, name: "Vegan" },
      dishType: { id: 72, name: "Sushi" },
    },
    {
      diet: { id: 2, name: "Vegetarian" },
      dishType: { id: 72, name: "Sushi" },
    },
  ],
  "McDonalds in London or Manchester": [
    {
      city: { id: 1, name: "London" },
      brand: { id: 4, name: "McDonald's" },
    },
    {
      city: { id: 6, name: "Manchester" },
      brand: { id: 4, name: "McDonald's" },
    },
  ],
};

describe("Extract entities matches all examples", async () => {
  for (const searchTerm in data) {
    it(`Matches "${searchTerm}" example`, async () => {
      if (Object.hasOwnProperty.call(data, searchTerm)) {
        const expected = data[searchTerm];
        const actual = await extractEntities(searchTerm);
        assert.deepStrictEqual(actual, expected);
      }
    });
  }
});
