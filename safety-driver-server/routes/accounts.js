var express = require('express');
var router = express.Router();
var UserModel = require('../models/UserModel');

router.get('/', function(req, res){
    res.send('account app');
});

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

router.get('/login', function(req, res){
    res.render('accounts/login');
});

module.exports = router;