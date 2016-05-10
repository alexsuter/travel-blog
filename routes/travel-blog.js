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
        res.status(201).send(blog);
    });
});

/* POST new entry */
router.post('/:blogId/entry', function (req, res) {
    saveEntry(req.params.blogId, req.body, function (blog) {
        res.status(201).send(blog);
    });
});

/* DELETE blog */
router.delete('/:blogId', function (req, res) {
    remove(req.params.blogId, function (blog) {
        res.send(blog);
    })
});

/* DELETE entry */
router.delete('/:blogId/entry/:entryId', function (req, res) {
    removeEntry(req.params.blogId, req.params.entryId, function (blog) {
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

function saveEntry(blogId, entry, callback) {
    entry._id = ObjectId();
    db.get().collection(COLLECTION_NAME).findOneAndUpdate({
        '_id': ObjectId(blogId)
    }, {
        $push: {
            entries: {
                $each: [entry],
                $sort: {timestamp: -1}
            }
        }
    }, function (err, result) {
        if (err) {
            throw err;
        }
        callback(result.value);
    })
}

function findAll(callback) {
    db.get().collection(COLLECTION_NAME).find({}, {
            title: 1,
            description: 1,
            destination: 1
        })
        .sort('_id', -1)
        .toArray(function (err, result) {
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
    db.get().collection(COLLECTION_NAME).findOneAndDelete({
        '_id': ObjectId(blogId)
    }, function (err, result) {
        if (err) {
            throw err;
        }
        callback(result.value)
    });
}

function removeEntry(blogId, entryId, callback) {
    db.get().collection(COLLECTION_NAME).findOneAndUpdate({
        '_id': ObjectId(blogId)
    }, {
        $pull: {
            entries: {
                _id: ObjectId(entryId)
            }
        }
    }, function (err, result) {
        if (err) {
            throw err;
        }
        callback(result.value);
    })
}

module.exports = router;
