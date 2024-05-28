/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("cities", function (table) {
      table.increments("id");
      table.string("name", 255).notNullable();
    })
    .createTable("brands", function (table) {
      table.increments("id");
      table.string("name", 255).notNullable();
    })
    .createTable("dish_types", function (table) {
      table.increments("id");
      table.string("name", 255).notNullable();
    })
    .createTable("diets", function (table) {
      table.increments("id");
      table.string("name", 255).notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTable("cities")
    .dropTable("brands")
    .dropTable("dish_types")
    .dropTable("diets");
};
