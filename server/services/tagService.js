const { getTagsFromDB, addTagToDB, deleteTagFromDB } = require('../models/tagModel');

function getAllTags(handleResult) {
    getTagsFromDB((err, tags) => {
        if (err) return console.log(err);
        handleResult(tags);
    })
}

function addTag(tag, handleResult) {
    addTagToDB(tag,(err) => {
        if (err) return console.log(err);
        handleResult(200);
    })
}

function deleteTag(tag, handleResult) {
    deleteTagFromDB(tag,(err) => {
        if (err) return console.log(err);
        handleResult(200);
    })
}

module.exports = { getAllTags, addTag, deleteTag };
