var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var db = require('./components/db');

var routeTravelBlog = require('./routes/travel-blog');
var routeEntry = require('./routes/entry');
var routeUser = require('./routes/user');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

app.use('/api/travel-blog', routeTravelBlog);
app.use('/api/entry', routeEntry);
app.use('/api/user', routeUser);

// Return json error for api 404
app.all('/api/*', function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Use angular not found view for non api requests
app.all('*', function (req, res) {
    res.redirect('/#' + req.originalUrl);
});

// Establish for each request a db connection
db.connect('mongodb://localhost:27017/travelblog', function (err) {
    if (err) {
        process.exit(1);
    }
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res
            .status(err.status || 500)
            .send({
                message: err.message,
                error: err
            });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res
        .status(err.status || 500)
        .send({
            message: err.message,
            error: {}
        });
});

module.exports = app;
