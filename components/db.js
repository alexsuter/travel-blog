var MongoClient = require('mongodb').MongoClient;

var connection;

module.exports = {
    connect: connect,
    get: get
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

function get() {
    return connection;
}