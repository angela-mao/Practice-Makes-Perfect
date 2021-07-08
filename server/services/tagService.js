const { getTagsFromDB } = require('../models/tagModel');

function getAllTags(req, res) {
    getTagsFromDB((err, tags) => {
        if (err) return console.log(err);
        res.send(tags);
    })
}

module.exports = { getAllTags };