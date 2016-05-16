var express = require('express');
var router = express.Router();
var db = require('../components/db');
var bcrypt = require('bcryptjs');
var jwt = require('jwt-simple');
var passport = require('passport');
require('../components/passport')(passport);

router.post('/signup', function (req, res) {
    var username = req.body.username;
    var password = req.body.password;

    if (!username || !password) {
        res.json({success: false, msg: 'Please pass username and password.'});
    } else {
        var salt = bcrypt.genSaltSync(10);
        var passwordHash = bcrypt.hashSync(password, salt);
        db.user().insertOne({
            username: username,
            passwordHash: passwordHash
        }, function (err, result) {
            if (err) {
                throw err;
            }
            res.json({success: true, msg: 'Successful created new user.'});
        })
    }
});

router.get('/setup', function (req, res) {
    var users = [
        { username: "alex", password: "1234" },
        { username: "fabian", password: "4321" }
    ]
    db.user().remove({});
    for (var i = 0; i < users.length; i++) {
        var user = users[i];
        var salt = bcrypt.genSaltSync(10);
        var passwordHash = bcrypt.hashSync(user.password, salt);
        db.user().insertOne({
            username: user.username,
            passwordHash: passwordHash
        });
    }
    res.json({success: true, msg: 'Successful created a lot of new users.'});
});

router.post('/login', function (req, res) {
    var username = req.body.username;
    var password = req.body.password;

    db.user().find({
        username: username
    }).limit(1).next(function (err, result) {
        if (err) {
            throw err;
        }
        if (result) {
            if (bcrypt.compareSync(password, result.passwordHash)) {
                // if user is found and password is right create a token
                var token = jwt.encode(result, 'keepItSecret');
                res.json({success: true, token: 'JWT ' + token});
            } else {
                res.send({success: false, msg: 'Authentication failed. Wrong password.'});
            }
        } else {
            res.send({success: false, msg: 'Authentication failed. User not found.'});
        }
    });

});

module.exports = router;