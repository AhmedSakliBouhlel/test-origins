exports.up = async (knex) => {
  await knex.schema.createTable('user', (table) => {
    table.increments();
    table.string('firstName');
    table.string('lastName');
    table.string('email').notNullable();
    table.string('password');
    table.timestamps();
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('user');
};
