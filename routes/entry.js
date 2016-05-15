var router = require('express').Router();
var db = require('../components/db');
var ObjectId = require('mongodb').ObjectID;

const ENTRY_COLLECTION = 'entry';

/* PUT entry */
router.put('/:entryId', function (req, res) {

});

/* DELETE entry */
router.delete('/:entryId', function (req, res) {
    remove(req.params.entryId, function (entry) {
        res.send(entry);
    })
});

function remove(entryId, callback) {
    db.get().collection(ENTRY_COLLECTION).findOneAndDelete({
        '_id': ObjectId(entryId)
    }, function (err, result) {
        if (err) {
            throw err;
        }
        callback(result.value)
    });
}

module.exports = router;