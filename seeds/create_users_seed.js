var bcrypt = require('bcrypt');

exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return knex('users').insert([
        {
          first_name: 'Roland',
          last_name: 'Oduberu',
          username: 'roliod',
          password: bcrypt.hashSync('password', 10),
          email: 'roliod@yahoo.com',
        },
        {
          first_name: 'Tim',
          last_name: 'Howard',
          username: 'thoward',
          password: bcrypt.hashSync('password', 10),
          email: 'thoward@yahoo.com',
        },
        {
          first_name: 'Tom',
          last_name: 'Cruise',
          username: 'tcruise',
          password: bcrypt.hashSync('password', 10),
          email: 'tcruise@gmail.com',
        }
      ]);
    });
};
