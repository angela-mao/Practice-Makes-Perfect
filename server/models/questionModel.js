var connection = require('./db');

function getQuestions(id, result) {
    let sql = 'SELECT Question FROM Questions INNER JOIN TagsOfQues ON TagsOfQues.QuestionID = Questions.QuestionID WHERE TagsOfQues.TagID = ?';
    connection.query(sql, [id], function (err, questions) {
        result(err, questions);
    });
}

module.exports = { getQuestions };