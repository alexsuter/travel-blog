var passport	= require('passport');
var JwtStrategy = require('passport-jwt').Strategy;
var db = require('../components/db');

module.exports = function(passport) {
    var opts = {};
    opts.secretOrKey = 'keepItSecret';
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        db.user().find({
            username: jwt_payload.username
        }).limit(1).next(function (err, result) {
            if (err) {
                return done(err, false);
            }
            if (result) {
                done(null, result);
            } else {
                done(null, false);
            }
        });
    }));
};