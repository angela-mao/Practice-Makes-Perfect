var connection = require('./db');

function getTagsFromDB(result) {
    connection.query('SELECT * FROM Tags', function (err, tags) {
        result(err, tags)
    });
}

function addTagToDB(tag, result) {
    let sql = 'INSERT INTO Tags (Tag) VALUES (?);';
    connection.query(sql, [tag], function (err, res) {
        result(err);
    });
}

function deleteTagFromDB(tag, result) {
    let sql = 'DELETE FROM Tags WHERE Tag=(?)';
    connection.query(sql, [tag], function (err, res) {
        result(err);
    });
}


module.exports = { getTagsFromDB, addTagToDB, deleteTagFromDB };
