/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable("task", (table) => {
    table.uuid("id").primary();
    table.text("title").notNullable();
    table.integer("sequence").unique().notNullable();
    table.uuid("startup_id", 256).notNullable();
    table.foreign("startup_id").references("startup.id").onDelete("CASCADE");
    table.uuid("phase_id", 256).notNullable();
    table.foreign("phase_id").references("phase.id").onDelete("CASCADE");
    table.boolean("done").defaultTo(false).notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.dropTable("task");
};
