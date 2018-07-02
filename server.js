var express = require('express');
var express_graphql = require('express-graphql');
var { buildSchema } = require('graphql');

var mysql = require('mysql');
var dotenv = require('dotenv').config();

var db = require('knex') ({
  client: 'mysql',
  version: '7.2',
  connection: {
    host : process.env.DB_HOST,
    user : process.env.DB_USERNAME,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_DATABASE
  }
});

db.table('users')
.select('username', 'first_name', 'last_name', 'email')
.then(function(data) {
  // console.log(data);
  var users = data;

  // GraphQL schema
  var schema = buildSchema(`
      type Query {
          user(username: String): User
          users(active: Int!): [User]
      },
      type User {
          id: Int
          username: String
          first_name: String
          last_name: String
          email: String
          active: String
      }
  `);

  var getUser = function(args) {
      var username = args.username;
      return users.filter(user => {
          return user.username == username;
      })[0];
  }

  var getUsers = function(args) {
      if (args.active) {
          var active = args.active;
          return users.filter(user => user.active === active);
      } else {
          return users;
      }
  }

  var root = {
      user: getUser,
      users: getUsers
  };

  // Create an express server and a GraphQL endpoint
  var app = express();
  app.use('/graphql', express_graphql({
      schema: schema,
      rootValue: root,
      graphiql: true
  }));
  app.listen(5000, () => console.log('Express GraphQL Server Now Running On localhost:5000/graphql'));

});
