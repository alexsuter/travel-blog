var express = require('express');
var router = express.Router();
var db = require('../components/db');
var bcrypt = require('bcryptjs');
var jwt = require('jwt-simple');
var passport = require('passport');
require('../components/passport')(passport);

const COLLECTION_NAME = 'user';

router.post('/signup', function (req, res) {
    var username = req.body.username;
    var password = req.body.password;

    if (!username || !password) {
        res.json({success: false, msg: 'Please pass username and password.'});
    } else {
        var salt = bcrypt.genSaltSync(10);
        var passwordHash = bcrypt.hashSync(password, salt);
        db.get().collection(COLLECTION_NAME).insertOne({
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

router.post('/authenticate', function (req, res) {
    var username = req.body.username;
    var password = req.body.password;

    db.get().collection(COLLECTION_NAME).find({
        username: username
    }).limit(1).next(function (err, result) {
        if (err) {
            throw err;
        }
        if (!result) {
            res.send({success: false, msg: 'Authentication failed. User not found.'});
        } else {
            if (bcrypt.compareSync(password, result.passwordHash)) {
                // if user is found and password is right create a token
                var token = jwt.encode(result, 'keepItSecret');
                // return the information including token as JSON
                res.json({success: true, token: 'JWT ' + token});
            } else {
                res.send({success: false, msg: 'Authentication failed. Wrong password.'});
            }
        }
    });

});

module.exports = router;