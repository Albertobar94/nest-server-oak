/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable("phase", (table) => {
    table.uuid("id").primary();
    table.string("title", 256).notNullable();
    table.integer("sequence").notNullable();
    table.uuid("startup_id").notNullable();
    table.foreign("startup_id").references("startup.id").onDelete("CASCADE");
    table.boolean("done").defaultTo(false).notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.dropTable("phase");
};
