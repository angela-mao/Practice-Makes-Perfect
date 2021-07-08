var connection = require('./db');

function getTagsFromDB(result) {
    connection.query('SELECT * FROM Tags', function (err, tags) {
        result(err, tags)
    });
}

module.exports = { getTagsFromDB };