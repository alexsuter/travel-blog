var express = require('express');
var router = express.Router();
var db = require('../components/db');

var collectionName = 'travel-blog';

/* GET home page. */
router.get('/', function (req, res) {
    db.get().collection(collectionName).find({}, {
        title: 1,
        description: 1,
        destination: 1
    }).toArray(function (err, result) {
        if (err) {
            throw err;
        }
        res.send(result);
    });
});

module.exports = router;
