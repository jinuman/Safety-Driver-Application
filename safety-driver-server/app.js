var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

//MongoDB 접속
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var autoIncrement = require('mongoose-auto-increment');

var connect = mongoose.connect(
    'mongodb://127.0.0.1:27017/jinuman',
    {useMongoClient: true}
);
autoIncrement.initialize(connect);

var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function () {
    console.log('mongodb connect!');
});

var app = express();
var port = 3000;

// 미들웨어 셋팅(등록)
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

var server = app.listen(port, function () {
    console.log('Express listening on port', port);
});