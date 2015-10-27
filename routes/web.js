var express = require('express');
var router = express.Router();

module.exports = function(db, config, isDevelopment) {
  var context = {
    isDevelopment: isDevelopment,
    DEV_SERVER_PORT: config.DEV_SERVER_PORT
  };

  router.get('/', function(req, res) {
    res.render('mood', context);
  });

  router.get('/stats', function(req, res) {
    res.render('stats', context);
  });

  return router;
};
