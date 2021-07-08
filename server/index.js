require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express(); // create express app
const server = require("http").createServer(app);
const cors = require("cors");
const mysql = require("mysql");

const appRoutes = require('./routes/app');
const apiRoutes = require('./routes/api');
const { connect } = require("./routes/app");

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});


// connecting to database
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: "questionsDB"
});

connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);
});

// middleware
app.use(cors());
app.use(bodyParser.json());

// routes
app.use('/', appRoutes);
app.use('/api', apiRoutes);

// socket
app.set('socketio', io);

const API_PORT = process.env.API_PORT || 3001;
const SOCKET_PORT = process.env.SOCKET_PORT || 3002;

// start express server on port
app.listen(API_PORT, () => {
  console.log(`server started on port ${API_PORT}`);
});

server.listen(SOCKET_PORT, () => {
  console.log(`socket listening on port ${SOCKET_PORT}`);
})

require('./sockets')(io);

app.use(
    express.urlencoded({
      extended: true
    })
)

app.use(express.json())

app.get('/tags', (req, res) => {
  connection.query('SELECT * FROM Tags', function (err, result) {
    if (err) return console.log(err);
    res.send(result);
  });
});

app.post('/random', (req, res) => {
  console.log(req.body.TagID);
  var id = req.body.TagID;
  var sql = 'SELECT Question FROM Questions INNER JOIN TagsOfQues ON TagsOfQues.QuestionID = Questions.QuestionID WHERE TagsOfQues.TagID = ?';
  connection.query(sql, [id], function (err, result) {
    if (err) return console.log(err);
    const random = Math.floor(Math.random() * result.length);
    res.send(result[random]);
  });
});

app.post('/addentry', (req, res) => {
  console.log("print");
  console.log(req.body);
  const tag =  req.body.tag;
  const query = "INSERT INTO Tags (Tag) VALUES (?);";
  connection.query(query, [tag], function (err, result) {
    if (err) return console.log("error is :" + err);
    console.log("runs");
    res.send(query);
  });
});

app.post('/deleteentry', (req, res) => {
  console.log("print");
  console.log(req.body);
  const tag =  req.body.tag;
  let tagID;
  const query = "DELETE FROM Tags WHERE Tag=(?)";
  connection.query(query, [tag], function (err, result) {
    if (err) return console.log("error is :" + err);
    console.log("runs");
    res.send(query);
  });
});