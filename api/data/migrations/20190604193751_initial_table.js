exports.up = function(knex) {
  return knex.schema.createTable('blob', table => {
    table.increments();
    table.blob('blob');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('blob');
};
