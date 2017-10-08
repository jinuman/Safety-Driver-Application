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
    'mongodb://localhost:27017/safetydriver',
    {useMongoClient: true}
);
autoIncrement.initialize(connect);

var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function () {
    console.log('mongodb connect!');
});

// 라우팅
var accounts = require('./routes/accounts');

var app = express();
var port = 3000;

// 확장자가 ejs로 끝나는 뷰 엔진을 추가한다.
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 미들웨어 셋팅(등록)
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/', function(req, res){
    res.send('안전운전해라');
});
// Routing
// /accounts로 접속 가능하도록설정
app.use('/accounts', accounts);

var server = app.listen(port, function () {
    console.log('Express Server port', port);
});