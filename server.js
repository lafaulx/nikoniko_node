var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
var MongoClient = require('mongodb').MongoClient

var web = require('./routes/web');
var api = require('./routes/api');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'build')));

app.set('port', 3000);

MongoClient.connect('mongodb://localhost:27017/nikoniko', function(err, db) {
  console.log('Connected to MongoDB');

  app.use('/', web(db));
  app.use('/api', api(db));
  http.createServer(app).listen(3000);
});
