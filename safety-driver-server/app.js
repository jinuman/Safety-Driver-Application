var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

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