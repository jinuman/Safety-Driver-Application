var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

//flash 메시지
var flash = require('connect-flash');

//passport 로그인
var passport = require('passport');
var session = require('express-session');

//MongoDB 접속
var mongoose = require('mongoose');
// mongoose.Promise = global.Promise;
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

//session 관련 셋팅
app.use(session({
    secret: 'jinu', // 쿠키임의변조 방지
    resave: false, // 세션을 언제나 저장할지?
    saveUninitialized: true, // 세션이 저장되기 전에 Uninitialized 상태로 만
    cookie: {
        maxAge: 2000 * 60 * 60 //지속시간 2시간
    }
}));

//passport 적용
app.use(passport.initialize());
app.use(passport.session());

// Flash message
app.use(flash());

app.get('/', function(req, res){
    res.send('안전운전해라');
});
// Routing
// /accounts로 접속 가능하도록설정
app.use('/accounts', accounts);

var server = app.listen(port, function () {
    console.log('Express Server port', port);
});