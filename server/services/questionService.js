const { getQuestions, addTagToDB, deleteTagFromDB } = require('../models/questionModel');


function getRandomQues(id, handleResult) {
    getQuestions(id, (err, questions) => {
        if (err) return console.log(err);
        const random = Math.floor(Math.random() * questions.length);
        handleResult(questions[random]);
    });
}

function addTag(tag, callback) {
    addTagToDB(tag, (err) => {
        if (err) return console.log(err);
        callback(err);
    });
}

function deleteTag(tag, callback) {
    deleteTagFromDB(tag, (err) => {
        if (err) return console.log(err);
        callback(err);
    });
}
module.exports = { getRandomQues, addTag, deleteTag };