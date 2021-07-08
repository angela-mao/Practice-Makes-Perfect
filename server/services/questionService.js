const { getQuestions } = require('../models/questionModel');

function getRandomQues(req, res) {
    getQuestions(req.body.TagID, (err, questions) => {
        console.log(req.body.TagID);
        if (err) return console.log(err);
        const random = Math.floor(Math.random() * questions.length);
        res.send(questions[random]);
    });
}

module.exports = { getRandomQues };