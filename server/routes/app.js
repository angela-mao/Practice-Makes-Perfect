var express = require('express');
var router = express.Router();
const { getAllTags, addTag, deleteTag } = require('../services/tagService');
const { getRandomQues, addQuestion, getQuestion } = require('../services/questionService');

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

router.get('/random', (req, res) => {
  getRandomQues(req.query.TagIDs, (question) => {
    res.send(question);
  });
});

router.post('/addtag', (req, res) => {
  addTag(req.body.Tag, (result) => {
    res.sendStatus(result);
  });
})

router.post('/deletetag', (req, res) => {
  deleteTag(req.body.Tag, (result) => {
    res.sendStatus(result);
  });
})

router.post('/question', (req, res) => {
  const { question, tagIDs } = req.body;
  console.log(req.body)
  addQuestion(question, tagIDs, (result) => {
    res.sendStatus(result);
  });
});

router.get('/getQuestion/:questionID', (req, res) => {
  const questionID = req.params.questionID;
  getQuestion(questionID, (question) => {
    res.send(question);
  })
})

module.exports = router;
