var MongoClient = require('mongodb').MongoClient;

var connection;

module.exports = {
    connect: connect,
    blog: blog,
    entry: entry,
    user: user
};

function connect(url, done) {
    if (connection) {
        return done();
    }

    MongoClient.connect(url, function (err, con) {
        if (err) {
            return done(err);
        }
        connection = con;
        return done()
    })
}

function blog() {
    return connection.collection('travel-blog');
}

function entry() {
    return connection.collection('entry');
}

function user() {
    return connection.collection('user');
}