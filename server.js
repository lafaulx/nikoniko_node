var express = require('express');
var path = require('path');
var bunyan = require('bunyan');
var bunyanMiddleware = require('bunyan-middleware')
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
var MongoClient = require('mongodb').MongoClient;

var web = require('./routes/web');
var api = require('./routes/api');

var config;
var development = process.env.NODE_ENV !== 'production';

var logger = bunyan.createLogger({
  name: 'nikoniko',
  streams: [{
    level: 'info',
    stream: process.stdout
  }, {
    level: 'error',
    path: '/var/tmp/nikoniko-error.log'
  }]
});

try {
  config = require('./local_config.js');
} catch (err) {
  logger.warn('Provide local_config.js. See local_config.example.js.');
}

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bunyanMiddleware({logger: logger}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'build')));

process.env.API_ORIGIN = config.API_ORIGIN;

MongoClient.connect('mongodb://' + config.MONGODB_ADDR + ':' + config.MONGODB_PORT + '/' + config.MONGODB_DB, {
  db: {
    retryMiliSeconds: 1000,
    bufferMaxExtries: 0
  },
  server: {
    autoReconnect: true
  }
}, function(err, db) {
  if (err) {
    logger.error('Error connecting to MongoDB – quitting');
    return;
  }

  logger.info('Connected to MongoDB');

  app.use('/', web(db, config, development));
  app.use('/api', api(db));

  app.listen(config.NODEJS_PORT, config.NODEJS_ADDR, function () {
    logger.info('Listening for requests at ' + config.NODEJS_ADDR + ':' + config.NODEJS_PORT);
  });
});
