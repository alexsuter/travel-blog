var router = require('express').Router();
var db = require('../components/db');
var passport = require('passport');
var ObjectId = require('mongodb').ObjectID;

const ENTRY_COLLECTION = 'entry';

/* PUT entry */
router.put('/:entryId', passport.authenticate('jwt', {session: false}), function (req, res) {
    var entry = req.body;
    entry._id = req.params.entryId;
    
    update(entry, function (entry) {
        res.send(entry);
    })
});

/* DELETE entry */
router.delete('/:entryId', passport.authenticate('jwt', {session: false}), function (req, res) {
    remove(req.params.entryId, function (entry) {
        res.send(entry);
    })
});

function update(entry, callback) {
    entry._id = ObjectId(entry._id);
    entry.blogId = ObjectId(entry.blogId);

    db.entry().findOneAndReplace({
        '_id': entry._id
    }, entry, function (err) {
        if (err) {
            throw err;
        }
        callback(entry);
    })
}

function remove(entryId, callback) {
    db.entry().findOneAndDelete({
        '_id': ObjectId(entryId)
    }, function (err, result) {
        if (err) {
            throw err;
        }
        callback(result.value)
    });
}

module.exports = router;