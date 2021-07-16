const {
  getQuestions,
  addQuestionToDB,
  addTagsOfQuestionsToDB,
  findQuestion,
  listQuestionsFromDB,
} = require("../models/questionModel");

function getRandomQues(ids, handleResult) {
    if (!ids) {
        handleResult({QuestionID: 0, Question: "No tags were selected", Tag: 'None'});
    } else {
        ids.join(", ");
        getQuestions(ids, (err, questions) => {
            if (err) return console.log(err);
            const random = Math.floor(Math.random() * questions.length);
            handleResult(questions[random]);
        });
    }
}

function addQuestion(question, tagIDs, handleResult) {
  if (tagIDs.length === 0) {
    handleResult(400);
    return;
  }
  addQuestionToDB(question, (err, result) => {
    if (err) return console.log(err);
    for (let tagID of tagIDs) {
      console.log(`tag: ${tagID}`);
      addTagsOfQuestionsToDB(result.insertId, tagID, (err) => {
        if (err) return console.log(err);
        handleResult(200);
      });
    }
  });
}

function getQuestion(questionID, handleResult) {
  if (questionID === "") {
    handleResult({ Question: "No tags were selected", Tag: "None" });
  } else {
    findQuestion(questionID, (err, question) => {
      if (err) return console.log(err);
      handleResult(question);
    });
  }
}

function listQuestions(tagIDs, handleResult) {
  let questions = [];
  const tags = tagIDs.split(',');
  for (const tag of tags) {
    listQuestionsFromDB(tag, (error, results) => {
      questions = questions.concat(results);
    });
  }
  handleResult(questions)
}

module.exports = { getRandomQues, addQuestion, getQuestion, listQuestions };
