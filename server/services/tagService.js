const { getTagsFromDB } = require('../models/tagModel');

function getAllTags(handleResult) {
    getTagsFromDB((err, tags) => {
        if (err) return console.log(err);
        handleResult(tags);
    })
}

module.exports = { getAllTags };