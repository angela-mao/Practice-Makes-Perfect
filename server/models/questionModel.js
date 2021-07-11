var connection = require("./db");

function getQuestions(id, result) {
  let sql =
    "SELECT Question FROM Questions INNER JOIN TagsOfQues ON TagsOfQues.QuestionID = Questions.QuestionID WHERE TagsOfQues.TagID = ?";
  connection.query(sql, [id], function (err, questions) {
    result(err, questions);
  });
}

function addQuestionToDB(question, tagIDs) {
  const sql = "INSERT INTO Questions (Question) VALUES (?);";
  connection.query(sql, [question], function (err, result) {
    for (let tagID of tagIDs) {
      console.log(`tag: ${tagID}`)
      addTagsOfQuestionsToDB(result.insertId, tagID);
    }
  });
}

function addTagsOfQuestionsToDB(questionID, tagID) {
  const sql = "INSERT INTO TagsOfQues (QuestionID, TagID) VALUES (?, ?);";
  connection.query(sql, [questionID, tagID]);
}

module.exports = { getQuestions, addQuestionToDB };
