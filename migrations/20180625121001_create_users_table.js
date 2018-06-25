
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(t) {
    t.increments('id').unsigned().primary();
    t.string('first_name').nullable();
    t.string('middle_name').nullable();
    t.string('last_name').nullable();
    t.string('username');
    t.string('password');
    t.string('email').unique();
    t.integer('active').defaultTo(0);
    t.timestamps();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
