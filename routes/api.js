var express = require('express');
var router = express.Router();

module.exports = function(db) {
  router.post('/submit', function(req, res) {
    var mood = {
      mood: req.body.mood,
      date: new Date()
    }

    db.collection('moods').insert(mood, function(err, result) {
      if (err) {
        res.sendStatus(500);
        return;
      }

      res.sendStatus(200);
    });
  });

  return router;
};