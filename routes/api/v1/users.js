var express = require('express');
var router = express.Router();
var { graphql, buildSchema } = require('graphql');

router.get('/', function(req, res, next) {

  res.setHeader('Content-Type', 'application/json');

  var response = JSON.stringify({
    'test': 1,
    'test2': 2
  });

  res.send(response);
  // res.render('users/index', {title: 'User List'});
});

module.exports = router;
