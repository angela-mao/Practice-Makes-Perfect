var connection = require('./db');

function getQuestions(id, result) {
    let sql = 'SELECT Question FROM Questions INNER JOIN TagsOfQues ON TagsOfQues.QuestionID = Questions.QuestionID WHERE TagsOfQues.TagID = ?';
    connection.query(sql, [id], function (err, questions) {
        result(err, questions);
    });
}

function addTagToDB(tag, handleResult) {
    let sql = 'INSERT INTO Tags (Tag) VALUES (?);';
    connection.query(sql, [tag], function (err, result) {
        handleResult(err);
    });
}

function deleteTagFromDB(tag, handleResult) {
    let sql = 'DELETE FROM Tags WHERE Tag=(?)';
    connection.query(sql, [tag], function (err, result) {
        handleResult(err);
    });
}


module.exports = { getQuestions, addTagToDB, deleteTagFromDB };