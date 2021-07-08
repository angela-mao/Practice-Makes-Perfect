const { getQuestions } = require('../models/questionModel');

function getRandomQues(id, handleResult) {
    getQuestions(id, (err, questions) => {
        if (err) return console.log(err);
        const random = Math.floor(Math.random() * questions.length);
        handleResult(questions[random]);
    });
}

module.exports = { getRandomQues };