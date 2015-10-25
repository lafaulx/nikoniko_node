var express = require('express');
var router = express.Router();

module.exports = function(db) {
  router.get('/', function(req, res) {
    res.render('mood');
  });

  router.get('/stats', function(req, res) {
    res.render('stats');
  });

  return router;
};
