exports.up = async (knex) => {
  await knex.schema.createTable('tag', (table) => {
    table.increments();
    table.string('valeur').notNullable();
    table.timestamps();
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('tag');
};
