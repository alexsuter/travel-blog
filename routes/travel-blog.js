var express = require('express');
var router = express.Router();
var passport = require('passport');
var db = require('../components/db');
var ObjectId = require('mongodb').ObjectID;

const COLLECTION_NAME = 'travel-blog';

/* GET home page. */
router.get('/', function (req, res) {
    findAll(function (blogs) {
        res.send(blogs);
    })
});

/* GET blogs details */
router.get('/:blogId', function (req, res) {
    find(req.params.blogId, function (blog) {
        res.send(blog)
    })
});

/* POST new blog */
router.post('/', function (req, res) {
    save(req.body, function (blog) {
        res.send(201, blog);
    });
});

/* DELETE blog */
router.delete('/:blogId', function (req, res) {
    remove(req.params.blogId, function (blog) {
        res.send(blog);
    })
});

function save(blog, callback) {
    db.get().collection(COLLECTION_NAME).insertOne(blog, function (err) {
        if (err) {
            throw err;
        }
        callback(blog);
    })
}

function findAll(callback) {
    db.get().collection(COLLECTION_NAME).find({}, {
        title: 1,
        description: 1,
        destination: 1
    }).toArray(function (err, result) {
        if (err) {
            throw err;
        }
        callback(result)
    });
}

function find(blogId, callback) {
    db.get().collection(COLLECTION_NAME).find({
        '_id': ObjectId(blogId)
    }).limit(1).next(function (err, blog) {
        if (err) {
            throw err;
        }
        callback(blog)
    });
}

function remove(blogId, callback) {
    find(blogId, function (blog) {
        db.get().collection(COLLECTION_NAME).deleteOne({
            '_id': ObjectId(blog._id)
        }, function (err) {
            if (err) {
                throw err;
            }
            callback(blog)
        });
    })
}

module.exports = router;
