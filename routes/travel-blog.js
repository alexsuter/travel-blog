var express = require('express');
var router = express.Router();
var db = require('../components/db');
var ObjectId = require('mongodb').ObjectID;

const COLLECTION_NAME = 'travel-blog';

/* GET home page. */
router.get('/', function (req, res) {
    db.get().collection(COLLECTION_NAME).find({}, {
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

/* GET blogs details */
router.get('/:blogId', function (req, res) {
    var blogId = req.params.blogId;
    db.get().collection(COLLECTION_NAME).find({
        '_id': ObjectId(blogId)
    }).limit(1).next(function (err, result) {
        if (err) {
            throw err;
        }
        res.send(result)
    });
});

module.exports = router;
