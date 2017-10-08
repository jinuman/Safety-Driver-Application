var express = require('express');
var router = express.Router();
var UserModel = require('../models/UserModel');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

/** 정책 선언*/
// 로그인 첫 수행 시 세션 serialize & deserialize
passport.serializeUser(function (user, done) {
    console.log('serializeUser');
    done(null, user); // 여기서 session에 담긴다. 
});

passport.deserializeUser(function (user, done) {
    var result = user;
    result.password = ""; // password 날려버리기
    console.log('deserializeUser');
    done(null, result);
});

passport.use(new LocalStrategy({
        usernameField: 'user_id',
        passwordField : 'password',
        passReqToCallback : true
    },
    function (req, user_id, password, done) {
        UserModel.findOne({ user_id : user_id, password: password}, function (err,user) {
            if (!user){
                return done(null, false, { message: '아이디 또는 비밀번호 오류 입니다.' });
            }else{
                return done(null, user );
            }
        });
    }
));

router.get('/', function(req, res){
    res.send('account app');
});

// 회원가입
router.get('/join', function(req, res){
    res.render('accounts/join');
});
router.post('/join', function(req, res){
    var User = new UserModel({
        user_id : req.body.user_id,
        password : req.body.password,
        display_name : req.body.display_name
    });
    User.save(function(err){
        res.send('<script>alert("회원가입 성공");location.href="/accounts/login";</script>');
    });
});

// 로그인
router.get('/login', function(req, res){
    res.render('accounts/login', {flashMessage: req.flash().error});
    // 실패 시 flash 메세지 뿌리
});
router.post('/login',
    passport.authenticate('local', {
        failureRedirect: '/accounts/login',
        failureFlash: true
    }),
    function(req, res){
        res.send('<script>alert("로그인 성공");location.href="/";</script>');
    }
);
router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/accounts/login');
});

module.exports = router;