exports.up = async (knex) => {
  await knex.schema.createTable('video', (table) => {
    table.increments();
    table.string('nom').notNullable();
    table.string('description');
    table.string('url').notNullable();
    table.timestamps();
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('video');
};
