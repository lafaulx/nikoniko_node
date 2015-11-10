var express = require('express');
var router = express.Router();

module.exports = function(db) {
  var collection = db.collection('moods');

  router.post('/submit', function(req, res) {
    var mood = {
      mood: req.body.mood,
      date: new Date()
    }

    collection.insert(mood, function(err, result) {
      if (err) {
        res.sendStatus(500);
        return;
      }

      res.sendStatus(200);
    });
  });

  router.get('/stats', function(req, res) {
    collection.aggregate([{
      $group: {
        _id: {
          year: { $year: '$date' },
          month: { $month: '$date' },
          day: { $dayOfMonth: '$date' },
        },
        good: {
          $sum: {
            $cond: [ { $eq: [ '$mood', 'good' ] }, 1, 0 ]
          }
        },
        neutral: {
          $sum: {
            $cond: [ { $eq: [ '$mood', 'neutral' ] }, 1, 0 ]
          }
        },
        bad: {
          $sum: {
            $cond: [ { $eq: [ '$mood', 'bad' ] }, 1, 0 ]
          }
        },
      }
    }, {
      $project: {
        _id: 0,
        year: '$_id.year',
        month: {
          $subtract: ['$_id.month', 1]
        },
        day: '$_id.day',
        good: 1,
        neutral: 1,
        bad: 1
      }
    }, {
      $sort: {
        'year': -1,
        'month': -1,
        'day': -1,
      }
    }], function(err, stats) {
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }

      res.send(stats);
    });
  });

  return router;
};