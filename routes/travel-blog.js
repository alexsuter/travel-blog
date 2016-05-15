var router = require('express').Router();
var passport = require('passport');
var db = require('../components/db');
var ObjectId = require('mongodb').ObjectID;

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

/* GET blog entries */
router.get('/:blogId/entry', function (req, res) {
    findEntries(req.params.blogId, function (entries) {
        res.send(entries);
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

function save(blog, callback) {
    db.blog().insertOne(blog, function (err) {
        if (err) {
            throw err;
        }
        callback(result.ops[0])
    })
}

function saveEntry(blogId, entry, callback) {
    entry.blogId = ObjectId(blogId);
    db.entry().insertOne(entry, function (err, result) {
        if (err) {
            throw err;
        }
        callback(result.ops[0])
    })
}

function findAll(callback) {
    db.blog().find({}, {
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
    db.blog().find({
        '_id': ObjectId(blogId)
    }).limit(1).next(function (err, blog) {
        if (err) {
            throw err;
        }
        callback(blog)
    });
}

function findEntries(blogId, callback) {
    db.entry().find({
        'blogId': ObjectId(blogId)
    }).sort('timestamp', -1).toArray(function (err, entries) {
        if (err) {
            throw err;
        }
        callback(entries)
    });
}

function remove(blogId, callback) {
    db.blog().findOneAndDelete({
        '_id': ObjectId(blogId)
    }, function (err, result) {
        if (err) {
            throw err;
        }
        callback(result.value)
    });
}

module.exports = router;
