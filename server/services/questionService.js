const { getQuestions, addQuestionToDB } = require('../models/questionModel');

function getRandomQues(id, handleResult) {
    getQuestions(id, (err, questions) => {
        if (err) return console.log(err);
        const random = Math.floor(Math.random() * questions.length);
        handleResult(questions[random]);
    });
}

function addQuestion(question, tagIDs) {
  addQuestionToDB(question, tagIDs);
}

module.exports = { getRandomQues, addQuestion };