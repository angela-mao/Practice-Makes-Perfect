const { getQuestions, addQuestionToDB, addTagsOfQuestionsToDB } = require('../models/questionModel');


function getRandomQues(ids, handleResult) {
    if (ids.length === 0) {
        handleResult({Question: "No tags were selected", Tag: 'None'});
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
    })
}

module.exports = { getRandomQues, addQuestion };
