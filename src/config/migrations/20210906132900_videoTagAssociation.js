exports.up = async (knex) => {
  await knex.schema.createTable('videoTagAssociation', (table) => {
    table.increments();
    table.integer('idTag', 10).unsigned().references('id').inTable('tag')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    table.integer('idVideo', 10).unsigned().references('id').inTable('video')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    table.timestamps();
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('videoTagAssociation');
};
