var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    res.send({test: 123});
});

router.get('/mongodb', function(req, res, next) {
    var MongoClient = require('mongodb').MongoClient;

    var insertDocument = function(db, callback) {
        db.collection('restaurants').insertOne( {
            "address" : {
                "street" : "2 Avenue",
                "zipcode" : "10075",
                "building" : "1480",
                "coord" : [ -73.9557413, 40.7720266 ]
            },
            "borough" : "Manhattan",
            "cuisine" : "Italian",
            "grades" : [
                {
                    "date" : new Date("2014-10-01T00:00:00Z"),
                    "grade" : "A",
                    "score" : 11
                },
                {
                    "date" : new Date("2014-01-16T00:00:00Z"),
                    "grade" : "B",
                    "score" : 17
                }
            ],
            "name" : "Vella",
            "restaurant_id" : "41704620"
        }, function(err, result) {
            console.log("Inserted a document into the restaurants collection.");
            callback();
        });
    };

    MongoClient.connect('mongodb://localhost:27017/animals', function(err, db) {
        insertDocument(db, function() {
            db.close();
        });
    });

    MongoClient.connect('mongodb://localhost:27017/animals', function(err, db) {
        if (err) {
            throw err;
        }
        db.collection('restaurants').find().toArray(function(err, result) {
            if (err) {
                throw err;
            }
            console.log(result);
        });
    });

    res.send('respond with a resource');
});

module.exports = router;
