var express = require('express');
var router = express.Router();
var { graphql, buildSchema } = require('graphql');

router.get('/', function(req, res, next) {

  res.setHeader('Content-Type', 'application/json');

  db.table('users')
  .select('username', 'first_name', 'last_name', 'email')
  .then(function(data) {

    var msg = (data.length == 0) ? '': data;

    var response = JSON.stringify({
      'message' : msg,
      'status' : 'success'
    });

    res.send(response);

  });

});

module.exports = router;
