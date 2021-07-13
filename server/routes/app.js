var express = require('express');
var router = express.Router();
const { getAllTags } = require('../services/tagService');
const { getRandomQues, addTag, deleteTag } = require('../services/questionService');

// to send data through post request
router.use(
    express.urlencoded({
      extended: true
    })
)

router.use(express.json())

// store rooms
let rooms = {};

function genRoomCode() {
  let codeLength = 6;
  let lower = 'abcdefghjkmnpqrstuvwxyz';
  let upper = 'ABCDEFGHJKMNPQRSTUVWXYZ';
  let num = '23456789';
  let all = lower + upper + num;

  let code = '';
  for (let i = 0, n = all.length; i < codeLength; ++i) {
    code += all.charAt(Math.floor(Math.random() * n));
  }

  return code;
}

router.get("/", (req, res) => {
  res.send("This is from express.js");
});

router.post("/room", (req, res) => {
  let roomCode = genRoomCode();
  while (roomCode in rooms) {
    roomCode = genRoomCode();
  }

  // store room id
  rooms[roomCode] = {
    roomName: roomCode,
    clients: []
  }

  res.json({ roomCode });
});

router.get('/tags', (req, res) => {
  getAllTags((tags) => {
    res.send(tags);
  });
});

router.post('/random', (req, res) => {
  getRandomQues(req.body.TagID, (question) => {
    res.send(question);
  });
});

router.post('/addtag', (req, res) => {
  addTag(req.body.Tag, (err) => {
    if (err) res.send(409);
    res.send(200);
  });
});

router.post('/deletetag', (req, res) => {
  deleteTag(req.body.Tag, (err) => {
    if (err) res.send(409);
    res.send(200);
  });
});

module.exports = router;